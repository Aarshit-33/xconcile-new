import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AboutPageTemplate } from "@/components/templates/about-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAboutPage } from "@/sanity/lib/about-page";

/**
 * About page (`/about`, design pages/ABOUT US/page.svg). Content: Studio → About Page, falling
 * back to content/about.ts.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage } = await getAboutPage();
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage },
    path: routes.about(),
  });
}

export default async function AboutPage() {
  const { content } = await getAboutPage();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "About Us", path: routes.about() },
          ]),
        ]}
      />
      <AboutPageTemplate content={content} />
    </>
  );
}
