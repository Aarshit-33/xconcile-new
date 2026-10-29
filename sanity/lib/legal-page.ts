import "server-only";

import { legalPages, type LegalPageContent, type LegalPageKind } from "@/content/legal";
import type { MetaTag } from "@/lib/seo";

import type { ArticleBlock } from "./blog-post";
import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import { keywords, richText, type Raw } from "./sections";

/** Singleton document per page (`_id` = `_type` = cache tag, like every other singleton). */
export const LEGAL_PAGE_IDS: Record<LegalPageKind, string> = {
  privacy: "privacyPolicyPage",
  terms: "termsOfUsePage",
};

/** What the template renders: the page copy, with the Content in the blog editor's blocks. */
export type LegalPageData = Omit<LegalPageContent, "body"> & {
  body: ArticleBlock[];
  /** H2 block `_key` → anchor id, so each section can be linked (`#2-how-we-use-your-information`). */
  headingIds: Record<string, string>;
};

// Images resolved like the blog body (sanity/lib/blog-post.ts).
const LEGAL_QUERY = /* groq */ `*[_id == $id][0]{
  title, lastUpdated, intro,
  "body": body[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) }
}`;

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Every H2 gets a unique id from its text ("2. How We Use…" → "2-how-we-use…"). */
function buildHeadingIds(body: ArticleBlock[]) {
  const used = new Set<string>();
  const ids: Record<string, string> = {};
  body.forEach((block, i) => {
    if (block._type !== "block" || block.style !== "h2") return;
    const text = (Array.isArray(block.children) ? block.children : [])
      .map((c: { text?: string }) => c.text ?? "")
      .join("")
      .trim();
    if (!text) return;
    const base =
      text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "section";
    let id = base;
    for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
    used.add(id);
    ids[block._key ?? String(i)] = id;
  });
  return ids;
}

/** True when the Content has at least one block with visible text, an image or a table. */
const hasContent = (body: Raw): body is ArticleBlock[] =>
  Array.isArray(body) &&
  body.some(
    (b: Raw) =>
      b?._type !== "block" ||
      (b.children ?? []).some((c: Raw) => typeof c?.text === "string" && c.text.trim()),
  );

/**
 * Privacy Policy / Terms of Use from their Studio singletons (Studio → Privacy Policy / Terms of
 * Use). Same rules as every other page: any field left empty falls back to content/legal.ts (also
 * used when Sanity is not configured or the document doesn't exist yet). The Content is the blog
 * editor's Portable Text, rendered by the blog's ArticleBody (same spacing rules: empty lines
 * typed in Studio show as typed).
 */
async function loadLegalPage(kind: LegalPageKind): Promise<{
  content: LegalPageData;
  ogImage?: string;
  metaTags?: MetaTag[];
}> {
  const f = legalPages[kind];
  const id = LEGAL_PAGE_IDS[kind];
  const d: Raw = await sanityFetch({ query: LEGAL_QUERY, params: { id }, tags: [id] }).catch(
    () => null,
  );
  const fallback = { ...f, headingIds: buildHeadingIds(f.body) };
  if (!d) return { content: fallback };

  const body: ArticleBlock[] = hasContent(d.body) ? d.body : f.body;
  const intro = richText(d.intro);

  return {
    content: {
      title: d.title?.trim() || f.title,
      lastUpdated: ISO_DATE.test(d.lastUpdated ?? "") ? d.lastUpdated : f.lastUpdated,
      intro: intro?.length ? intro : f.intro,
      body,
      headingIds: buildHeadingIds(body),
      seo: {
        title: d.seo?.title || f.seo.title,
        description: d.seo?.description || f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
    },
    ogImage: d.seo?.ogImage || undefined,
    metaTags: d.seo?.metaTags ?? undefined,
  };
}

/** `loadLegalPage` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getLegalPage = withResolvedLinks(loadLegalPage);
