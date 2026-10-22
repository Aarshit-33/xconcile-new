import "server-only";

import type { ServicePageContent } from "@/content/services/types";

import { sanityFetch } from "./fetch";
import {
  mapBlog,
  mapCaseStudies,
  mapChallenges,
  mapCtaBand,
  mapFaq,
  mapHero,
  mapIndustries,
  mapIntro,
  mapProcess,
  mapServices,
  mapStats,
  mapTestimonials,
  mapToolTabs,
  mapWhyChoose,
  keywords,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const SERVICE_PAGE_QUERY = /* groq */ `*[_type == "servicePage" && slug.current == $slug][0]{
  name,
  seo{ title, description, keywords, "ogImage": ogImage.asset->url },
  hero, stats, challenges, services, process, blog, faq,
  ${P.intro},
  ${P.caseStudies},
  ${P.industries},
  ${P.whyChoose},
  ${P.toolTabs},
  ${P.testimonials},
  ${P.ctaBand}
}`;

/**
 * Service page content from its Sanity `servicePage` document (Studio → Service Pages (New
 * Site), matched by slug), in the exact shape of `ServicePageContent` so the template stays
 * unchanged. Same rules as Home (sanity/lib/home.ts): any section or field that is empty in
 * Sanity falls back to the page's code content (content/services/*.ts, also used when Sanity is
 * not configured or the document doesn't exist). Cache tag: `servicePage`.
 */
export async function getServicePage(
  f: ServicePageContent,
): Promise<{ content: ServicePageContent; ogImage?: string }> {
  const d: Raw = await sanityFetch({
    query: SERVICE_PAGE_QUERY,
    params: { slug: f.slug },
    tags: ["servicePage"],
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
      services: mapServices(d.services, f.services),
      caseStudies: mapCaseStudies(d.caseStudies, f.caseStudies),
      process: mapProcess(d.process, f.process),
      industries: mapIndustries(d.industries, f.industries),
      whyChoose: mapWhyChoose(d.whyChoose, f.whyChoose),
      tools: mapToolTabs(d.tools, f.tools),
      testimonials: mapTestimonials(d.testimonials, f.testimonials),
      blog: mapBlog(d.blog, f.blog),
      faq: mapFaq(d.faq, f.faq),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
    },
    ogImage: d.seo?.ogImage ?? undefined,
  };
}
