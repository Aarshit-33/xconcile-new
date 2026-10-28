import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudiesGalleryTemplate } from "@/components/templates/case-studies-gallery";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { getAllCaseStudies, getCaseStudiesGallery } from "@/sanity/lib/case-studies";

/**
 * Case Studies gallery (`/case-studies`, design pages/Case study gallary/page.svg). Page copy:
 * Studio → Case Studies Gallery (fallback content/case-studies.ts). Cards: Studio → Case Studies.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage } = await getCaseStudiesGallery();
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage },
    path: routes.caseStudies(),
  });
}

export default async function CaseStudiesPage() {
  const [{ content }, items] = await Promise.all([getCaseStudiesGallery(), getAllCaseStudies()]);
  const path = routes.caseStudies();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Case Studies", path },
          ]),
          ...(items.length
            ? [
                itemListJsonLd(
                  items.map((c) => ({ name: c.title, path: routes.caseStudy(c.slug) })),
                ),
              ]
            : []),
        ]}
      />
      <CaseStudiesGalleryTemplate content={content} items={items} />
    </>
  );
}
