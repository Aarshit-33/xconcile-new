import "server-only";

import type { MetaTag } from "@/lib/seo";

import {
  blogGallery,
  type BlogArticleSettings,
  type BlogGalleryContent,
  type BlogPostsContent,
} from "@/content/blog-gallery";

import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import {
  heading,
  img,
  IMG,
  keywords,
  mapCtaBand,
  mapHero,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

const BLOG_PAGE_QUERY = /* groq */ `*[_type == "blogPage" && _id == "blogPage"][0]{
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) },
  hero, posts, related,
  newsletter{ ..., "image": image${IMG} },
  ${P.ctaBand}
}`;

/** Shared article copy: each empty field falls back to the code value. */
function mapArticle(
  d: Raw,
  f: BlogArticleSettings,
  ctaImage: BlogArticleSettings["newsletter"]["image"],
): BlogArticleSettings {
  const r = d?.related ?? {};
  const n = d?.newsletter ?? {};
  const image = img(n.image);
  return {
    related: {
      badge: r.badge || f.related.badge,
      title: r.title || f.related.title,
      subtitle: r.subtitle || f.related.subtitle,
      ctaLabel: r.ctaLabel || f.related.ctaLabel,
    },
    newsletter: {
      title: n.title || f.newsletter.title,
      body: n.body || f.newsletter.body,
      placeholder: n.placeholder || f.newsletter.placeholder,
      button: n.button || f.newsletter.button,
      success: n.success || f.newsletter.success,
      already: n.already || f.newsletter.already,
      error: n.error || f.newsletter.error,
      // Decorative photo under the overlay: own photo, else the CTA Band's.
      image: image ? { ...image, alt: "" } : ctaImage,
    },
  };
}

/** Post grid heading + paging: Sanity values, each empty field falling back to the code value. */
function mapPosts(d: Raw, f: BlogPostsContent): BlogPostsContent {
  if (!d) return f;
  const perPage = Number.isInteger(d.perPage) && d.perPage > 0 ? d.perPage : f.perPage;
  return {
    anchorId: d.anchorId || undefined,
    badge: d.badge ?? f.badge,
    title: heading(d.title) ?? f.title,
    subtitle: d.subtitle ?? f.subtitle,
    perPage,
    loadMoreLabel: d.loadMoreLabel || f.loadMoreLabel,
    emptyText: d.emptyText || f.emptyText,
  };
}

/**
 * Blog gallery content (`/blog`) from the `blogPage` singleton (Studio → Blog Gallery), in the
 * exact shape of `BlogGalleryContent`. Same rules as every other page: any section or field left
 * empty in Sanity falls back to content/blog-gallery.ts (also used when Sanity is not configured
 * or the document doesn't exist). Cache tag: `blogPage`. The posts themselves: `getAllPosts`.
 */
async function loadBlogGallery(): Promise<{
  content: BlogGalleryContent;
  ogImage?: string;
  metaTags?: MetaTag[];
}> {
  const f = blogGallery;
  const d: Raw = await sanityFetch({ query: BLOG_PAGE_QUERY, tags: ["blogPage"] });
  if (!d) return { content: f };
  const ctaBand = mapCtaBand(d.ctaBand, f.ctaBand);

  return {
    content: {
      seo: {
        title: d.seo?.title ?? f.seo.title,
        description: d.seo?.description ?? f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
      hero: mapHero(d.hero, f.hero),
      posts: mapPosts(d.posts, f.posts),
      ctaBand,
      article: mapArticle(d, f.article, d.ctaBand ? ctaBand.image : f.article.newsletter.image),
    },
    ogImage: d.seo?.ogImage ?? undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}

/** `loadBlogGallery` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getBlogGallery = withResolvedLinks(loadBlogGallery);
