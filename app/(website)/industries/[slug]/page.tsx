import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { IndustryPageTemplate } from "@/components/templates/industry-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";
import { getIndustryPage } from "@/sanity/lib/industry-page";
import { getPageUrls } from "@/sanity/lib/page-urls";

/**
 * Industry pages at `/industries/<slug>` (live URL structure, lib/routes.ts). Live slugs come
 * from sanity/lib/page-urls.ts (Studio's "URL slug", else the code default) and are prerendered;
 * a page's old slug 301s to its live URL; anything else is a 404. The breadcrumb goes Home →
 * Industries (the `/industries` gallery) → page.
 */
export async function generateStaticParams() {
  const urls = await getPageUrls();
  return urls.pages.filter((p) => p.kind === "industry").map((p) => ({ slug: p.slug }));
}

/** The industry page live at `/industries/<slug>`. An old URL of one 301s to its live URL. */
async function industryPage(slug: string) {
  const urls = await getPageUrls();
  const page = urls.byPath(routes.industry(slug));
  if (page?.kind === "industry") return page;
  const to = urls.redirectFor(routes.industry(slug));
  if (to) permanentRedirect(to);
  return undefined;
}

/** Real 404 status for unknown slugs under Partial Prefetching (see app/(website)/[slug]). */
export const ensureStatic = "navigation";

/**
 * Allow navigation to block on `params` (see app/(website)/[slug] for the full reasoning): the
 * slug must be read before streaming so `notFound()` can still send a real 404. A Suspense
 * boundary here turned unknown slugs into soft 404s (200).
 */
export const instant = false;

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const entry = await industryPage(slug);
  if (!entry) return {};
  const { content, ogImage, metaTags } = await getIndustryPage(entry);
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: entry.path,
  });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const entry = await industryPage(slug);
  if (!entry) notFound();

  const { content: page } = await getIndustryPage(entry);
  const path = entry.path;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: page.name, description: page.seo.description, path }),
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Industries", path: routes.industries() },
            { name: page.name, path },
          ]),
          faqJsonLd(page.faq.items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) }))),
        ]}
      />
      <IndustryPageTemplate content={page} />
    </>
  );
}
