/**
 * Shared content shapes for the section blocks (`components/sections/*`).
 *
 * Every page family (Home, Service, Hire, Industry) drives the same blocks with data that
 * satisfies these types, so a block is built once and reused. Keep fields serializable
 * (strings, numbers, plain objects) so the shapes can move to Sanity documents unchanged.
 */
import type { IconName } from "@/components/icons/registry";
import type { SectionAnchor } from "@/lib/section-ids";

/** Every section content type accepts `anchorId` (its #id on the page, see lib/section-ids.ts). */
export type { SectionAnchor };

/** Plain text with inline links. */
export type RichText = (string | { text: string; href: string })[];

/**
 * CTA target. A path/anchor, or `SCHEDULE_HREF` to open the Calendly popup (client rule:
 * scheduling opens in a popup), used where a page has no contact section of its own.
 */
export type Link = { label: string; href: string };
/** CTA whose target page may not exist yet: rendered only when `href` is set. */
export type OptionalLink = { label: string; href?: string };

/** Opens the Calendly popup instead of navigating (see `CtaLink`). */
export const SCHEDULE_HREF = "#schedule";

/** Section H2: plain, or with one green highlighted phrase. */
export type HeadingTitle = string | { before?: string; highlight: string; after?: string };

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type HeroContent = SectionAnchor & {
  badge: string;
  /**
   * Rendered as `before <highlight> <br> after`; the highlight (green) is optional.
   * `inline`: no forced break, `after` follows the highlight and wraps naturally (Hire design).
   */
  title: { before: string; highlight?: string; after?: string; inline?: boolean };
  subtitle: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** `desktopOnly` items are not drawn in the mobile design. */
  checks: { label: string; desktopOnly?: boolean }[];
};

export type StatsContent = SectionAnchor & {
  items: { value: string; label: string }[];
  rating: { value: string; source: string };
};

export type IntroContent = SectionAnchor & {
  title: string;
  body: RichText;
  /**
   * Second paragraph. `inline-desktop` (Home): new paragraph on mobile, same paragraph on
   * desktop. `paragraph` (inner pages): always its own paragraph.
   */
  bodyMore?: RichText;
  bodyMoreLayout?: "inline-desktop" | "paragraph";
  image: ImageAsset;
  /** Home: small icon cards under the copy. */
  features?: { icon: IconName; label: string }[];
  /** `pill` (Home: chips, one bordered row on desktop) or `list` (inner pages: vertical list). */
  checks: string[];
  checksStyle?: "pill" | "list";
  cta: Link;
};

/** `white`: white cards with #F3F8F2 icon tiles (Hire "Key Benefits"). */
export type ChallengeTone = "rose" | "amber" | "blue" | "purple" | "green" | "white";

export type ChallengesContent = SectionAnchor & {
  badge: string;
  title: string;
  body: string;
  cta: Link;
  items: { tone: ChallengeTone; icon: IconName; title: string; body: RichText }[];
};

export type ServiceItem = {
  icon: IconName;
  title: string;
  description: string;
  /** Flat list (Home): "Key services:" + bullets. */
  keyLabel?: string;
  keyItems?: string[];
  /** Grouped list (service pages, from Sanity `serviceAreas[].sections`). */
  groups?: { title: string; items: string[] }[];
  /** Link to the service's own page; omitted for sub-services of the current page. */
  cta?: Link;
};

export type ServicesContent = SectionAnchor & {
  id: string;
  badge: string;
  title: { before?: string; highlight: string; after?: string };
  subtitle: string;
  /** Desktop shows this many rows, then "Show more services (n)". */
  initiallyVisible: number;
  items: ServiceItem[];
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  impact?: { label: string; value: string };
  image: ImageAsset & { mobile?: { src: string; width: number; height: number } };
  cta: OptionalLink;
};

export type CaseStudiesContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  items: CaseStudy[];
};

export type ProcessContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  steps: { icon: IconName; title: string; body: string }[];
};

export type IndustriesContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  cta: OptionalLink;
  /** Cards without `href` (no industry page yet) render as plain cards. */
  items: { title: string; body: string; href?: string; image: ImageAsset }[];
};

export type WhyChooseContent = SectionAnchor & {
  badge: string;
  title: HeadingTitle;
  subtitle: string;
  features: { icon: IconName; title: string; body: string }[];
  images: ImageAsset[];
  stats: { value: string; label: string }[];
};

export type Tool = { name: string; logo?: string; width?: number; height?: number };

