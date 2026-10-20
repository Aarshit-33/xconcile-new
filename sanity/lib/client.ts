import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, writeToken } from "../env";

/**
 * Read client for published content. Caching is handled by `sanityFetch` ('use cache').
 * `useCdn: false`: Next caches every query until /api/revalidate (or the dev 1s revalidate)
 * re-fetches it, and that re-fetch must see the just-published content. Sanity's API CDN can
 * keep serving a cached query result for 1–2 minutes after a publish (measured 2026-10-17), so
 * a revalidation through it could cache the old content again. Sanity is only queried on a
 * cache miss or revalidation, so the live API's load stays small.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

/**
 * Server-only write client (contact submissions, newsletter).
 * Never import this from a Client Component.
 */
export const writeClient = client.withConfig({
  token: writeToken,
  useCdn: false,
});
