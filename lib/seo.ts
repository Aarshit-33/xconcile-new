import type { Metadata } from "next";
import type {
  AccountingService,
  Article,
  BlogPosting,
  BreadcrumbList,
  FAQPage,
  ItemList,
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
/** One custom tag from Studio → SEO → "Custom meta / Open Graph tags" (seoMeta.metaTags). */
export type MetaTag = { key?: string | null; value?: string | null };

export type SanitySeo = {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  openGraphImage?: string;
  openGraphImageAlt?: string;
  /** Editor key/value tags: override the generated og:* / twitter:* values or add new meta tags. */
  metaTags?: MetaTag[] | null;
} | null;

/**
 * Splits Studio's custom tags into Open Graph, Twitter and other meta tags (user request
 * 2026-10-28: "OG tags in Sanity as key/value for each page"). `og:title` → og.title,
 * `twitter:card` → twitter.card, `author` / `robots` / `description` / `keywords` replace the
 * standard tags, `canonical` (also set by SEO → "Canonical URL") replaces the self-referencing
 * canonical, anything else (e.g. `article:author`, `theme-color`) is added as a meta tag.
 */
function splitMetaTags(tags: MetaTag[] | null | undefined) {
  const og: Record<string, string> = {};
  const twitter: Record<string, string> = {};
  const other: Record<string, string> = {};
  for (const t of tags ?? []) {
    const key = t?.key?.trim();
    const value = t?.value?.trim();
    if (!key || !value) continue;
    if (key.startsWith("og:")) og[key.slice(3)] = value;
    else if (key.startsWith("twitter:")) twitter[key.slice(8)] = value;
    else other[key] = value;
  }
  return { og, twitter, other };
}

/** og:* keys the openGraph object below covers; other og:* keys are output as-is. */
const OG_KEYS = new Set([
  "title",
  "description",
  "type",
  "url",
  "site_name",
  "locale",
  "image",
  "image:url",
  "image:alt",
  "image:width",
  "image:height",
]);
const TWITTER_KEYS = new Set([
  "card",
  "title",
  "description",
  "image",
  "image:alt",
  "site",
  "creator",
]);

/**
 * Drops a trailing brand suffix ("… | Xconcile", "… - Xconcile", "… – Xconcile") so the layout's
 * title template ("%s | Xconcile") adds it exactly once. Migrated blog posts carry the suffix in
 * their SEO title, which rendered "… | Xconcile | Xconcile" (audit 2026-10-27, SEO4).
 */
export function stripBrandSuffix(title?: string): string | undefined {
  if (!title) return title;
  const stripped = title
    .replace(new RegExp(`\\s*[|\\-–—:]\\s*${siteConfig.name}\\s*$`, "i"), "")
    .trim();
  return stripped || title;
}

/** Absolute URL for a path (`/og.png`) or an already-absolute URL (`https://cdn.sanity.io/…`). */
const toAbsolute = (src: string) => (/^https?:\/\//i.test(src) ? src : absoluteUrl(src));

/**
 * Build page metadata from the Sanity `seo` field with sensible fallbacks.
 * Always sets a self-referencing, absolute canonical on the one preferred origin
 * (`https://xconcile.com/...`; the home page is `https://xconcile.com/`).
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
  // Trimmed: Studio text can carry stray spaces (audit SEO8: a description ended in " ").
  const metaTitle = stripBrandSuffix((seo?.metaTitle || title)?.trim() || undefined);
  const metaDescription = (
    seo?.metaDescription?.trim() ||
    description?.trim() ||
    siteConfig.defaultDescription
  ).trim();
  const image = seo?.openGraphImage || siteConfig.ogImage;
  // Studio custom tags win over the generated values.
  const { og, twitter: tw, other } = splitMetaTags(seo?.metaTags);
  const ogImage = og.image || og["image:url"] || image;
  const ogTitle = og.title || metaTitle;
  const ogDescription = og.description || metaDescription;
  for (const [k, v] of Object.entries(og)) if (!OG_KEYS.has(k)) other[`og:${k}`] = v;
  for (const [k, v] of Object.entries(tw)) if (!TWITTER_KEYS.has(k)) other[`twitter:${k}`] = v;
  // Standard tags Next already outputs: replace them instead of adding a duplicate tag.
  const {
    author,
    robots,
    description: customDescription,
    keywords: customKeywords,
    canonical: customCanonical,
    ...rest
  } = other;
  // Studio canonical override (SEO → "Canonical URL": full URL or `/path`); defaults to the
  // page's own URL.
  const canonical = customCanonical ? toAbsolute(customCanonical) : absoluteUrl(path);

  return {
    title: metaTitle,
    description: customDescription || metaDescription,
    keywords: customKeywords ? customKeywords.split(",").map((k) => k.trim()) : seo?.metaKeywords,
    ...(author ? { authors: [{ name: author }] } : {}),
    alternates: { canonical },
    openGraph: {
      type: (og.type || "website") as "website",
      url: og.url || canonical,
      siteName: og.site_name || siteConfig.name,
      locale: og.locale || siteConfig.locale,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          alt: og["image:alt"] || seo?.openGraphImageAlt || ogTitle || siteConfig.name,
          ...(Number(og["image:width"]) ? { width: Number(og["image:width"]) } : {}),
          ...(Number(og["image:height"]) ? { height: Number(og["image:height"]) } : {}),
        },
      ],
    },
    twitter: {
      card: (tw.card || "summary_large_image") as "summary_large_image",
      title: tw.title || ogTitle,
      description: tw.description || ogDescription,
      images: [{ url: tw.image || ogImage, alt: tw["image:alt"] || og["image:alt"] || ogTitle }],
      ...(tw.site ? { site: tw.site } : {}),
      ...(tw.creator ? { creator: tw.creator } : {}),
    },
    ...(Object.keys(rest).length ? { other: rest } : {}),
    // Only set when needed: a `robots: undefined` key overrides the root layout's robots (the
    // production `max-image-preview:large` directives, or noindex on previews) with nothing.
    ...(noindex ? { robots: { index: false, follow: true } } : robots ? { robots } : {}),
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
    thumbnailUrl: [
      // Posters are Sanity CDN URLs (already absolute) or local paths. Audit SEO3: absoluteUrl()
      // on a CDN URL produced "https://xconcile.com/https://cdn.sanity.io/…".
      toAbsolute(input.thumbnail),
      `https://i.ytimg.com/vi/${input.youtubeId}/hqdefault.jpg`,
    ],
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

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
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

/** Ordered list of linked pages, e.g. the Blog gallery's posts (newest first). */
export function itemListJsonLd(items: { name: string; path: string }[]): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

/**
 * Full ISO 8601 date-time for article dates (audit N-SEO15): Studio "date" fields are day-only
 * ("2026-03-21"), which Google accepts but recommends with a time and zone. Day-only values
 * become midnight UTC; anything else is passed through unchanged.
 */
const isoDateTime = (value?: string | null) =>
  value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00Z` : value || undefined;

/** One blog article (`/blog/<slug>`). */
export function blogPostingJsonLd(input: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  authorName?: string | null;
}): WithContext<BlogPosting> {
  const datePublished = isoDateTime(input.datePublished);
  const dateModified = isoDateTime(input.dateModified);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: absoluteUrl(input.path),
    url: absoluteUrl(input.path),
    ...(input.image ? { image: input.image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    // Organization author/publisher = the Organization node every page carries (#organization).
    author: input.authorName
      ? { "@type": "Person", name: input.authorName }
      : { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

/** One case study (`/case-studies/<slug>`), written by the company. */
export function caseStudyJsonLd(input: {
  title: string;
  description?: string | null;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
}): WithContext<Article> {
  const datePublished = isoDateTime(input.datePublished);
  const dateModified = isoDateTime(input.dateModified);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    ...(input.description ? { description: input.description } : {}),
    mainEntityOfPage: absoluteUrl(input.path),
    url: absoluteUrl(input.path),
    ...(input.image ? { image: input.image } : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: { "@id": absoluteUrl("/#organization") },
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}
