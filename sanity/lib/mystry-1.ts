import "server-only";

import type { MetaTag } from "@/lib/seo";

import type { ArticleBlock } from "./blog-post";
import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";

export type Mystry1Content = {
  title: string;
  intro: string;
  lastUpdated: string | null;
  updatedAt: string | null;
  body: ArticleBlock[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    metaTags?: MetaTag[];
  };
};

const MYSTRY1_QUERY = /* groq */ `*[_type == "mystry1" && _id == "mystry1"][0]{
  title, intro, lastUpdated, _updatedAt,
  "body": body[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) }
}`;

/**
 * Content of the parked `mystry1` document. Currently unused (no route calls it). `null` when
 * the document doesn't exist. Cache tag: `mystry1`.
 */
async function loadMystry1(): Promise<Mystry1Content | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped GROQ result
  const d: any = await sanityFetch({ query: MYSTRY1_QUERY, tags: ["mystry1"] }).catch(() => null);
  const body: ArticleBlock[] = Array.isArray(d?.body) ? d.body.filter(Boolean) : [];
  if (!d?.title || !body.length) return null;

  return {
    title: d.title,
    intro: (typeof d.intro === "string" && d.intro.trim()) || "",
    lastUpdated: d.lastUpdated || null,
    updatedAt: d._updatedAt || null,
    body,
    seo: {
      title: d.seo?.title || undefined,
      description: d.seo?.description || undefined,
      keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords : undefined,
      ogImage: d.seo?.ogImage || undefined,
      metaTags: d.seo?.metaTags ?? undefined,
    },
  };
}

/** `loadMystry1` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getMystry1 = withResolvedLinks(loadMystry1);
