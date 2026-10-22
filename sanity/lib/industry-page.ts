import "server-only";

import type { IndustryPageContent } from "@/content/industries/types";

import { sanityFetch } from "./fetch";
import {
  mapCardGrid,
  mapChallenges,
  mapCtaBand,
  mapFaq,
  mapFeatureStrip,
  mapHero,
  mapIntro,
  mapSubIndustries,
  mapWhyChoose,
  keywords,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const INDUSTRY_PAGE_QUERY = /* groq */ `*[_type == "industryPage" && slug.current == $slug][0]{
  name,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url },
  hero, features, challenges, services, subIndustries, faq,
  ${P.intro},
  ${P.whyChoose},
  ${P.ctaBand}
}`;

/**
 * Industry page content from its Sanity `industryPage` document (Studio → Industry Pages (New
 * Site), matched by slug), in the exact shape of `IndustryPageContent` so the template stays
 * unchanged. Same rules as the other pages: any section or field that is empty in Sanity falls
 * back to the page's code content (content/industries/*.ts, also used when Sanity is not
 * configured or the document doesn't exist). Cache tag: `industryPage` (revalidated by
 * /api/revalidate on publish).
 */
export async function getIndustryPage(
  f: IndustryPageContent,
): Promise<{ content: IndustryPageContent; ogImage?: string }> {
  const d: Raw = await sanityFetch({
    query: INDUSTRY_PAGE_QUERY,
    params: { slug: f.slug },
    tags: ["industryPage"],
  });
  if (!d) return { content: f };

  return {
    content: {
      slug: f.slug,
      name: d.name ?? f.name,
      seo: {
        title: d.seo?.title ?? f.seo.title,
        description: d.seo?.description ?? f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
      // Same mapper per section type on every page (./sections.ts).
      hero: mapHero(d.hero, f.hero),
      features: mapFeatureStrip(d.features, f.features),
      intro: mapIntro(d.intro, f.intro),
      challenges: mapChallenges(d.challenges, f.challenges),
      services: mapCardGrid(d.services, f.services),
      subIndustries: mapSubIndustries(d.subIndustries, f.subIndustries),
      whyChoose: mapWhyChoose(d.whyChoose, f.whyChoose),
      faq: mapFaq(d.faq, f.faq),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
    },
    ogImage: d.seo?.ogImage ?? undefined,
  };
}
