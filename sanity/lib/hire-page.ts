import "server-only";

import type { MetaTag } from "@/lib/seo";

import type { HirePageContent } from "@/content/hire/types";

import { sanityFetch } from "./fetch";
import { type PageEntry, resolveLinks } from "./page-urls";
import {
  mapAudienceCards,
  mapCardGrid,
  mapChallenges,
  mapCtaBand,
  mapEngagementModels,
  mapExperienceLevels,
  mapFaq,
  mapFeatureStrip,
  mapHero,
  mapHiringSteps,
  mapIntro,
  mapSecurityControls,
  mapToolTabs,
  mapWhyChoose,
  keywords,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const HIRE_PAGE_QUERY = /* groq */ `*[_id == $id][0]{
  name,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, features, benefits, expertise, models, levels, faq,
  ${P.intro},
  ${P.hiringSteps},
  ${P.audiences},
  ${P.whyChoose},
  ${P.security},
  ${P.toolTabs},
  ${P.ctaBand}
}`;

/**
 * Hire page content from its Sanity `hirePage` document (Studio → Hire Pages, matched by `_id`
 * so a Studio slug change keeps it connected; sanity/lib/page-urls.ts), in the exact shape of
 * `HirePageContent` so the template stays unchanged. Links to renamed pages are resolved.
 * Same rules as Home and service pages: any section or field that is empty in Sanity falls back
 * to the page's code content (content/hire/*.ts, also used when Sanity is not configured or the
 * document doesn't exist). Cache tag: `hirePage` (revalidated by /api/revalidate on publish).
 */
export async function getHirePage(
  page: PageEntry<"hire">,
): Promise<{ content: HirePageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const { content, ogImage, metaTags } = await loadHirePage(page.id, {
    ...page.content,
    slug: page.slug,
  });
  return { content: await resolveLinks(content), ogImage, metaTags };
}

async function loadHirePage(
  id: string,
  f: HirePageContent,
): Promise<{ content: HirePageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const d: Raw = await sanityFetch({
    query: HIRE_PAGE_QUERY,
    params: { id },
    tags: ["hirePage"],
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
      benefits: mapChallenges(d.benefits, f.benefits),
      expertise: mapCardGrid(d.expertise, f.expertise),
      models: mapEngagementModels(d.models, f.models),
      steps: mapHiringSteps(d.steps, f.steps),
      levels: mapExperienceLevels(d.levels, f.levels),
      audiences: mapAudienceCards(d.audiences, f.audiences),
      whyChoose: mapWhyChoose(d.whyChoose, f.whyChoose),
      security: mapSecurityControls(d.security, f.security),
      tools: mapToolTabs(d.tools, f.tools),
      faq: mapFaq(d.faq, f.faq),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
    },
    ogImage: d.seo?.ogImage ?? undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}
