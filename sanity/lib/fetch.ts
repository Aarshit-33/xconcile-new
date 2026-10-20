import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import type { QueryParams } from "next-sanity";

import { isSanityConfigured } from "../env";
import { client } from "./client";

type SanityFetchOptions = {
  query: string;
  params?: QueryParams;
  /** Cache tags, normally the Sanity `_type`(s) the query reads. Revalidated by /api/revalidate. */
  tags?: string[];
  /** Read from another dataset of the same project (e.g. blog posts from `blogDataset`). */
  dataset?: string;
};

/**
 * Cached Sanity fetch for Server Components (Next 16 Cache Components).
 *
 * - `'use cache'` + `cacheLife('max')`: pages are static until a Sanity webhook hits
 *   /api/revalidate, which calls `revalidateTag(<_type>, 'max')`.
 * - Every call is also tagged `sanity` so you can purge everything at once.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- legacy queries are untyped until `npm run typegen`
export async function sanityFetch<T = any>({
  query,
  params = {},
  tags = [],
  dataset,
}: SanityFetchOptions): Promise<T> {
  "use cache";
  // Production: static until the Sanity webhook hits /api/revalidate. Development (no webhook):
  // the server revalidates after 1s, so a published Studio edit shows within a refresh or two.
  // Thresholds (node_modules/next/dist/docs/.../cacheLife.md "Prerendering behavior"):
  // expire >= 5 min or the entry becomes a dynamic hole, and stale >= 5 min or it is left out of
  // the route's static shell; either one triggers the "uncached data during prerendering"
  // error (no <Suspense> on these pages). `stale` only affects the client router cache, not a
  // browser refresh.
  if (process.env.NODE_ENV === "development") {
    cacheLife({ stale: 300, revalidate: 1, expire: 60 * 60 * 24 });
  } else {
    cacheLife("max");
  }
  cacheTag("sanity", ...tags);

  if (!isSanityConfigured) {
    // Lets `next build` succeed before NEXT_PUBLIC_SANITY_PROJECT_ID is set.
    return null as T;
  }

  const reader = dataset && dataset !== client.config().dataset ? client.withConfig({ dataset }) : client;
  return reader.fetch<T>(query, params);
}
