import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { LegalPageTemplate } from "@/components/templates/legal-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getHome } from "@/sanity/lib/home";
import { getLegalPage } from "@/sanity/lib/legal-page";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * Privacy Policy (`/privacy-policy`, design pages/Privacy Policy.svg; same URL as the old site).
 * Content: Studio → Privacy Policy, falling back to content/legal.ts. Contact section: Studio →
 * Home Page → Contact.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage, metaTags } = await getLegalPage("privacy");
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: routes.privacy(),
  });
}

export default async function PrivacyPolicyPage() {
  const [{ content }, home, settings] = await Promise.all([
    getLegalPage("privacy"),
    getHome(),
    getSiteSettings(),
  ]);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: content.title, path: routes.privacy() },
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
