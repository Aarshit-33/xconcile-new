import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { IndustryPageTemplate } from "@/components/templates/industry-page";
import { industryPages } from "@/content/industries";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { getIndustryPage } from "@/sanity/lib/industry-page";

/**
 * Industry pages at `/industries/<slug>` (live URL structure, lib/routes.ts). Only slugs in the
 * registry are prerendered; anything else is a 404. There is no `/industries` index yet (no
 * design), so the breadcrumb goes Home → page.
 */
export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }));
}

/** Real 404 status for unknown slugs under Partial Prefetching (see app/(website)/[slug]). */
export const ensureStatic = "navigation";

/**
 * Allow navigation to block on `params` (see app/(website)/[slug] for the full reasoning): the
 * slug must be read before streaming so `notFound()` can still send a real 404. A Suspense
 * boundary here turned unknown slugs into soft 404s (200).
 */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = industryPages[slug];
  if (!entry) return {};
  const { content, ogImage } = await getIndustryPage(entry);
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage },
    path: routes.industry(slug),
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const entry = industryPages[slug];
  if (!entry) notFound();

  const { content: page } = await getIndustryPage(entry);
  const path = routes.industry(slug);

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: page.name, description: page.seo.description, path }),
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: page.name, path },
          ]),
          faqJsonLd(page.faq.items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) }))),
        ]}
      />
      <IndustryPageTemplate content={page} />
    </>
  );
}
