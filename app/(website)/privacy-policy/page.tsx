import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { PrivacyPageTemplate } from "@/components/templates/privacy-page";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getPrivacyPage } from "@/sanity/lib/privacy-page";

/**
 * Privacy Policy (`/privacy-policy`, same URL as the old site). Content: Studio → Privacy Policy
 * (copied from the old site's document on 2026-10-27). Linked from the cookie banner and footer.
 */
export async function generateMetadata(): Promise<Metadata> {
  const page = await getPrivacyPage();
  if (!page) return {};
  return buildMetadata({
    title: page.seo.title || page.title,
    description:
      page.seo.description || "How Xconcile collects, uses, and protects your personal information.",
    seo: { metaKeywords: page.seo.keywords, openGraphImage: page.seo.ogImage },
    path: routes.privacy(),
  });
}

export default async function PrivacyPolicyPage() {
  const page = await getPrivacyPage();
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: page.title, path: routes.privacy() },
          ]),
        ]}
      />
      <PrivacyPageTemplate content={page} />
    </>
  );
}
