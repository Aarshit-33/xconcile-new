import type {
  CardGridContent,
  ChallengesContent,
  CtaBandContent,
  FaqContent,
  FeatureStripContent,
  HeroContent,
  IntroContent,
  SubIndustriesContent,
  WhyChooseContent,
} from "@/content/types";

/**
 * Industry page template content (design reference: real-estate-accounting-services; spec
 * §(3) section order). Section order is fixed by `components/templates/industry-page.tsx`.
 */
export type IndustryPageContent = {
  /** Live URL slug: the page is served at `/industries/<slug>` (lib/routes.ts `industry`). */
  slug: string;
  /** Page name for JSON-LD and breadcrumbs. */
  name: string;
  seo: { title: string; description: string };
  hero: HeroContent;
  features: FeatureStripContent;
  intro: IntroContent;
  challenges: ChallengesContent;
  services: CardGridContent;
  subIndustries: SubIndustriesContent;
  whyChoose: WhyChooseContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};
