import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { LegalPageTemplate } from "@/components/templates/legal-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getHome } from "@/sanity/lib/home";
import { getLegalPage } from "@/sanity/lib/legal-page";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * Terms of Use (`/terms-of-use`, design pages/Terms of Use.svg; new, the old site had none).
 * Content: Studio → Terms of Use, falling back to content/legal.ts. Contact section: Studio →
 * Home Page → Contact.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage, metaTags } = await getLegalPage("terms");
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: routes.terms(),
  });
}

export default async function TermsOfUsePage() {
  const [{ content }, home, settings] = await Promise.all([
    getLegalPage("terms"),
    getHome(),
    getSiteSettings(),
  ]);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: content.title, path: routes.terms() },
          ]),
        ]}
      />
      <LegalPageTemplate
        content={content}
        inquiry={home.inquiry}
        contactEmail={settings.contact.email}
      />
    </>
  );
}
