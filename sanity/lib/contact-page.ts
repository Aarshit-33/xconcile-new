import "server-only";

import type { MetaTag } from "@/lib/seo";

import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import { getHome, mapInquiry, type InquiryContent } from "./home";
import type { Raw } from "./sections";

export type ContactPageContent = {
  inquiry: InquiryContent;
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    metaTags?: MetaTag[];
  };
};

const CONTACT_QUERY = /* groq */ `*[_id == "contactPage"][0]{
  contact,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) }
}`;

/** NOT IN DESIGN (the design has no SEO fields). Rendered as "<title> | Xconcile". */
const FALLBACK_SEO = {
  title: "Contact Us",
  description:
    "Contact Xconcile about outsourced accounting, bookkeeping, tax, payroll and audit support for U.S. businesses and CPA firms. We reply within one business day.",
};

/**
 * Contact page (`/contact`) from the `contactPage` singleton (Studio → Contact Page). The contact
 * section falls back to Home's (Studio → Home Page → Contact, then content/home.ts). Works with no
 * `contactPage` document at all. Cache tags: `contactPage` plus Home's (via its loader).
 */
async function loadContactPage(): Promise<ContactPageContent> {
  const [d, home] = await Promise.all([
    sanityFetch({ query: CONTACT_QUERY, tags: ["contactPage"] }).catch(() => null) as Promise<Raw>,
    getHome(),
  ]);

  return {
    inquiry: mapInquiry(d?.contact, home.inquiry),
    seo: {
      title: d?.seo?.title || FALLBACK_SEO.title,
      description: d?.seo?.description || FALLBACK_SEO.description,
      keywords: Array.isArray(d?.seo?.keywords) ? d.seo.keywords : undefined,
      ogImage: d?.seo?.ogImage || undefined,
      metaTags: d?.seo?.metaTags ?? undefined,
    },
  };
}

/** `loadContactPage` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getContactPage = withResolvedLinks(loadContactPage);
