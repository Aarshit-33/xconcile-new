import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { IndustriesGalleryTemplate } from "@/components/templates/industries-gallery";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { getIndustriesGallery } from "@/sanity/lib/industries-gallery";

/**
 * Industries gallery (`/industries`, design pages/industry/Industry.svg): every industry card,
 * linking to its page where one exists. Content: Studio → Industries Gallery, falling back to
 * content/industries/gallery.ts.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage, metaTags } = await getIndustriesGallery();
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: routes.industries(),
  });
}

export default async function IndustriesPage() {
  const { content } = await getIndustriesGallery();
  const path = routes.industries();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Industries", path },
          ]),
          faqJsonLd(
            content.faq.items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) })),
          ),
        ]}
      />
      <IndustriesGalleryTemplate content={content} />
    </>
  );
}
