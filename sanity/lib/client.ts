import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
import { readToken, writeToken } from "../env.server";

/**
 * Read client for published content. Caching is handled by `sanityFetch` ('use cache').
 * `useCdn: false`: Next caches every query until /api/revalidate (or the dev 1s revalidate)
 * re-fetches it, and that re-fetch must see the just-published content. Sanity's API CDN can
 * keep serving a cached query result for 1–2 minutes after a publish (measured 2026-10-17), so
 * a revalidation through it could cache the old content again. Sanity is only queried on a
 * cache miss or revalidation, so the live API's load stays small.
 *
 * Uses the viewer/editor token when one is set, so the site keeps working if the dataset is made
 * private (security audit S2). `perspective: "published"` keeps drafts out either way.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  token: readToken,
});

/**
 * Server-only write client (contact submissions, newsletter).
 * Never import this from a Client Component (`server-only` enforces it at build time).
 */
export const writeClient = client.withConfig({
  token: writeToken,
  useCdn: false,
});
