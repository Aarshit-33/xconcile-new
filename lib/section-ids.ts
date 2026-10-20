/**
 * Section anchor ids: every `<section>` on every page has a unique `id`, so any section can be
 * linked to (`/#faq`, `/audit-outsourcing-services#process`) or scrolled to (client request
 * 2026-10-17). The global `scroll-padding-top` keeps the target below the fixed navbar.
 *
 * - Default per section type below. Override per page with `anchorId` in the section's content
 *   (content/*.ts) or the "Section ID" field in Sanity Studio. Resolution: `sectionId()`.
 * - Ids must be unique on a page. The defaults are unique on every current template; if a
 *   template ever renders the same section type twice, give the second one an `anchorId`.
 * - Format: lowercase letters, digits and hyphens, starting with a letter (`SECTION_ID_PATTERN`).
 *
 * No "@/" imports: the Sanity CLI (schema validate / typegen) imports this file too.
 */
export const SECTION_IDS = {
  hero: "hero",
  stats: "stats",
  featureStrip: "highlights",
  intro: "about",
  challenges: "challenges",
  services: "services",
  caseStudies: "case-studies",
  process: "process",
  industries: "industries",
  whyChoose: "why-choose-us",
  tools: "tools",
  testimonials: "testimonials",
  blog: "blog",
  faq: "faq",
  contact: "contact",
  ctaBand: "get-started",
  cardGrid: "expertise",
  engagementModels: "hiring-models",
  hiringSteps: "hiring-steps",
  experienceLevels: "experience-levels",
  audienceCards: "who-we-serve",
  security: "security",
  subIndustries: "sub-industries",
  notFound: "not-found",
} as const;

export type SectionKey = keyof typeof SECTION_IDS;

export const SECTION_ID_PATTERN = /^[a-z][a-z0-9-]*$/;

/** Optional per-page override, mixed into every section content type. */
export type SectionAnchor = {
  /**
   * The section's `id` on the page (link target `#<anchorId>`). Unique per page; lowercase,
   * digits, hyphens. Omit to use the section type's default from `SECTION_IDS`.
   */
  anchorId?: string;
};

/**
 * The `id` for a section: its `anchorId`, else a legacy `id` field (Services, Card grid,
 * Engagement models, contact blocks used `id` before), else the section type's default.
 */
export function sectionId(data: object | null | undefined, key: SectionKey): string {
  // `object`: any section data, typed or plain (an all-optional param type would be rejected
  // by TypeScript's weak-type check for objects without anchorId/id).
  const { anchorId, id } = (data ?? {}) as SectionAnchor & { id?: unknown };
  const anchor = anchorId?.trim();
  if (anchor) return anchor;
  if (typeof id === "string" && id) return id;
  return SECTION_IDS[key];
}
