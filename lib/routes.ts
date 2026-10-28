import { siteConfig } from "./site-config";

/**
 * URL builders. Mirrors the CURRENT LIVE URL structure (old site) so rankings are kept:
 *   services   -> /:slug
 *   hire staff -> /:slug
 *   industries -> /industries/:slug
 *   blog       -> /blog/:slug
 *
 * The slugs themselves are not fixed here: a service/hire/industry page's live slug is its
 * Studio "URL slug" (else the code default), resolved by sanity/lib/page-urls.ts, which also
 * 301s old slugs and rewrites links to them. Client URL list applied 2026-10-28.
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
  /** Privacy Policy page (/privacy-policy, same URL as the old site). */
  privacy: () => "/privacy-policy",
} as const;

/** Absolute canonical URL: `absoluteUrl("/")` = `https://xconcile.com/`, `absoluteUrl("/about")` = `https://xconcile.com/about`. */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
