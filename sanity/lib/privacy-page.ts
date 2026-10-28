import "server-only";

import type { ArticleBlock } from "./blog-post";
import { sanityFetch } from "./fetch";

export type PrivacyPageContent = {
  title: string;
  intro: string;
  lastUpdated: string | null;
  updatedAt: string | null;
  body: ArticleBlock[];
  seo: { title?: string; description?: string; keywords?: string[]; ogImage?: string };
};

const PRIVACY_QUERY = /* groq */ `*[_type == "privacyPage" && _id == "privacyPage"][0]{
  title, intro, lastUpdated, _updatedAt,
  "body": body[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  seo{ title, description, keywords, "ogImage": ogImage.asset->url }
}`;

const DEFAULT_INTRO = "How Xconcile collects, uses and protects your personal information.";

/**
 * Privacy Policy from the `privacyPage` singleton (Studio → Privacy Policy). `null` when the
 * document doesn't exist yet (the page is then a 404). Cache tag: `privacyPage`.
 */
export async function getPrivacyPage(): Promise<PrivacyPageContent | null> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped GROQ result
  const d: any = await sanityFetch({ query: PRIVACY_QUERY, tags: ["privacyPage"] }).catch(() => null);
  const body: ArticleBlock[] = Array.isArray(d?.body) ? d.body.filter(Boolean) : [];
  if (!d?.title || !body.length) return null;

  return {
    title: d.title,
    intro: (typeof d.intro === "string" && d.intro.trim()) || DEFAULT_INTRO,
    lastUpdated: d.lastUpdated || null,
    updatedAt: d._updatedAt || null,
    body,
    seo: {
      title: d.seo?.title || undefined,
      description: d.seo?.description || undefined,
      keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords : undefined,
      ogImage: d.seo?.ogImage || undefined,
    },
  };
}
