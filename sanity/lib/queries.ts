/**
 * Blog post queries. Posts are read from `blogDataset` (the old site's dataset) until they
 * are migrated; page content uses the per-page loaders (home.ts, service-page.ts, ...).
 */
import { blogDataset } from "../env";
import { sanityFetch } from "./fetch";

export type PostCard = {
  id: string
  title: string
  slug: string
  /** `excerpt`, or the first 200 characters of the body (live posts have no excerpt). */
  excerpt: string | null
  publishedAt: string | null
  readTime: string | null
  image: string | null
  imageAlt: string | null
}

// Latest posts for teaser cards (home "Helpful Accounting Insights")
export async function getLatestPosts(limit = 3): Promise<PostCard[] | null> {
  const end = Math.max(1, Math.trunc(limit))
  const query = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...${end}] {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, array::join(string::split(pt::text(content), "")[0...200], "")),
    publishedAt,
    readTime,
    "image": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }`

  return sanityFetch({ query, tags: ['post'], dataset: blogDataset })
}
