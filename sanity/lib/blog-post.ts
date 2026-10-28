import "server-only";

import type { MetaTag } from "@/lib/seo";

import { sanityFetch } from "./fetch";
import { withResolvedLinks } from "./page-urls";
import { readMinutes } from "./queries";

/** Portable Text block / custom block from the article body (rendered by ArticleBody). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Portable Text is open-ended
export type ArticleBlock = { _type: string; _key?: string; [key: string]: any };

export type TocItem = { id: string; text: string };

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  /** e.g. 6 (shown as "6 min read"). */
  readMinutes: number | null;
  author: { name: string; title?: string; photo?: string } | null;
  cover: { src: string; alt: string; width?: number; height?: number } | null;
  /** Text shown over the cover in the article (Studio → Text on the cover image). */
  coverOverlay: { title: string; text?: string; showLogo: boolean } | null;
  body: ArticleBlock[];
  /** SEO articles: "Closing section" shown after the FAQs (empty for blog posts). */
  conclusion: ArticleBlock[];
  /** Block `_key` → heading id, for every Table of Contents heading in the body. */
  headingIds: Record<string, string>;
  /** H2 headings (+ the FAQ section), in page order. */
  toc: TocItem[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedSlugs: string[];
  /** SEO articles: picked related articles (document ids), in order. */
  relatedIds: string[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
    metaTags?: MetaTag[];
  };
};

/** Id of the FAQ section (Table of Contents target). */
export const FAQ_SECTION_ID = "faqs";

const IMAGE = `{ alt, "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }`;

/** Blog posts (`blogPost`) and SEO articles (`seoArticle`) share these fields. */
const POST = /* groq */ `*[_type == $type && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt, _updatedAt, readTime,
  "chars": length(pt::text(body)),
  "author": author->{ name, title, "photo": photo.asset->url },
  "cover": mainImage${IMAGE},
  coverOverlay,
  "body": body[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  faqTitle, "faqs": faqs[]{ question, answer }, relatedPosts, "relatedIds": related[]._ref,
  "conclusion": conclusion[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  seo{ title, description, keywords, "ogImage": ogImage.asset->url, "metaTags": coalesce(metaTags[]{ key, value }, []) + select(defined(canonicalUrl) => [{ "key": "canonical", "value": canonicalUrl }], []) }
}`;

const plainText = (block: ArticleBlock) =>
  Array.isArray(block.children)
    ? block.children
        .map((c: { text?: string }) => c.text ?? "")
        .join("")
        .trim()
    : "";

/** "1. What is Accounting Outsourcing?" → "1-what-is-accounting-outsourcing". */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "section";

/**
 * Table of Contents: every H2 (and stray H1, rendered as H2 so the page keeps one H1) gets a
 * unique id from its text. The FAQ section is added last when the post has FAQs.
 */
function buildToc(body: ArticleBlock[], faqTitle: string | null) {
  const used = new Set<string>([FAQ_SECTION_ID]);
  const headingIds: Record<string, string> = {};
  const toc: TocItem[] = [];
  body.forEach((block, i) => {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h1")) return;
    const text = plainText(block);
    if (!text) return;
    let id = slugify(text);
    for (let n = 2; used.has(id); n++) id = `${slugify(text)}-${n}`;
    used.add(id);
    headingIds[block._key ?? String(i)] = id;
    toc.push({ id, text });
  });
  if (faqTitle) toc.push({ id: FAQ_SECTION_ID, text: faqTitle });
  return { headingIds, toc };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- raw GROQ result, mapped below
type Raw = any;

/**
 * One article by slug (Studio → Blog Posts). `null` = no such post (404).
 * Cache tags: `blogPost` + `author`.
 */
async function loadBlogArticle(slug: string): Promise<BlogArticle | null> {
  return loadArticle("blogPost", slug);
}

/**
 * One SEO article by slug (Studio → Articles; served at the root, `/<slug>`). `null` = none.
 * Cache tags: `seoArticle` + `author`.
 */
async function loadSeoArticle(slug: string): Promise<(BlogArticle & { id: string }) | null> {
  return loadArticle("seoArticle", slug);
}

async function loadArticle(
  type: "blogPost" | "seoArticle",
  slug: string,
): Promise<(BlogArticle & { id: string }) | null> {
  const d: Raw = await sanityFetch({
    query: POST,
    params: { slug, type },
    tags: [type, "author"],
  }).catch(() => null);
  if (!d?.title) return null;

  const body: ArticleBlock[] = Array.isArray(d.body) ? d.body.filter(Boolean) : [];
  const faqs = (Array.isArray(d.faqs) ? d.faqs : []).filter(
    (f: Raw) =>
      typeof f?.question === "string" && typeof f?.answer === "string" && f.question.trim(),
  );
  const faqTitle =
    (typeof d.faqTitle === "string" && d.faqTitle.trim()) || "Frequently Asked Questions";
  const { headingIds, toc } = buildToc(body, faqs.length ? faqTitle : null);

  const author = d.author?.name
    ? {
        name: d.author.name,
        title: d.author.title || undefined,
        photo: d.author.photo || undefined,
      }
    : null;

  return {
    id: d._id,
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt || null,
    publishedAt: d.publishedAt || null,
    updatedAt: d._updatedAt || null,
    readMinutes: readMinutes(d.readTime, d.chars),
    author,
    cover: d.cover?.src
      ? { src: d.cover.src, alt: d.cover.alt ?? "", width: d.cover.width, height: d.cover.height }
      : null,
    coverOverlay: d.coverOverlay?.title?.trim()
      ? {
          title: d.coverOverlay.title.trim(),
          text: d.coverOverlay.text?.trim() || undefined,
          showLogo: d.coverOverlay.showLogo !== false,
        }
      : null,
    body,
    headingIds,
    conclusion: Array.isArray(d.conclusion) ? d.conclusion.filter(Boolean) : [],
    toc,
    faqTitle,
    faqs,
    relatedSlugs: Array.isArray(d.relatedPosts)
      ? d.relatedPosts.filter((s: unknown) => typeof s === "string")
      : [],
    relatedIds: Array.isArray(d.relatedIds)
      ? d.relatedIds.filter((s: unknown) => typeof s === "string")
      : [],
    seo: {
      title: d.seo?.title || undefined,
      description: d.seo?.description || undefined,
      keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords : undefined,
      ogImage: d.seo?.ogImage || undefined,
      metaTags: d.seo?.metaTags ?? undefined,
    },
  };
}

/** `loadBlogArticle` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getBlogArticle = withResolvedLinks(loadBlogArticle);

/** `loadSeoArticle` with links to renamed pages resolved (sanity/lib/page-urls.ts). */
export const getSeoArticle = withResolvedLinks(loadSeoArticle);
