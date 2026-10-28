import "server-only";

import { home } from "@/content/home";
import type {
  BlogContent,
  CaseStudiesContent,
  ChallengesContent,
  FaqContent,
  HeroContent,
  IndustriesContent,
  IntroContent,
  ProcessContent,
  ServicesContent,
  StatsContent,
  TestimonialsContent,
  ToolsContent,
  WhyChooseContent,
} from "@/content/types";

import { sanityFetch } from "./fetch";
import {
  mapBlog,
  mapCaseStudies,
  mapChallenges,
  mapFaq,
  mapHero,
  mapIndustries,
  mapIntro,
  mapProcess,
  mapServices,
  mapStats,
  mapTestimonials,
  mapTools,
  mapWhyChoose,
  keywords,
  heading,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

/** Home page data: the shared section shapes the components accept (content/types.ts). */
export type HomeContent = {
  seo: { title: string; description: string; keywords?: string[] };
  hero: HeroContent;
  stats: StatsContent;
  intro: IntroContent;
  challenges: ChallengesContent;
  services: ServicesContent;
  caseStudies: CaseStudiesContent;
  process: ProcessContent;
  industries: IndustriesContent;
  whyChoose: WhyChooseContent;
  tools: ToolsContent;
  testimonials: TestimonialsContent;
  blog: BlogContent;
  faq: FaqContent;
  contact: typeof home.contact;
  inquiry: typeof home.inquiry;
};

const fallback: HomeContent = home;

const HOME_QUERY = /* groq */ `*[_id == "home"][0]{
  seo, hero, challenges, services, process, blog, faq, contact,
  ${P.stats},
  ${P.intro},
  ${P.caseStudies},
  ${P.industries},
  ${P.whyChoose},
  ${P.tools},
  ${P.testimonials}
}`;

/**
 * Home page content from the Sanity `home` singleton, in the exact shape of content/home.ts so
 * the section components stay unchanged. Any section or field that is empty in Sanity falls back
 * to content/home.ts (also used when Sanity is not configured). Cache tag: `home`.
 * Each section's Studio "Section ID" becomes its `anchorId` (the section's #id, lib/section-ids.ts).
 */
export async function getHome(): Promise<HomeContent> {
  const d: Raw = await sanityFetch({ query: HOME_QUERY, tags: ["home", "caseStudy"] });
  if (!d) return fallback;
  const f = fallback;

  return {
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
    tools: mapTools(d.tools, f.tools),
    testimonials: mapTestimonials(d.testimonials, f.testimonials),
    blog: mapBlog(d.blog, f.blog),
    faq: mapFaq(d.faq, f.faq),

    // Figma contact section: not used on Home (see app/(website)/page.tsx), stays code-driven.
    contact: f.contact,

    inquiry: mapInquiry(d.contact, f.inquiry),
  };
}

export type InquiryContent = typeof home.inquiry;

/**
 * Contact section (`contactSection`, InquirySection) → content shape. Empty fields fall back to
 * `f`. Shared by Home, About (Home's copy) and the Contact page (its own copy, or Home's).
 */
export function mapInquiry(c: Raw, f: InquiryContent): InquiryContent {
  if (!c) return f;
  const sf = c.form ?? {};
  const ff = f.form;
  // Labels/placeholders from Sanity; `required` always from code (server validation).
  const field = <K extends keyof typeof ff.fields>(k: K) => ({
    ...ff.fields[k],
    ...(sf.fields?.[k]?.label ? { label: sf.fields[k].label } : {}),
    ...(sf.fields?.[k]?.placeholder ? { placeholder: sf.fields[k].placeholder } : {}),
  });
  return {
    ...f,
    // Section ID from Studio wins over the code default (#contact, used by hero/challenges CTAs).
    id: c.anchorId || f.id,
    eyebrow: c.eyebrow ?? f.eyebrow,
    title: heading(c.title) ?? f.title,
    body: c.body ?? f.body,
    trust:
      c.trust?.map((t: Raw) => ({
        icon: t.icon,
        label: t.label,
        desc: t.desc ?? "",
      })) ?? f.trust,
    tagline: c.tagline ?? f.tagline,
    form: {
      title: sf.title ?? ff.title,
      note: sf.note ?? ff.note,
      fields: {
        name: field("name"),
        email: field("email"),
        phone: field("phone"),
        company: field("company"),
        service: field("service"),
        message: field("message"),
      },
      submit: sf.submit ?? ff.submit,
      submitting: sf.submitting ?? ff.submitting,
      success: sf.success ?? ff.success,
      error: sf.error ?? ff.error,
    },
  };
}
