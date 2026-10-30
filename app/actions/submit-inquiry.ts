"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { verifyCaptcha } from "@/lib/captcha";
import { inquiryServiceLabel } from "@/lib/inquiry-options";
import { inquirySchema, type InquiryField, type InquirySubmission } from "@/lib/inquiry-schema";
import {
  isMailConfigured,
  leadEmailHtml,
  sameSitePage,
  sendAdminMail,
  subjectText,
} from "@/lib/mail";
import { writeToken } from "@/sanity/env.server";
import { writeClient } from "@/sanity/lib/client";

export type InquiryResult =
  | { ok: true }
  | {
      ok: false;
      reason: "invalid";
      fieldErrors: Partial<Record<InquiryField | "captchaAnswer", string>>;
    }
  | { ok: false; reason: "failed" };

/**
 * Home contact form (old-site look). Same flow as the old /api/contact route:
 * 1. Validate with the shared zod schema; silently accept honeypot hits; check the math CAPTCHA
 *    against its signed token (lib/captcha.ts; client request 2026-10-28).
 * 2. Save a `contactSubmission` document in Sanity (dataset from NEXT_PUBLIC_SANITY_DATASET).
 * 3. Email connect@xconcile.com through Microsoft Graph (lib/mail.ts).
 * Succeeds when at least one of 2/3 worked, so a lead is never lost silently.
 */
export async function submitInquiry(input: InquirySubmission): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as Partial<Record<InquiryField | "captchaAnswer", string>>,
    };
  }

  const { website, captchaAnswer, captchaToken, ...lead } = parsed.data;
  if (website) return { ok: true }; // honeypot filled: pretend success, store nothing

  const captcha = await verifyCaptcha(captchaToken, captchaAnswer);
  if (captcha !== "ok") {
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: {
        captchaAnswer:
          captcha === "wrong"
            ? "That answer isn't right. Please solve the new one."
            : "This security check expired. Please solve the new one.",
      },
    };
  }

  const submittedAt = new Date().toISOString();
  const requestHeaders = await headers();
  const pageUrl = sameSitePage(requestHeaders.get("referer"), requestHeaders.get("host"));
  let saved = false;
  let mailed = false;

  if (writeToken) {
    try {
      await writeClient.create({
        _type: "contactSubmission",
        name: lead.name,
        email: lead.email,
        phone: lead.phone || undefined,
        company: lead.company || undefined,
        service: lead.service,
        message: lead.message,
        status: "new",
        submittedAt,
      });
      saved = true;
    } catch (error) {
      console.error("[submitInquiry] Sanity save failed", error);
    }
  } else {
    console.warn(
      "[submitInquiry] No Sanity write token (SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN); submission not stored",
    );
  }

  if (isMailConfigured()) {
    try {
      await sendAdminMail({
        subject: `New enquiry: ${subjectText(lead.name, 60)} (${inquiryServiceLabel(lead.service)})`,
        replyTo: lead.email,
        html: leadEmailHtml(
          [
            ["Name", lead.name],
            ["Email", lead.email],
            ["Phone", lead.phone],
            ["Company", lead.company],
            ["Service", inquiryServiceLabel(lead.service)],
            ["Message", lead.message],
            ["Page", pageUrl],
          ],
          new Date(submittedAt).toUTCString(),
        ),
      });
      mailed = true;
    } catch (error) {
      console.error("[submitInquiry] Email failed", error);
    }
  } else {
    console.warn("[submitInquiry] Graph mail env vars are not set; admin email not sent");
  }

  return saved || mailed ? { ok: true } : { ok: false, reason: "failed" };
}
