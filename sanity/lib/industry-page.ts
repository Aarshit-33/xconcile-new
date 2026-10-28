import "server-only";

import type { MetaTag } from "@/lib/seo";

import type { IndustryPageContent } from "@/content/industries/types";

import { sanityFetch } from "./fetch";
import { type PageEntry, resolveLinks } from "./page-urls";
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

const INDUSTRY_PAGE_QUERY = /* groq */ `*[_id == $id][0]{
  name,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, features, challenges, services, subIndustries, faq,
  ${P.intro},
  ${P.whyChoose},
  ${P.ctaBand}
}`;

/**
 * Industry page content from its Sanity `industryPage` document (Studio → Industry Pages (New
 * Site), matched by `_id` so a Studio slug change keeps it connected; sanity/lib/page-urls.ts),
 * in the exact shape of `IndustryPageContent` so the template stays unchanged. Links to renamed
 * pages are resolved. Same rules as the other pages: any section or field that is empty in Sanity falls
 * back to the page's code content (content/industries/*.ts, also used when Sanity is not
 * configured or the document doesn't exist). Cache tag: `industryPage` (revalidated by
 * /api/revalidate on publish).
 */
export async function getIndustryPage(
  page: PageEntry<"industry">,
): Promise<{ content: IndustryPageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const { content, ogImage, metaTags } = await loadIndustryPage(page.id, {
    ...page.content,
    slug: page.slug,
  });
  return { content: await resolveLinks(content), ogImage, metaTags };
}

async function loadIndustryPage(
  id: string,
  f: IndustryPageContent,
): Promise<{ content: IndustryPageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const d: Raw = await sanityFetch({
    query: INDUSTRY_PAGE_QUERY,
    params: { id },
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
    metaTags: d.seo?.metaTags ?? undefined,
  };
}
