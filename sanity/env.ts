// Same env var names as the old site. Everything (pages, blog posts, form submissions) lives in
// this ONE dataset; the old site's `production` dataset is no longer read (posts migrated
// 2026-10-27 by scripts/migrate-legacy-blog-sanity.ts, removed 2026-10-30, in git history).
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "v2_xconcile";

// Falls back to a placeholder so `next build` and the Studio route don't crash
// before `.env.local` is filled in. Queries will fail until a real ID is set.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";

export const isSanityConfigured = projectId !== "placeholder-id";

// Tokens and the webhook secret live in `./env.server.ts` (server-only). This file is also bundled
// for the Studio in the browser, so it must only hold public values (security audit S13).

export const studioBasePath = "/studio";
