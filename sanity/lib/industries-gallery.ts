import "server-only";

import type { MetaTag } from "@/lib/seo";

import { industriesGallery } from "@/content/industries/gallery";
import type { IndustriesGalleryContent } from "@/content/industries/types";

import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import {
  mapCtaBand,
  mapFaq,
  mapFeatureCards,
  mapHero,
  mapIndustries,
  keywords,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const INDUSTRIES_PAGE_QUERY = /* groq */ `*[_type == "industriesPage" && _id == "industriesPage"][0]{
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, features, faq,
  ${P.industries},
  ${P.ctaBand}
}`;

/**
 * Industries gallery content (`/industries`) from the `industriesPage` singleton (Studio →
 * Industries Gallery), in the exact shape of `IndustriesGalleryContent`. Same rules as every other
 * page: any section or field left empty in Sanity falls back to content/industries/gallery.ts
 * (also used when Sanity is not configured or the document doesn't exist). Cache tag:
 * `industriesPage` (revalidated by /api/revalidate on publish).
 */
async function loadIndustriesGallery(): Promise<{
  content: IndustriesGalleryContent;
  ogImage?: string;
  metaTags?: MetaTag[];
}> {
  const f = industriesGallery;
  const d: Raw = await sanityFetch({ query: INDUSTRIES_PAGE_QUERY, tags: ["industriesPage"] });
  if (!d) return { content: f };

  return {
    content: {
      seo: {
        title: d.seo?.title ?? f.seo.title,
        description: d.seo?.description ?? f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
      hero: mapHero(d.hero, f.hero),
      features: mapFeatureCards(d.features, f.features),
      industries: mapIndustries(d.industries, f.industries),
      faq: mapFaq(d.faq, f.faq),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
    },
    ogImage: d.seo?.ogImage ?? undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}

/** `loadIndustriesGallery` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getIndustriesGallery = withResolvedLinks(loadIndustriesGallery);
