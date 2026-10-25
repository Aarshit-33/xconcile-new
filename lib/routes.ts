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
  about: () => "/about",
  team: () => "/team",
  contact: () => "/contact",
  privacy: () => "/privacy-policy",
} as const;

export function absoluteUrl(path = "/") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://xconcile.com").replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
