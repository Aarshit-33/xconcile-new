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

/**
 * Section H1/H2: one string. Wrap the green part in asterisks (`"Our *Real Estate* Services"`),
 * `\*` for a literal asterisk. Rendered by `HighlightText` (lib/highlight.ts) as one flowing line.
 * Every heading string on the site accepts this markup, typed as `HeadingTitle` or `string`.
 */
export type HeadingTitle = string;

export type ImageAsset = { src: string; alt: string; width: number; height: number };

export type HeroContent = SectionAnchor & {
  badge: string;
  /** H1, `*green*` markup (see `HeadingTitle`). Wraps naturally, no forced line break. */
  title: HeadingTitle;
  subtitle: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** Shown on every screen size (Studio: one "Show" switch per item; hidden items are left out). */
  checks: { label: string }[];
};

export type StatsContent = SectionAnchor & {
  /**
   * `image`: an icon drawn instead of the number (RCM design: caduceus over "HIPAA Compliant");
   * `value` is then empty and not shown.
   */
  items: { value: string; label: string; image?: ImageAsset }[];
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
  /** Third paragraph (`paragraph` layout only; bookkeeping design). */
  bodyExtra?: RichText;
  image: ImageAsset;
  /** Home: small icon cards under the copy. */
  features?: { icon: IconName; label: string }[];
  /** `pill` (Home: chips, one bordered row on desktop) or `list` (inner pages: vertical list). */
  checks: string[];
  checksStyle?: "pill" | "list";
  /** Small label above the checklist (RCM design: "Promising Features"). */
  checksTitle?: string;
  /** Optional: the About design draws no button. */
  cta?: Link;
};

/** `white`: white cards with #F3F8F2 icon tiles (Hire "Key Benefits"). */
export type ChallengeTone = "rose" | "amber" | "blue" | "purple" | "green" | "white";
/** Services accordion group card: a Key Challenges tint, or no background. */
export type GroupTone = ChallengeTone | "transparent";

export type ChallengesContent = SectionAnchor & {
  badge: string;
  title: string;
  body: string;
  /** Optional: the virtual CFO design draws no button here. */
  cta?: Link;
  items: { tone: ChallengeTone; icon: IconName; title: string; body: RichText }[];
};

export type ServiceItem = {
  icon: IconName;
  title: string;
  description: string;
  /** Flat list (Home): "Key services:" + bullets. */
  keyLabel?: string;
  keyItems?: string[];
  /**
   * Grouped list (service pages, from Sanity `serviceAreas[].sections`). Each group is a card;
   * `tone`: Key Challenges tint or `transparent`. Empty = Home challenges order by position.
   */
  groups?: { title: string; items: string[]; tone?: GroupTone }[];
  /** Link to the service's own page; omitted for sub-services of the current page. */
  cta?: Link;
};

export type ServicesContent = SectionAnchor & {
  id: string;
  badge: string;
  title: HeadingTitle;
  subtitle: string;
  /** Desktop shows this many rows, then "Show more services (n)". */
  initiallyVisible: number;
  items: ServiceItem[];
};

/**
 * The highlight card over a case-study photo (e.g. "Workload Impact / 42% Reduced"). Shown on
 * every screen size; Studio "Show impact card" off = left out (`impact` undefined).
 */
export type CaseStudyImpact = {
  label: string;
  value: string;
  /** Round icon on the left. Default: trending_down. */
  icon?: IconName;
};

export type CaseStudy = {
  id: string;
  label: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  impact?: CaseStudyImpact;
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

export type BlogContent = SectionAnchor & {
  badge: string;
  title: string;
  subtitle: string;
  cta: Link;
};

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
  /** Optional: Studio "Show main button" off = no button. */
  cta?: Link;
  /** Outline button next to the main one (RCM design: "Get Started"). */
  secondaryCta?: Link;
  image: ImageAsset;
};

/* ---- Hire / Industry families (report §3.2 blocks B3, B7, B10, B19–B22) ---- */

/** B3 Feature strip: four icon cards directly under the hero (grey band). */
export type FeatureStripContent = SectionAnchor & {
  /** Accessible name of the strip (it has no visible heading). */
  label: string;
  items: { icon: IconName; title: string; body: string }[];
};

/**
 * Feature cards with a section heading (Industries gallery, `/industries`): eyebrow + H2 +
 * subtitle over a row of white icon cards (icon tile on top, title, text). About "Our Core
 * Values" draws only the H2 (badge and subtitle optional) and three cards (3 columns).
 */
export type FeatureCardsContent = SectionAnchor & {
  badge?: string;
  title: HeadingTitle;
  subtitle?: string;
  items: { icon: IconName; title: string; body: string }[];
};

/** One person's photo, name, role, bio paragraphs and certifications (About page). */
export type PersonProfile = {
  name: string;
  role: string;
  /** Transparent cut-out portrait (drawn on a green shape). */
  image: ImageAsset;
  /** Paragraphs. */
  bio: string[];
  certifications: string[];
  /** Profile URL; the LinkedIn icon shows only when set. */
  linkedin?: string;
};

/** About "Founder & CEO" block: grey band, copy left, portrait on a green block right. */
export type FounderContent = SectionAnchor & {
  person: PersonProfile;
  /** Pill label before the certifications, e.g. "Certifications". */
  certificationsLabel: string;
};

/** About "Meet Our Team": H2 over two-up profile cards. */
export type TeamContent = SectionAnchor & {
  title: HeadingTitle;
  members: PersonProfile[];
  certificationsLabel: string;
};

/** B7 Card grid, `dark-tile-3col` variant: icon + title tiles on the dark gradient. */
export type CardGridContent = SectionAnchor & {
  /** Anchor target (e.g. the hero's "Explore Our Expertise" CTA). */
  id?: string;
  badge: string;
  /** Industry design: "Our *Real Estate* Accounting Services". */
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
