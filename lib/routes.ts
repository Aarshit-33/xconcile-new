import { siteConfig } from "./site-config";

/**
 * URL builders. Mirrors the CURRENT LIVE URL structure (old site) so rankings are kept:
 *   services   -> /:slug
 *   hire staff -> /:slug
 *   industries -> /industries/:slug
 *   blog       -> /blog/:slug
 *
 * OPEN DECISION (report §6 / §9.1): adopt the Figma slugs instead? If so, change only
 * this file and add single-hop 301s in next.config.ts.
 */
export const routes = {
  home: () => "/",
  service: (slug: string) => `/${slug}`,
  hireStaff: (slug: string) => `/${slug}`,
  /** Industries gallery (index of every industry; design pages/industry/Industry.svg). */
  industries: () => "/industries",
  industry: (slug: string) => `/industries/${slug}`,
  blog: () => "/blog",
  post: (slug: string) => `/blog/${slug}`,
  /** Case studies (new on this site, design pages/Case study gallary + pages/case study). */
  caseStudies: () => "/case-studies",
  caseStudy: (slug: string) => `/case-studies/${slug}`,
  about: () => "/about",
  /** No /team page on the new site: About → Meet Our Team (old /team redirects there). */
  team: () => "/about#team",
  /** Contact page (design page-updated/newShit/contact.svg, 2026-10-27; same URL as the old site). */
  contact: () => "/contact",
  privacy: () => "/privacy-policy",
} as const;

/** Absolute canonical URL: `absoluteUrl("/")` = `https://xconcile.com/`, `absoluteUrl("/about")` = `https://xconcile.com/about`. */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
