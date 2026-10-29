import { notFound, permanentRedirect } from "next/navigation";

import { LEGACY_SERVICE_SLUGS } from "@/lib/legacy-urls";
import { routes } from "@/lib/routes";
import { liveUrlFor } from "@/sanity/lib/page-urls";

/**
 * Old-site URL /services/<slug> → the page's live URL in ONE 301 (2026-10-29: a next.config
 * rule sent it to /<old-slug>, which then 301'd again to the renamed slug). Resolved through
 * sanity/lib/page-urls.ts, so it follows slug changes made in Studio. Unknown slugs: 404.
 */
export function generateStaticParams() {
  return LEGACY_SERVICE_SLUGS.map((slug) => ({ slug }));
}

/** Real 404 for unknown slugs (same reason as app/(website)/[slug]/page.tsx). */
export const ensureStatic = "navigation";
export const instant = false;

export default async function LegacyServiceUrl({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const to = await liveUrlFor(routes.service(slug));
  if (!to) notFound();
  permanentRedirect(to);
}
