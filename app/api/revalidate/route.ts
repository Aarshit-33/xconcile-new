import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

type WebhookPayload = { _type?: string; slug?: { current?: string } };

/**
 * Sanity webhook target. Configure in sanity.io/manage -> API -> Webhooks:
 *   URL:        https://<domain>/api/revalidate
 *   Dataset:    the site dataset (and the blog dataset, if blog posts live elsewhere)
 *   Trigger on: Create, Update, Delete
 *   Projection: { _type, slug }
 *   Secret:     SANITY_REVALIDATE_SECRET (same value in Vercel -> Settings -> Environment Variables)
 * Expires every cached query tagged with the document's `_type` immediately (`{ expire: 0 }`),
 * so the next request renders fresh content. It used `"max"` (stale-while-revalidate), which
 * served the old page once more after every publish (2026-10-22: "doesn't change instantly").
 *
 * Manual purge (no webhook needed), e.g. after a bulk import:
 *   GET /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>            -> everything (`sanity` tag)
 *   GET /api/revalidate?secret=<SANITY_REVALIDATE_SECRET>&tag=home   -> one document type
 */
export async function POST(req: NextRequest) {
  try {
    if (!revalidateSecret) {
      return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }
    if (!body?._type) {
      return new NextResponse("Bad request", { status: 400 });
    }

    revalidateTag(body._type, { expire: 0 });
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  if (!revalidateSecret) {
    return new NextResponse("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
  }
  const { searchParams } = req.nextUrl;
  if (searchParams.get("secret") !== revalidateSecret) {
    return new NextResponse("Invalid secret", { status: 401 });
  }
  // Every sanityFetch call is tagged `sanity`, so the default purges all Sanity content.
  const tag = searchParams.get("tag") || "sanity";
  revalidateTag(tag, { expire: 0 });
  return NextResponse.json({ revalidated: tag, now: Date.now() });
}
