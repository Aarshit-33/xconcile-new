"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { inquiryServiceLabel } from "@/lib/inquiry-options";
import { inquirySchema, type InquiryField, type InquiryFormInput } from "@/lib/inquiry-schema";
import { isMailConfigured, leadEmailHtml, sendAdminMail } from "@/lib/mail";
import { writeToken } from "@/sanity/env";
import { writeClient } from "@/sanity/lib/client";

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Partial<Record<InquiryField, string>> }
  | { ok: false; reason: "failed" };

/**
 * Home contact form (old-site look). Same flow as the old /api/contact route:
 * 1. Validate with the shared zod schema; silently accept honeypot hits.
 * 2. Save a `contactSubmission` document in Sanity (dataset from NEXT_PUBLIC_SANITY_DATASET).
 * 3. Email the admin through Microsoft Graph.
 * Succeeds when at least one of 2/3 worked, so a lead is never lost silently.
 */
export async function submitInquiry(input: InquiryFormInput): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as Partial<Record<InquiryField, string>>,
    };
  }

  const { website, ...lead } = parsed.data;
  if (website) return { ok: true }; // honeypot filled: pretend success, store nothing

  const submittedAt = new Date().toISOString();
  const pageUrl = (await headers()).get("referer") ?? undefined;
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
    console.warn("[submitInquiry] SANITY_API_TOKEN is not set; submission not stored");
  }

  if (isMailConfigured()) {
    try {
      await sendAdminMail({
        subject: `New enquiry: ${lead.name} (${inquiryServiceLabel(lead.service)})`,
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
