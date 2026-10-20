import type {
  AudienceCardsContent,
  CardGridContent,
  ChallengesContent,
  CtaBandContent,
  EngagementModelsContent,
  ExperienceLevelsContent,
  FaqContent,
  FeatureStripContent,
  HeroContent,
  HiringStepsContent,
  IntroContent,
  SecurityControlsContent,
  ToolTabsContent,
  WhyChooseContent,
} from "@/content/types";

/**
 * Hire page template content (design reference: hire-dedicated-accounting-professionals; spec
 * §(2) section order). Section order is fixed by `components/templates/hire-page.tsx`.
 */
export type HirePageContent = {
  /** Live URL slug (lib/routes.ts `hireStaff`). */
  slug: string;
  /** Page name for JSON-LD and breadcrumbs. */
  name: string;
  seo: { title: string; description: string };
  hero: HeroContent;
  features: FeatureStripContent;
  intro: IntroContent;
  benefits: ChallengesContent;
  expertise: CardGridContent;
  models: EngagementModelsContent;
  steps: HiringStepsContent;
  levels: ExperienceLevelsContent;
  audiences: AudienceCardsContent;
  whyChoose: WhyChooseContent;
  security: SecurityControlsContent;
  tools?: ToolTabsContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};
