import type {
  BlogContent,
  CaseStudiesContent,
  ChallengesContent,
  CtaBandContent,
  FaqContent,
  FeatureCardsContent,
  HeroContent,
  IndustriesContent,
  IntroContent,
  ProcessContent,
  SecurityControlsContent,
  ServicesContent,
  StatsContent,
  TestimonialsContent,
  ToolTabsContent,
  WhyChooseContent,
} from "@/content/types";

/**
 * Service page template content (UI reference: audit-outsourcing-services). Section order is
 * fixed by the template (components/templates/service-page.tsx); a page leaves out a section
 * its design doesn't draw by leaving it undefined.
 *
 * Two layouts exist in the designs (pages/services/*.svg, 2026-10-25):
 *  - Audit layout (audit, bookkeeping, tax, payroll, multi-state sales tax, virtual CFO):
 *    hero, stats, intro, challenges, services accordion, case studies, process, industries,
 *    why choose, tools (not on CFO), testimonials, blog, FAQ, CTA band.
 *  - RCM layout (revenue cycle management): hero, stats, intro, challenges, `featureGrid`
 *    ("Medical Billing Services"), why choose, `extraServices` ("Additional RCM Services"),
 *    `security`, FAQ, CTA band.
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
  /** White icon-card grid right after the challenges (RCM "Medical Billing Services"). */
  featureGrid?: FeatureCardsContent;
  services?: ServicesContent;
  caseStudies?: CaseStudiesContent;
  process?: ProcessContent;
  industries?: IndustriesContent;
  whyChoose: WhyChooseContent;
  /** Second icon-card grid after Why Choose (RCM "Additional RCM Services"). */
  extraServices?: FeatureCardsContent;
  /** Data-security block (RCM "Your Financial Data is Handled with Care"; hire-page UI). */
  security?: SecurityControlsContent;
  tools?: ToolTabsContent;
  testimonials?: TestimonialsContent;
  blog?: BlogContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};
