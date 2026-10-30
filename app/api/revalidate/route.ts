import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env.server";

type WebhookPayload = { _type?: string; slug?: { current?: string } };

/**
 * Sanity webhook target. Configure in sanity.io/manage -> API -> Webhooks:
 *   URL:        https://<domain>/api/revalidate
 *   Dataset:    the site dataset (NEXT_PUBLIC_SANITY_DATASET)
 *   Trigger on: Create, Update, Delete
 *   Filter:     !(_id in path("captcha.**"))   (skips the contact form's CAPTCHA records)
 *   Projection: { _type, slug }
 *   Secret:     SANITY_REVALIDATE_SECRET (same value in Vercel -> Settings -> Environment Variables)
 * Expires every cached query tagged with the document's `_type` immediately (`{ expire: 0 }`),
 * so the next request renders fresh content. It used `"max"` (stale-while-revalidate), which
 * served the old page once more after every publish (2026-10-22: "doesn't change instantly").
 *
 * Manual purge (no webhook needed), e.g. after a bulk import. Prefer the header form, which keeps
 * the secret out of URLs, logs and browser history (security audit S11):
 *   curl -H "Authorization: Bearer <SANITY_REVALIDATE_SECRET>" https://<domain>/api/revalidate
 *   GET /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>            -> everything (`sanity` tag)
 *   GET /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>&tag=home   -> one document type
 *
 * Responses are generic: callers can't tell whether the secret is configured, and error details
 * only go to the server log.
 */
const unauthorized = () => new NextResponse("Unauthorized", { status: 401 });

/** Constant-time comparison with the configured secret. */
function isSecret(value: string | null | undefined) {
  if (!revalidateSecret || !value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(revalidateSecret);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
      return unauthorized();
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, revalidateSecret);

    if (!isValidSignature) return unauthorized();
    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error("[revalidate]", err);
    return new NextResponse("Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!revalidateSecret) console.error("[revalidate] SANITY_REVALIDATE_SECRET is not set");
  const { searchParams } = req.nextUrl;
  const bearer = req.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!isSecret(bearer) && !isSecret(searchParams.get("secret"))) return unauthorized();
  // Every sanityFetch call is tagged `sanity`, so the default purges all Sanity content.
  const tag = searchParams.get("tag") || "sanity";
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: tag, now: Date.now() });
}
