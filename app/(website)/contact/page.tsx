import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { ContactPageTemplate } from "@/components/templates/contact-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getContactPage } from "@/sanity/lib/contact-page";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * Contact page (`/contact`, design page-updated/newShit/contact.svg; same URL as the old site,
 * which used to redirect to Home's contact section). Content: Studio → Contact Page, falling back
 * to Home's contact section.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getContactPage();
  return buildMetadata({
    title: seo.title,
    description: seo.description,
    seo: { metaKeywords: seo.keywords, openGraphImage: seo.ogImage },
    path: routes.contact(),
  });
}

export default async function ContactPage() {
  const [content, settings] = await Promise.all([getContactPage(), getSiteSettings()]);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Contact", path: routes.contact() },
          ]),
        ]}
      />
      <ContactPageTemplate content={content} contactEmail={settings.contact.email} />
    </>
  );
}
