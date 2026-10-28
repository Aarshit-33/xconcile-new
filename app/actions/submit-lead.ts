"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { leadSchema, serviceLabel, type LeadField, type LeadFormInput } from "@/lib/lead-schema";
import { isMailConfigured, leadEmailHtml, sendAdminMail } from "@/lib/mail";
import { writeToken } from "@/sanity/env.server";
import { writeClient } from "@/sanity/lib/client";

export type LeadResult =
  | { ok: true }
  | { ok: false; reason: "invalid"; fieldErrors: Partial<Record<LeadField, string>> }
  | { ok: false; reason: "failed" };

/**
 * Contact form submission (port of the old /api/contact route).
 * 1. Validate with the shared zod schema; silently accept honeypot hits.
 * 2. Save a `contactSubmission` document in Sanity (Studio inbox).
 * 3. Email the admin through Microsoft Graph.
 * Succeeds when at least one of 2/3 worked, so a lead is never lost silently.
 */
export async function submitLead(input: LeadFormInput): Promise<LeadResult> {
  const parsed = leadSchema.safeParse(input);
  if (!parsed.success) {
    const { fieldErrors } = z.flattenError(parsed.error);
    return {
      ok: false,
      reason: "invalid",
      fieldErrors: Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]]),
      ) as Partial<Record<LeadField, string>>,
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
        company: lead.company || undefined,
        service: lead.service,
        message: lead.message || undefined,
        status: "new",
        submittedAt,
      });
      saved = true;
    } catch (error) {
      console.error("[submitLead] Sanity save failed", error);
    }
  } else {
    console.warn(
      "[submitLead] No Sanity write token (SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN); submission not stored",
    );
  }

  if (isMailConfigured()) {
    try {
      await sendAdminMail({
        subject: `New enquiry: ${lead.name} (${serviceLabel(lead.service)})`,
        replyTo: lead.email,
        html: leadEmailHtml(
          [
            ["Name", lead.name],
            ["Email", lead.email],
            ["Company", lead.company],
            ["Service", serviceLabel(lead.service)],
            ["Message", lead.message],
            ["Page", pageUrl],
          ],
          new Date(submittedAt).toUTCString(),
        ),
      });
      mailed = true;
    } catch (error) {
      console.error("[submitLead] Email failed", error);
    }
  } else {
    console.warn("[submitLead] Graph mail env vars are not set; admin email not sent");
  }

  return saved || mailed ? { ok: true } : { ok: false, reason: "failed" };
}
