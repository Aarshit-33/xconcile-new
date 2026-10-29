import type { MetadataRoute } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { getAllCaseStudySlugs } from "@/sanity/lib/case-studies";
import { getPageUrls, type PageKind } from "@/sanity/lib/page-urls";
import { getAllPostSlugs, getAllSeoArticleSlugs } from "@/sanity/lib/queries";
import { absoluteUrl, routes } from "@/lib/routes";

type Entry = { slug: string; _updatedAt?: string };

/** Singleton page documents whose `_updatedAt` is the fixed pages' lastmod (ids = cache tags). */
const SINGLETON_IDS = [
  "home",
  "aboutPage",
  "blogPage",
  "caseStudiesPage",
  "industriesPage",
  "contactPage",
  "privacyPolicyPage",
  "termsOfUsePage",
] as const;

/**
 * Ported from old-code app/(website)/sitemap.ts with fixes from the redesign report §5.5:
 * - lastModified uses Sanity `_updatedAt` instead of `new Date()`, for the fixed pages too (their
 *   singleton documents; Blog / Case Studies also count their newest post / case study). Audit SEO10.
 * - no /team: it is a section of About (About → #team) and the old URL redirects there
 *   (next.config.ts). /contact is a real page again (2026-10-27) and is listed.
 * - cached GROQ requests, revalidated by the Sanity webhook
 *
 * Service/hire/industry URLs come from sanity/lib/page-urls.ts (the same live slugs the routes
 * prerender; a Studio slug change shows here, old URLs never do), so a page is listed even
 * before its Sanity document exists; `_updatedAt` is added when it does.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [urls, blog, singletons, caseStudies, articles] = await Promise.all([
    getPageUrls(),
    // Blog posts from Studio → Blog Posts.
    getAllPostSlugs(),
    // Singleton page documents (published only: their ids have no `drafts.` prefix).
    sanityFetch<{ _id: string; _updatedAt?: string }[] | null>({
      query: `*[_id in $ids]{ _id, _updatedAt }`,
      params: { ids: [...SINGLETON_IDS] },
      tags: [...SINGLETON_IDS],
    }),
    getAllCaseStudySlugs(),
    getAllSeoArticleSlugs(),
  ]);

  const livePages = (kind: PageKind): Entry[] =>
    urls.pages
      .filter((p) => p.kind === kind)
      .map((p) => ({ slug: p.slug, _updatedAt: p.updatedAt }));

  const data = {
    services: livePages("service"),
    hireStaff: livePages("hire"),
    industries: livePages("industry"),
    posts: blog ?? [],
    caseStudies,
  };

  const singletonUpdated = new Map((singletons ?? []).map((d) => [d._id, d._updatedAt]));
  /** `lastModified` from the newest of the given timestamps (omitted when none is known). */
  const lastMod = (...dates: (string | undefined)[]) => {
    const newest = dates
      .filter((d): d is string => Boolean(d))
      .sort()
      .at(-1);
    return newest ? { lastModified: new Date(newest) } : {};
  };
  const newestOf = (items: Entry[]) => items.map((i) => i._updatedAt);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl(routes.home()),
      ...lastMod(singletonUpdated.get("home")),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl(routes.about()),
      ...lastMod(singletonUpdated.get("aboutPage")),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(routes.blog()),
      ...lastMod(singletonUpdated.get("blogPage"), ...newestOf(data.posts)),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl(routes.caseStudies()),
      ...lastMod(singletonUpdated.get("caseStudiesPage"), ...newestOf(data.caseStudies)),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(routes.industries()),
      ...lastMod(singletonUpdated.get("industriesPage")),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl(routes.contact()),
      ...lastMod(singletonUpdated.get("contactPage")),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: absoluteUrl(routes.privacy()),
      ...lastMod(singletonUpdated.get("privacyPolicyPage")),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl(routes.terms()),
      ...lastMod(singletonUpdated.get("termsOfUsePage")),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toEntries = (
    items: Entry[],
    build: (slug: string) => string,
    priority: number,
    changeFrequency: "weekly" | "monthly",
  ): MetadataRoute.Sitemap =>
    items.map((i) => ({
      url: absoluteUrl(build(i.slug)),
      ...(i._updatedAt ? { lastModified: new Date(i._updatedAt) } : {}),
      changeFrequency,
      priority,
    }));

  return [
    ...staticRoutes,
    ...toEntries(data.services, routes.service, 0.9, "weekly"),
    ...toEntries(data.hireStaff, routes.hireStaff, 0.8, "weekly"),
    ...toEntries(data.industries, routes.industry, 0.8, "weekly"),
    ...toEntries(data.posts, routes.post, 0.7, "monthly"),
    ...toEntries(data.caseStudies, routes.caseStudy, 0.7, "monthly"),
    // SEO articles (Studio → Articles) live at the root: /<slug>.
    ...toEntries(articles, (slug) => `/${slug}`, 0.7, "monthly"),
  ];
}
