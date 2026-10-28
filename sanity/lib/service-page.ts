import "server-only";

import type { MetaTag } from "@/lib/seo";

import type { ServicePageContent } from "@/content/services/types";

import { sanityFetch } from "./fetch";
import { type PageEntry, resolveLinks } from "./page-urls";
import {
  mapBlog,
  mapCaseStudies,
  mapChallenges,
  mapCtaBand,
  mapFaq,
  mapFeatureCards,
  mapHero,
  mapIndustries,
  mapIntro,
  mapProcess,
  mapSecurityControls,
  mapServices,
  mapStats,
  mapTestimonials,
  mapToolTabs,
  mapWhyChoose,
  keywords,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const SERVICE_PAGE_QUERY = /* groq */ `*[_id == $id][0]{
  name,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, challenges, featureGrid, services, process, extraServices, blog, faq,
  ${P.stats},
  ${P.intro},
  ${P.caseStudies},
  ${P.industries},
  ${P.whyChoose},
  ${P.security},
  ${P.toolTabs},
  ${P.testimonials},
  ${P.ctaBand}
}`;

/** Optional section: mapped only when the page's code content has it (its fallback). */
function optional<T>(d: Raw, f: T | undefined, map: (d: Raw, f: T) => T): T | undefined {
  return f ? map(d, f) : undefined;
}

/**
 * Service page content from its Sanity `servicePage` document (Studio → Service Pages (New
 * Site), matched by `_id` so a Studio slug change keeps it connected; sanity/lib/page-urls.ts),
 * in the exact shape of `ServicePageContent` so the template stays unchanged. Links to renamed
 * pages are resolved. Same rules as Home (sanity/lib/home.ts): any section or field that is empty in
 * Sanity falls back to the page's code content (content/services/*.ts, also used when Sanity is
 * not configured or the document doesn't exist). Cache tag: `servicePage`.
 *
 * Sections a page's design doesn't draw (e.g. the RCM page has no services accordion, case
 * studies, process, industries, tools, testimonials or blog; only RCM has the feature grid, extra
 * services and security blocks) are undefined in its code content and stay off the page.
 */
export async function getServicePage(
  page: PageEntry<"service">,
): Promise<{ content: ServicePageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const { content, ogImage, metaTags } = await loadServicePage(page.id, {
    ...page.content,
    slug: page.slug,
  });
  return { content: await resolveLinks(content), ogImage, metaTags };
}

async function loadServicePage(
  id: string,
  f: ServicePageContent,
): Promise<{ content: ServicePageContent; ogImage?: string; metaTags?: MetaTag[] }> {
  const d: Raw = await sanityFetch({
    query: SERVICE_PAGE_QUERY,
    params: { id },
    tags: ["servicePage", "caseStudy"],
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
      stats: mapStats(d.stats, f.stats),
      intro: mapIntro(d.intro, f.intro),
      challenges: mapChallenges(d.challenges, f.challenges),
      featureGrid: optional(d.featureGrid, f.featureGrid, mapFeatureCards),
      services: optional(d.services, f.services, mapServices),
      caseStudies: optional(d.caseStudies, f.caseStudies, mapCaseStudies),
      process: optional(d.process, f.process, mapProcess),
      industries: optional(d.industries, f.industries, mapIndustries),
      whyChoose: mapWhyChoose(d.whyChoose, f.whyChoose),
      extraServices: optional(d.extraServices, f.extraServices, mapFeatureCards),
      security: optional(d.security, f.security, mapSecurityControls),
      tools: mapToolTabs(d.tools, f.tools),
      testimonials: optional(d.testimonials, f.testimonials, mapTestimonials),
      blog: optional(d.blog, f.blog, mapBlog),
      faq: mapFaq(d.faq, f.faq),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
    },
    ogImage: d.seo?.ogImage ?? undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}
