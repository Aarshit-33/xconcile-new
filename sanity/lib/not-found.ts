import "server-only";

import { notFound as fallback } from "@/content/not-found";

import { sanityFetch } from "./fetch";

export type NotFoundPageContent = {
  seo: { title: string; description: string };
  illustration: { src: string; width: number; height: number };
  title: string;
  /** [first line, second line]: desktop breaks between them. */
  body: [string, string];
  cta: { label: string; href: string };
};

const NOT_FOUND_QUERY = /* groq */ `*[_type == "notFoundPage" && _id == "notFoundPage"][0]{
  title, intro, detail, cta, seo,
  "illustration": illustration.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height }
}`;

const str = (v: unknown, f: string) => (typeof v === "string" && v.trim() ? v : f);

/**
 * 404 content from the `notFoundPage` singleton (Studio → 404 Page). Any empty field
 * falls back to content/not-found.ts, which is also used when Sanity is not configured or the
 * document doesn't exist. Cache tag: `notFoundPage` (revalidated by /api/revalidate on publish).
 */
export async function getNotFoundPage(): Promise<NotFoundPageContent> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- untyped GROQ result
  const d: any = await sanityFetch({ query: NOT_FOUND_QUERY, tags: ["notFoundPage"] }).catch(() => null);
  const img = d?.illustration;

  return {
    seo: {
      title: str(d?.seo?.title, fallback.seo.title),
      description: str(d?.seo?.description, fallback.seo.description),
    },
    illustration:
      img?.url && img.width && img.height
        ? { src: img.url, width: img.width, height: img.height }
        : { ...fallback.illustration },
    title: str(d?.title, fallback.title),
    body: [str(d?.intro, fallback.body[0]), str(d?.detail, fallback.body[1])],
    cta: { label: str(d?.cta?.label, fallback.cta.label), href: str(d?.cta?.href, fallback.cta.href) },
  };
}
