import "server-only";

import {
  caseStudiesGallery,
  type CaseStudiesGalleryContent,
  type CaseStudiesListContent,
  type CaseStudyPageSettings,
} from "@/content/case-studies";
import type { CtaBandContent } from "@/content/types";

import type { ArticleBlock } from "./blog-post";
import { sanityFetch } from "./fetch";
import {
  heading,
  keywords,
  mapCtaBand,
  mapHero,
  type Raw,
  SECTION_PROJECTION as P,
} from "./sections";

/* ------------------------------------------------------------------ types */

/** One gallery / related card. */
export type CaseStudyCard = {
  id: string;
  slug: string;
  title: string;
  industry: string;
  image: { src: string; alt: string } | null;
};

export type CaseStudyFact = { icon: string; label: string; title: string; text?: string };

export type CaseStudyPage = {
  id: string;
  slug: string;
  title: string;
  industry: string;
  excerpt: string | null;
  publishedAt: string | null;
  updatedAt: string | null;
  image: { src: string; alt: string; width: number; height: number } | null;
  facts: CaseStudyFact[];
  body: ArticleBlock[];
  relatedIds: string[];
  /** Own CTA band, else the gallery's (resolved in `getCaseStudy`). */
  ctaBand: CtaBandContent;
  seo: { title?: string; description?: string; keywords?: string[]; ogImage?: string };
};

/* ------------------------------------------------------------------ queries */

const PUBLISHED = `_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))`;

const CARD = `{
  _id, "slug": slug.current, "title": coalesce(cardTitle, title), industry,
  "image": mainImage{ alt, "src": asset->url }
}`;

const CARDS = /* groq */ `*[${PUBLISHED}] | order(publishedAt desc, _createdAt desc)${CARD}`;

const PAGE = /* groq */ `*[_type == "caseStudiesPage" && _id == "caseStudiesPage"][0]{
  seo{ title, description, keywords, "ogImage": ogImage.asset->url },
  hero, list, detail,
  ${P.ctaBand}
}`;

const ONE = /* groq */ `*[${PUBLISHED} && slug.current == $slug][0]{
  _id, title, "slug": slug.current, industry, excerpt, publishedAt, _updatedAt,
  "image": mainImage{ alt, "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height },
  facts[]{ icon, label, title, text },
  "body": body[]{
    ...,
    _type == "articleImage" => { ..., "src": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
  },
  "relatedIds": related[]._ref,
  ${P.ctaBand},
  seo{ title, description, keywords, "ogImage": ogImage.asset->url }
}`;

/* ------------------------------------------------------------------ mappers */

const toCard = (d: Raw): CaseStudyCard | null =>
  d?.slug && d?.title
    ? {
        id: d._id,
        slug: d.slug,
        title: d.title,
        industry: (typeof d.industry === "string" && d.industry.trim()) || "",
        image: d.image?.src ? { src: d.image.src, alt: d.image.alt ?? "" } : null,
      }
    : null;

function mapList(d: Raw, f: CaseStudiesListContent): CaseStudiesListContent {
  if (!d) return f;
  return {
    anchorId: d.anchorId || undefined,
    badge: d.badge || f.badge,
    title: heading(d.title) || f.title,
    subtitle: d.subtitle || f.subtitle,
    perPage: Number.isInteger(d.perPage) && d.perPage > 0 ? d.perPage : f.perPage,
    loadMoreLabel: d.loadMoreLabel || f.loadMoreLabel,
    allLabel: d.allLabel || f.allLabel,
    cardLinkLabel: d.cardLinkLabel || f.cardLinkLabel,
    emptyText: d.emptyText || f.emptyText,
  };
}

function mapDetail(d: Raw, f: CaseStudyPageSettings): CaseStudyPageSettings {
  const r = d?.related ?? {};
  return {
    badge: d?.badge || f.badge,
    related: {
      badge: r.badge || f.related.badge,
      title: r.title || f.related.title,
      subtitle: r.subtitle || f.related.subtitle,
      ctaLabel: r.ctaLabel || f.related.ctaLabel,
      cardLinkLabel: r.cardLinkLabel || f.related.cardLinkLabel,
    },
  };
}

/* ------------------------------------------------------------------ loaders */

/**
 * Gallery copy (`/case-studies`) from the `caseStudiesPage` singleton (Studio → Case Studies
 * Gallery). Every empty field falls back to content/case-studies.ts. Cache tag: `caseStudiesPage`.
 */
