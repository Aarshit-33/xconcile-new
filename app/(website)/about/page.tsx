import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { AboutPageTemplate } from "@/components/templates/about-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getAboutPage } from "@/sanity/lib/about-page";
import { getHome } from "@/sanity/lib/home";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * About page (`/about`, design pages/ABOUT US/page.svg). Content: Studio → About Page, falling
 * back to content/about.ts.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage, metaTags } = await getAboutPage();
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: routes.about(),
  });
}

export default async function AboutPage() {
  // Contact section is shared with Home (Studio → Home Page → Contact).
  const [{ content }, home, settings] = await Promise.all([
    getAboutPage(),
    getHome(),
    getSiteSettings(),
  ]);
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
      <AboutPageTemplate
        content={content}
        inquiry={home.inquiry}
        contactEmail={settings.contact.email}
      />
    </>
  );
}
