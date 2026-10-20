import type { MetadataRoute } from "next";

import { hirePages } from "@/content/hire";
import { industryPages } from "@/content/industries";
import { servicePages } from "@/content/services";
import { sanityFetch } from "@/sanity/lib/fetch";
import { blogDataset } from "@/sanity/env";
import { absoluteUrl, routes } from "@/lib/routes";

type Entry = { slug: string; _updatedAt?: string };

/**
 * Ported from old-code app/(website)/sitemap.ts with fixes from the redesign report §5.5:
 * - lastModified uses Sanity `_updatedAt` instead of `new Date()`
 * - adds /contact (was missing)
 * - cached GROQ requests, revalidated by the Sanity webhook
 *
 * Page slugs come from the content registries (the same list generateStaticParams uses), so
 * a page is listed even before its Sanity document exists; `_updatedAt` is added when it does.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, blog] = await Promise.all([
    sanityFetch<Entry[] | null>({
      query: `*[_type in ["servicePage", "hirePage", "industryPage"] && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      tags: ["servicePage", "hirePage", "industryPage"],
    }),
    sanityFetch<Entry[] | null>({
      query: `*[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      tags: ["post"],
      dataset: blogDataset,
    }),
  ]);

  const updatedAt = new Map((pages ?? []).map((p) => [p.slug, p._updatedAt]));
  const fromRegistry = (registry: Record<string, unknown>): Entry[] =>
    Object.keys(registry).map((slug) => ({ slug, _updatedAt: updatedAt.get(slug) }));

  const data = {
    services: fromRegistry(servicePages),
    hireStaff: fromRegistry(hirePages),
    industries: fromRegistry(industryPages),
    posts: blog ?? [],
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl(routes.home()), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl(routes.about()), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl(routes.team()), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl(routes.contact()), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl(routes.blog()), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl(routes.privacy()), changeFrequency: "yearly", priority: 0.3 },
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
  ];
}
