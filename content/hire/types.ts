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
  /**
   * Default URL slug (`/<slug>`). The Sanity document's "URL slug" field overrides it (editable
   * in Studio), so resolve live URLs with sanity/lib/page-urls.ts, not from this field.
   */
  slug: string;
  /** Sanity document `_id` when it isn't `<type>-<slug>` (renamed pages keep their original ID). */
  sanityId?: string;
  /** Old slugs that 301 to the live URL (Studio records its own in the document's "Old URLs"). */
  redirectFrom?: string[];
  /** Page name for JSON-LD and breadcrumbs. */
  name: string;
  seo: { title: string; description: string; keywords?: string[] };
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
