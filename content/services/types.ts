import type {
  BlogContent,
  CaseStudiesContent,
  ChallengesContent,
  CtaBandContent,
  FaqContent,
  HeroContent,
  IndustriesContent,
  IntroContent,
  ProcessContent,
  ServicesContent,
  StatsContent,
  TestimonialsContent,
  ToolTabsContent,
  WhyChooseContent,
} from "@/content/types";

/**
 * Service page template content (design reference: audit-outsourcing-services). Section order
 * is fixed by the template; a page omits an optional section by leaving it undefined (e.g. the
 * spec says CFO and RCM have no Tools section).
 */
export type ServicePageContent = {
  /** Live URL slug (lib/routes.ts) and the Sanity `servicePage` document slug. */
  slug: string;
  /** Service name for JSON-LD and breadcrumbs. */
  name: string;
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
  tools?: ToolTabsContent;
  testimonials: TestimonialsContent;
  blog: BlogContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};
