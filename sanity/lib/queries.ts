/**
 * Blog posts: `blogPost` documents in this site's dataset (Studio → Blog Posts). The old site's
 * posts were copied here on 2026-10-27 (scripts/migrate-legacy-blog-sanity.ts, same slugs).
 * Cards: Home blog teaser, Blog gallery, Related Blog.
 */
import { sanityFetch } from "./fetch";

export type PostCard = {
  id: string;
  title: string;
  slug: string;
  /** `excerpt`, or the first 200 characters of the body. */
  excerpt: string | null;
  publishedAt: string | null;
  /** Card label, e.g. "5 min". */
  readTime: string | null;
  image: string | null;
  imageAlt: string | null;
  /** Card link; empty = the blog post URL (`/blog/<slug>`). SEO articles: `/<slug>`. */
  href?: string;
};

type RawCard = Omit<PostCard, "readTime"> & { readTime?: number | null; chars?: number | null };

const cardsQuery = (
  type: "blogPost" | "seoArticle",
) => `*[_type == "${type}" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    "id": _id,
    title,
    "slug": slug.current,
    "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0...200], "")),
    publishedAt,
    readTime,
    "chars": length(pt::text(body)),
    "image": mainImage.asset->url,
    "imageAlt": mainImage.alt
  }`;
const CARDS = cardsQuery("blogPost");

/**
 * Minutes to read: the post's own value, else estimated from the text length (~1,200 characters
 * a minute ≈ 200 words).
 */
export function readMinutes(
  raw: string | number | null | undefined,
  chars: number | null | undefined,
): number | null {
  if (typeof raw === "number" && raw > 0) return Math.round(raw);
  const parsed = typeof raw === "string" ? Number.parseInt(raw, 10) : Number.NaN;
  if (parsed > 0) return parsed;
  return chars && chars > 0 ? Math.max(1, Math.round(chars / 1200)) : null;
}

const toCard = ({ chars, readTime, ...card }: RawCard): PostCard => {
  const minutes = readMinutes(readTime, chars);
  return { ...card, readTime: minutes ? `${minutes} min` : null };
};

/** Every published post, newest first (posts without a date last). */
export async function getAllPosts(): Promise<PostCard[] | null> {
  const posts = await sanityFetch<RawCard[] | null>({ query: CARDS, tags: ["blogPost"] }).catch(
    (error: unknown) => {
      console.error("[blog] Failed to load blog posts", error);
      return null;
    },
  );
  return posts ? posts.filter((p) => p?.slug).map(toCard) : null;
}

// Latest posts for teaser cards (home "Helpful Accounting Insights")
export async function getLatestPosts(limit = 3): Promise<PostCard[] | null> {
  const all = await getAllPosts();
  return all ? all.slice(0, Math.max(1, Math.trunc(limit))) : null;
}

/**
 * Related Blog cards: the post's picks (slugs, in the order chosen, max 3), else the 3 latest
 * other posts. Picks that no longer exist are skipped.
 */
export async function getRelatedPosts(slugs: string[], currentSlug: string): Promise<PostCard[]> {
  const all = (await getAllPosts()) ?? [];
  const bySlug = new Map(all.map((p) => [p.slug, p]));
  const picked = slugs
    .filter((s) => s !== currentSlug)
    .map((s) => bySlug.get(s))
    .filter((p): p is PostCard => Boolean(p))
    .slice(0, 3);
  return picked.length ? picked : all.filter((p) => p.slug !== currentSlug).slice(0, 3);
}

/** Every post slug, for generateStaticParams and the sitemap. */
export async function getAllPostSlugs(): Promise<{ slug: string; _updatedAt?: string }[]> {
  const posts = await sanityFetch<{ slug: string; _updatedAt?: string }[] | null>({
    query: `*[_type == "blogPost" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
    tags: ["blogPost"],
  }).catch(() => null);
  return (posts ?? []).filter((p) => p?.slug);
}

/* ---------------------------------------------------------------- SEO articles */

/** Every published SEO article (Studio → Articles) as a card linking to `/<slug>`, newest first. */
export async function getAllSeoArticleCards(): Promise<PostCard[]> {
  const list = await sanityFetch<RawCard[] | null>({
    query: cardsQuery("seoArticle"),
    tags: ["seoArticle"],
  }).catch(() => null);
  return (list ?? []).filter((p) => p?.slug).map((p) => ({ ...toCard(p), href: `/${p.slug}` }));
}

/**
 * Related Posts (article sidebar): the article's picks (ids, in order, max 3), else the 3 newest
 * other articles. Picks that no longer exist are skipped.
 */
export async function getRelatedSeoArticles(ids: string[], currentId: string): Promise<PostCard[]> {
  const others = (await getAllSeoArticleCards()).filter((p) => p.id !== currentId);
  const picked = ids
    .map((id) => others.find((p) => p.id === id))
    .filter((p): p is PostCard => Boolean(p))
    .slice(0, 3);
  return picked.length ? picked : others.slice(0, 3);
}

/** Every SEO article slug, for generateStaticParams and the sitemap. */
export async function getAllSeoArticleSlugs(): Promise<{ slug: string; _updatedAt?: string }[]> {
  const list = await sanityFetch<{ slug: string; _updatedAt?: string }[] | null>({
    query: `*[_type == "seoArticle" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, _updatedAt }`,
    tags: ["seoArticle"],
  }).catch(() => null);
  return (list ?? []).filter((p) => p?.slug);
}
