import type {
  CardGridContent,
  ChallengesContent,
  CtaBandContent,
  FaqContent,
  FeatureCardsContent,
  FeatureStripContent,
  HeroContent,
  IndustriesContent,
  IntroContent,
  SubIndustriesContent,
  WhyChooseContent,
} from "@/content/types";

/**
 * Industry page template content (design reference: real-estate-accounting-services; spec
 * §(3) section order). Section order is fixed by `components/templates/industry-page.tsx`.
 */
export type IndustryPageContent = {
  /**
   * Default URL slug (`/industries/<slug>`). The Sanity document's "URL slug" field overrides it (editable
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
  challenges: ChallengesContent;
  services: CardGridContent;
  subIndustries: SubIndustriesContent;
  whyChoose: WhyChooseContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};

/**
 * Industries gallery (`/industries`, design: pages/industry/Industry.svg): hero, feature cards,
 * the full industry card grid, FAQ and CTA band. Section order is fixed by
 * `components/templates/industries-gallery.tsx`.
 */
export type IndustriesGalleryContent = {
  seo: { title: string; description: string; keywords?: string[] };
  hero: HeroContent;
  features: FeatureCardsContent;
  industries: IndustriesContent;
  faq: FaqContent;
  ctaBand: CtaBandContent;
};