export async function getCaseStudiesGallery(): Promise<{
  content: CaseStudiesGalleryContent;
  ogImage?: string;
}> {
  const f = caseStudiesGallery;
  const d: Raw = await sanityFetch({ query: PAGE, tags: ["caseStudiesPage"] }).catch(() => null);
  if (!d) return { content: f };
  return {
    content: {
      seo: {
        title: d.seo?.title || f.seo.title,
        description: d.seo?.description || f.seo.description,
        keywords: keywords(d.seo?.keywords, f.seo.keywords),
      },
      hero: mapHero(d.hero, f.hero),
      list: mapList(d.list, f.list),
      ctaBand: mapCtaBand(d.ctaBand, f.ctaBand),
      detail: mapDetail(d.detail, f.detail),
    },
    ogImage: d.seo?.ogImage || undefined,
  };
}

/** Every published case study as a card, newest first. Cache tag: `caseStudy`. */
export async function getAllCaseStudies(): Promise<CaseStudyCard[]> {
  const list: Raw[] =
    (await sanityFetch({ query: CARDS, tags: ["caseStudy"] }).catch(() => null)) ?? [];
  return list.map(toCard).filter((c): c is CaseStudyCard => c !== null);
}

/** Slugs for `generateStaticParams` and the sitemap. */
export async function getAllCaseStudySlugs(): Promise<{ slug: string; _updatedAt?: string }[]> {
  return (
    (await sanityFetch<{ slug: string; _updatedAt?: string }[] | null>({
      query: `*[${PUBLISHED}]{ "slug": slug.current, _updatedAt }`,
      tags: ["caseStudy"],
    }).catch(() => null)) ?? []
  );
}

/**
 * One case study by slug (`null` = 404). Its CTA band: its own, else the gallery's
 * (`galleryCta`). Cache tag: `caseStudy`.
 */
export async function getCaseStudy(
  slug: string,
  galleryCta: CtaBandContent,
): Promise<CaseStudyPage | null> {
  const d: Raw = await sanityFetch({ query: ONE, params: { slug }, tags: ["caseStudy"] }).catch(
    () => null,
  );
  if (!d?.title) return null;
  return {
    id: d._id,
    slug: d.slug,
    title: d.title,
    industry: (typeof d.industry === "string" && d.industry.trim()) || "",
    excerpt: d.excerpt || null,
    publishedAt: d.publishedAt || null,
    updatedAt: d._updatedAt || null,
    image:
      d.image?.src && d.image.width && d.image.height
        ? { src: d.image.src, alt: d.image.alt ?? "", width: d.image.width, height: d.image.height }
        : null,
    facts: (Array.isArray(d.facts) ? d.facts : [])
      .filter((x: Raw) => x?.label && x?.title)
      .map((x: Raw) => ({
        icon: x.icon || "verified_user",
        label: x.label,
        title: x.title,
        text: x.text || undefined,
      })),
    body: Array.isArray(d.body) ? d.body.filter(Boolean) : [],
    relatedIds: Array.isArray(d.relatedIds)
      ? d.relatedIds.filter((x: unknown) => typeof x === "string")
      : [],
    // Own band only when it has a heading; a half-filled one falls back field by field.
    ctaBand: d.ctaBand?.title ? mapCtaBand(d.ctaBand, galleryCta) : galleryCta,
    seo: {
      title: d.seo?.title || undefined,
      description: d.seo?.description || undefined,
      keywords: Array.isArray(d.seo?.keywords) ? d.seo.keywords : undefined,
      ogImage: d.seo?.ogImage || undefined,
    },
  };
}

/**
 * Up to 3 related cards: the case study's picks (in order), then others from the same industry,
 * then the newest. Never the case study itself.
 */
export async function getRelatedCaseStudies(
  current: Pick<CaseStudyPage, "id" | "industry" | "relatedIds">,
) {
  const all = await getAllCaseStudies();
  const others = all.filter((c) => c.id !== current.id);
  const picked = current.relatedIds
    .map((id) => others.find((c) => c.id === id))
    .filter((c): c is CaseStudyCard => !!c);
  const sameIndustry = others.filter((c) => c.industry && c.industry === current.industry);
  const out: CaseStudyCard[] = [];
  for (const c of [...picked, ...sameIndustry, ...others]) {
    if (out.length === 3) break;
    if (!out.some((o) => o.id === c.id)) out.push(c);
  }
  return out;
}