/** Home: logo tile grid. */
export type ToolsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  items: (Tool & { logo: string; width: number; height: number })[];
};

/** Service pages: vertical category tabs + logo chips. Categories without tools are hidden. */
export type ToolTabsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  categories: { id: string; icon: IconName; label: string; tools: Tool[] }[];
};

export type TestimonialVideo = {
  youtubeId: string;
  title: string;
  name: string;
  company: string;
  country: "us";
  uploadDate: string;
  duration: string;
  poster: { src: string; width: number; height: number };
};

export type TestimonialsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  videos: TestimonialVideo[];
};

export type BlogContent = SectionAnchor & { badge: string; title: string; subtitle: string; cta: Link };

export type FaqItem = { q: string; a: RichText };

export type FaqContent = SectionAnchor & {
  badge: string;
  title: string;
  /** One line, or several lines separated by line breaks. */
  intro: string | string[];
  items: FaqItem[];
};

export type CtaBandContent = SectionAnchor & {
  title: string;
  body: string;
  cta: Link;
  image: ImageAsset;
};

/* ---- Hire / Industry families (report §3.2 blocks B3, B7, B10, B19–B22) ---- */

/** B3 Feature strip: four icon cards directly under the hero (grey band). */
export type FeatureStripContent = SectionAnchor & {
  /** Accessible name of the strip (it has no visible heading). */
  label: string;
  items: { icon: IconName; title: string; body: string }[];
};

/** B7 Card grid, `dark-tile-3col` variant: icon + title tiles on the dark gradient. */
export type CardGridContent = SectionAnchor & {
  /** Anchor target (e.g. the hero's "Explore Our Expertise" CTA). */
  id?: string;
  badge: string;
  /** Industry design: "Our <green>Real Estate</green> Accounting Services". */
  title: HeadingTitle;
  subtitle: string;
  /** `body`: short line under the title (not drawn; rises in with the title on scroll). */
  items: { icon: IconName; title: string; body?: string }[];
};

/** B20 Engagement models: three pricing-style cards; `featured` = dark "Most Popular" card. */
export type EngagementModel = {
  number: string;
  /** Top-right glyph on the light cards (the featured card shows the pill instead). */
  icon?: IconName;
  title: string;
  tagline: string;
  body: string;
  features: string[];
  cta: Link;
  featured?: boolean;
};

export type EngagementModelsContent = SectionAnchor & {
  id?: string;
  badge: string;
  title: string;
  subtitle: string;
  featuredLabel: string;
  items: EngagementModel[];
};

/** B10 Hiring timeline: steps + photo pair + proof card + trust checks. */
export type HiringStepsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  steps: { title: string; body: string }[];
  photos: [ImageAsset, ImageAsset];
  /** Chip floating on the first photo (flag + label). */
  photoBadge: { label: string; flag: ImageAsset };
  proof: { value: string; label: string; avatars: ImageAsset[]; badge: string };
  trust: string[];
};

/** B21 Experience levels: Junior / Mid / Senior role cards. */
export type ExperienceLevel = {
  level: string;
  title: string;
  experience: string;
  /** "Label: text" pairs; the label is set in bold. */
  responsibilities: { label: string; text: string }[];
  cta: Link;
  featured?: boolean;
};

export type ExperienceLevelsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  listLabel: string;
  featuredLabel: string;
  items: ExperienceLevel[];
};

/** B22 Audience cards: photo cards with a CTA button. */
export type AudienceCardsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  items: { title: string; body: string; image: ImageAsset; cta: Link }[];
};

/**
 * B19b Security controls (Hire main design, page.svg updated 2026-10-17): badge + subtitle,
 * a rose banner (shield illustration + H2), then category cards with icon rows (rose tints).
 */
export type SecurityControlsContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  /** Decorative shield illustration in the banner (the H2 beside it carries the meaning). */
  shield: ImageAsset;
  groups: { title: string; items: { icon: IconName; title: string; body: string }[] }[];
};

/**
 * Industry "Sub-Industries": numbered full-width rows (number, icon, title, one-line focus).
 * Rows with `groups` expand like an accordion (the drawn "+" button) to show the grouped details.
 */
export type SubIndustriesContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  items: {
    icon: IconName;
    title: string;
    body: string;
    /** Expanded panel, e.g. Bookkeeping / Accounting / Payroll / Tax Preparation / Software Stack. */
    groups?: { title: string; items: string[] }[];
  }[];
};
