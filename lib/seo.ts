import type { Metadata } from "next";
import type {
  AccountingService,
  BreadcrumbList,
  FAQPage,
  Organization,
  Service,
  VideoObject,
  WebSite,
  WithContext,
} from "schema-dts";

import type { Office, SiteSettings } from "@/sanity/lib/site-settings";

import { absoluteUrl } from "./routes";
import { siteConfig } from "./site-config";

/** Shape of the `seo` object in the Sanity schema (sanity/schemaTypes/objects/seo.ts). */
export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  openGraphImage?: string;
  openGraphImageAlt?: string;
} | null;

/**
 * Build page metadata from the Sanity `seo` field with sensible fallbacks.
 * Always sets a self-referencing canonical.
 */
export function buildMetadata({
  seo,
  title,
  description,
  path,
  noindex = false,
}: {
  seo?: SanitySeo;
  title?: string;
  description?: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const metaTitle = seo?.metaTitle || title;
  const metaDescription = seo?.metaDescription || description || siteConfig.defaultDescription;
  const image = seo?.openGraphImage || siteConfig.ogImage;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: seo?.metaKeywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      title: metaTitle,
      description: metaDescription,
      images: [{ url: image, alt: seo?.openGraphImageAlt || metaTitle || siteConfig.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [image],
    },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders. Render with <JsonLd data={...} /> from components/seo/json-ld.tsx.
// ---------------------------------------------------------------------------

const postalAddress = (o: Office) => ({
  "@type": "PostalAddress" as const,
  streetAddress: o.streetAddress,
  addressLocality: o.addressLocality,
  addressRegion: o.addressRegion,
  postalCode: o.postalCode,
  addressCountry: o.addressCountry,
});

/** Contact data for the builders below: Sanity Site Settings (`getSiteSettings()`). */
type OrgData = Pick<SiteSettings, "contact" | "offices" | "sameAs">;

export function organizationJsonLd(s: OrgData): WithContext<Organization> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    email: s.contact.email,
    sameAs: [...s.sameAs],
    address: s.offices.map(postalAddress),
    contactPoint: s.contact.phones.map((p) => ({
      "@type": "ContactPoint" as const,
      contactType: p.label === "Sales" ? "sales" : "human resources",
      telephone: p.tel,
      email: s.contact.email,
    })),
  };
}

/** Local SEO: one AccountingService per real office, linked to the Organization. */
export function localBusinessJsonLd(s: OrgData): WithContext<AccountingService>[] {
  return s.offices.map((o) => ({
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": absoluteUrl(`/#office-${o.country}`),
    name: `${siteConfig.name} (${o.name})`,
    url: siteConfig.url,
    image: absoluteUrl(siteConfig.ogImage),
    email: s.contact.email,
    telephone: o.country === "in" ? s.contact.phones[0]?.tel : undefined,
    address: postalAddress(o),
    areaServed: { "@type": "Country", name: "United States" },
    parentOrganization: { "@id": absoluteUrl("/#organization") },
  }));
}

export function videoJsonLd(input: {
  youtubeId: string;
  title: string;
  description: string;
  thumbnail: string;
  uploadDate: string;
  duration?: string;
}): WithContext<VideoObject> {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: input.title,
    description: input.description,
    thumbnailUrl: [absoluteUrl(input.thumbnail), `https://i.ytimg.com/vi/${input.youtubeId}/hqdefault.jpg`],
    embedUrl: `https://www.youtube-nocookie.com/embed/${input.youtubeId}`,
    contentUrl: `https://www.youtube.com/watch?v=${input.youtubeId}`,
    uploadDate: input.uploadDate,
    duration: input.duration,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function websiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function serviceJsonLd(input: {
  name: string;
  description?: string;
  path: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: { "@type": "Country", name: "United States" },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
