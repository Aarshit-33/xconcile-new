"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { isMailConfigured, leadEmailHtml, sendAdminMail } from "@/lib/mail";
import { writeToken } from "@/sanity/env.server";
import { writeClient } from "@/sanity/lib/client";

export type NewsletterResult =
  { ok: true; status: "subscribed" | "already" } | { ok: false; reason: "invalid" | "failed" };

const schema = z.object({
  email: z.email().max(254),
  /** Honeypot: hidden field only bots fill in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

/**
 * "Stay Updated" newsletter sign-up (blog articles). Same flow as the old site's
 * /api/newsletter route (old-code/xconcile-website/app/api/newsletter/route.ts), as a Server
 * Action writing to THIS site's dataset (NEXT_PUBLIC_SANITY_DATASET):
 * 1. Validate the email; silently accept honeypot hits.
 * 2. Existing active subscriber → "already"; unsubscribed → reactivated.
 * 3. Otherwise create a `newsletterSubscription` document (Studio → Newsletter Subscribers).
 * 4. New or reactivated subscriber: notify connect@xconcile.com (lib/mail.ts; user request
 *    2026-10-28, option A). The subscriber gets no email. A failed notification never fails the
 *    sign-up: the subscriber is already saved.
 */
export async function subscribeNewsletter(input: {
  email: string;
  website?: string;
}): Promise<NewsletterResult> {
  const parsed = schema.safeParse({
    email: input.email?.trim().toLowerCase(),
    website: input.website ?? "",
  });
  if (!parsed.success) {
    // A filled honeypot with a valid email: pretend success, store nothing.
    if (input.website && z.email().safeParse(input.email?.trim()).success)
      return { ok: true, status: "subscribed" };
    return { ok: false, reason: "invalid" };
  }
  const { email } = parsed.data;

  if (!writeToken) {
    console.warn(
      "[subscribeNewsletter] No Sanity write token (SANITY_API_WRITE_TOKEN or SANITY_API_TOKEN); subscription not stored",
    );
    return { ok: false, reason: "failed" };
  }

  try {
    const existing = await writeClient.fetch<{ _id: string; status?: string } | null>(
      `*[_type == "newsletterSubscription" && lower(email) == $email][0]{ _id, status }`,
      { email },
    );
    const subscribedAt = new Date().toISOString();

    const source = (await headers()).get("referer") ?? undefined;

    if (existing) {
      if (existing.status !== "unsubscribed") return { ok: true, status: "already" };
      await writeClient.patch(existing._id).set({ status: "active", subscribedAt }).commit();
      await notifyAdmin(email, subscribedAt, source, true);
      return { ok: true, status: "subscribed" };
    }

    await writeClient.create({
      _type: "newsletterSubscription",
      email,
      subscribedAt,
      status: "active",
      source,
    });
    await notifyAdmin(email, subscribedAt, source, false);
    return { ok: true, status: "subscribed" };
  } catch (error) {
    console.error("[subscribeNewsletter] Sanity save failed", error);
    return { ok: false, reason: "failed" };
  }
}

/** Email connect@xconcile.com about a new (or returning) subscriber; logs instead of throwing. */
async function notifyAdmin(
  email: string,
  subscribedAt: string,
  source: string | undefined,
  returning: boolean,
) {
  if (!isMailConfigured()) {
    console.warn("[subscribeNewsletter] Graph mail env vars are not set; admin email not sent");
    return;
  }
  const heading = returning ? "Newsletter subscriber is back" : "New newsletter subscriber";
  try {
    await sendAdminMail({
      subject: `${heading}: ${email}`,
      replyTo: email,
      html: leadEmailHtml(
        [
          ["Email", email],
          ["Status", returning ? "Re-subscribed (had unsubscribed before)" : "New subscriber"],
          ["Page", source],
        ],
        new Date(subscribedAt).toUTCString(),
        heading,
      ),
    });
  } catch (error) {
    console.error("[subscribeNewsletter] Admin email failed", error);
  }
}
