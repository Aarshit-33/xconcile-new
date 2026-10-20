import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

import { revalidateSecret } from "@/sanity/env";

type WebhookPayload = { _type?: string; slug?: { current?: string } };

/**
 * Sanity webhook target. Configure in sanity.io/manage -> API -> Webhooks:
 *   URL:        https://<domain>/api/revalidate
 *   Projection: { _type, slug }
 *   Secret:     SANITY_REVALIDATE_SECRET
 * Revalidates every cached query tagged with the document's `_type`.
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

    revalidateTag(body._type, "max");
    return NextResponse.json({ revalidated: body._type, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
