import "server-only";

import { cache } from "react";

import { hirePages, type HirePageContent } from "@/content/hire";
import { industryPages, type IndustryPageContent } from "@/content/industries";
import { servicePages, type ServicePageContent } from "@/content/services";
import { routes } from "@/lib/routes";

import { sanityFetch } from "./fetch";

/**
 * Live URLs of the service, hire and industry pages: the single place that decides where each
 * of these pages lives (user request 2026-10-28: "change the URL in Sanity and it should change
 * in the whole site wherever it is used").
 *
 * - **Live slug** = the published Sanity document's "URL slug" (Studio → the page → Page tab),
 *   else the code default (`slug` in content/<kind>/<page>.ts).
 * - **Document** = matched by `_id`, which never changes (`sanityId` in the content file, else
 *   `<type>-<slug>`), so a new slug never disconnects a page from its Sanity content.
 * - **Old URLs 301** (single hop) to the live URL: the code default when Studio overrides it,
 *   the content file's `redirectFrom`, and the document's `oldSlugs` (filled in automatically
 *   when a changed slug is published, sanity/actions/record-old-slug.ts).
 * - **Links follow**: `resolveLinks()` rewrites every link to an old URL (code content, Studio
 *   fields, blog bodies, menus, footer) to the live one. The page loaders, Site Settings, the
 *   routes, canonicals, JSON-LD and the sitemap all read from here.
 *
 * Cache: one GROQ query tagged with the three page types, so publishing a slug change
 * (webhook → /api/revalidate) refreshes every page that links to it.
 */

const KINDS = {
  service: { type: "servicePage", registry: servicePages, path: routes.service },
  hire: { type: "hirePage", registry: hirePages, path: routes.hireStaff },
  industry: { type: "industryPage", registry: industryPages, path: routes.industry },
} as const;

type ContentByKind = {
  service: ServicePageContent;
  hire: HirePageContent;
  industry: IndustryPageContent;
};
export type PageKind = keyof ContentByKind;

export const PAGE_DOCUMENT_TYPES = Object.values(KINDS).map((k) => k.type);

export type PageEntry<K extends PageKind = PageKind> = {
  [P in K]: {
    kind: P;
    /** Sanity document `_id` (stable across renames). */
    id: string;
    /** Live slug. */
    slug: string;
    /** Live path, e.g. `/hire-virtual-cfo` or `/industries/healthcare-accounting-services`. */
    path: string;
    /** Code content: the fallback for every field Studio leaves empty. */
    content: ContentByKind[P];
    /** Published document's `_updatedAt` (sitemap lastmod). */
    updatedAt?: string;
  };
}[K];

export type PageUrls = {
  pages: PageEntry[];
  /** The page served at a live path. */
  byPath: (path: string) => PageEntry | undefined;
  /** 301 target for an old page path, if it is one. */
  redirectFor: (path: string) => string | undefined;
  /** Rewrites links to old page URLs anywhere inside `value` (see `resolveLinks` below). */
  resolveLinks: <T>(value: T) => T;
};

type Doc = { _id: string; slug?: string | null; oldSlugs?: string[] | null; _updatedAt?: string };

const PAGE_URLS_QUERY = /* groq */ `*[_type in $types && !(_id in path("drafts.**"))]{
  _id, "slug": slug.current, oldSlugs, _updatedAt
}`;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const isSlug = (s: unknown): s is string => typeof s === "string" && SLUG.test(s);

/** Keys whose string value is a link (same set as the Sanity link-rewrite scripts). */
const LINK_KEYS = new Set(["href", "url", "link"]);
/** Optional own-site origin, the path, then any ?query/#hash. A trailing slash is dropped. */
const OWN_LINK = /^(https?:\/\/[^/]*xconcile[^/]*)?(\/[^?#]*?)\/?([?#].*)?$/;

function build(docs: Doc[]): PageUrls {
  const byId = new Map(docs.map((d) => [d._id, d]));
  const pages: PageEntry[] = [];
  const oldPaths: { from: string; to: string }[] = [];

  for (const [kind, k] of Object.entries(KINDS) as [PageKind, (typeof KINDS)[PageKind]][]) {
    for (const content of Object.values(k.registry) as ContentByKind[PageKind][]) {
      const id = content.sanityId ?? `${k.type}-${content.slug}`;
      const doc = byId.get(id);
      const slug = isSlug(doc?.slug) ? doc.slug : content.slug;
      const path = k.path(slug);
      pages.push({ kind, id, slug, path, content, updatedAt: doc?._updatedAt } as PageEntry);
      for (const old of [content.slug, ...(content.redirectFrom ?? []), ...(doc?.oldSlugs ?? [])])
        if (isSlug(old) && old !== slug) oldPaths.push({ from: k.path(old), to: path });
    }
  }

  // A live URL always wins over an old one (validation in Studio keeps them apart anyway).
  const live = new Map<string, PageEntry>();
  for (const p of pages) if (!live.has(p.path)) live.set(p.path, p);
  const redirects = new Map<string, string>();
  for (const { from, to } of oldPaths)
    if (!live.has(from) && !redirects.has(from)) redirects.set(from, to);

  const fixLink = (value: string): string => {
    const m = OWN_LINK.exec(value.trim());
    const to = m && redirects.get(m[2]);
    return to ? `${m[1] ?? ""}${to}${m[3] ?? ""}` : value;
  };

  /** Copy-on-write walk over plain objects/arrays; returns the same reference when unchanged. */
  const walk = (node: unknown): unknown => {
    if (Array.isArray(node)) {
      let changed = false;
      const out = node.map((v) => {
        const w = walk(v);
        if (w !== v) changed = true;
        return w;
      });
      return changed ? out : node;
    }
    if (node && typeof node === "object") {
      const proto = Object.getPrototypeOf(node);
      if (proto !== Object.prototype && proto !== null) return node;
      let out: Record<string, unknown> | undefined;
      for (const [key, v] of Object.entries(node)) {
        const w = typeof v === "string" ? (LINK_KEYS.has(key) ? fixLink(v) : v) : walk(v);
        if (w !== v) (out ??= { ...(node as Record<string, unknown>) })[key] = w;
      }
      return out ?? node;
    }
    return node;
  };

  return {
    pages,
    byPath: (path) => live.get(path),
    redirectFor: (path) => redirects.get(path),
    resolveLinks: <T>(value: T) => (redirects.size ? (walk(value) as T) : value),
  };
}

/**
 * The URL map for this request (React `cache`; the query itself is `sanityFetch`-cached).
 * Sanity not configured or unreachable → the code defaults and `redirectFrom` only.
 */
export const getPageUrls = cache(async (): Promise<PageUrls> => {
  const docs = await sanityFetch<Doc[] | null>({
    query: PAGE_URLS_QUERY,
    params: { types: PAGE_DOCUMENT_TYPES },
    tags: PAGE_DOCUMENT_TYPES,
  }).catch(() => null);
  return build(docs ?? []);
});

/** `value` with every link to an old service/hire/industry URL pointing at the live URL. */
export async function resolveLinks<T>(value: T): Promise<T> {
  return (await getPageUrls()).resolveLinks(value);
}

/** Wraps a page loader so everything it returns has its page links resolved. */
export function withResolvedLinks<A extends unknown[], R>(load: (...args: A) => Promise<R>) {
  return async (...args: A): Promise<R> => resolveLinks(await load(...args));
}
