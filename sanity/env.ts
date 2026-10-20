// Same env var names as the old site so the existing Sanity project/dataset keeps working.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "v2_xconcile";

/**
 * Dataset the blog posts are READ from. The 65 live posts exist only in `production` (the old
 * site's dataset; client rule: blog content stays as on the existing site), so the Home blog
 * teaser reads them from there even while page content comes from `v2_xconcile`. Read-only:
 * nothing in this app writes posts. Switch to the new dataset once posts are migrated.
 */
export const blogDataset = process.env.SANITY_BLOG_DATASET || "production";

// Falls back to a placeholder so `next build` and the Studio route don't crash
// before `.env.local` is filled in. Queries will fail until a real ID is set.
export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder-id";

export const isSanityConfigured = projectId !== "placeholder-id";

/** Server-only. Used by API routes / server actions that write documents. */
export const writeToken = process.env.SANITY_API_TOKEN;

/** Server-only. Shared secret for the Sanity webhook -> /api/revalidate. */
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;

export const studioBasePath = "/studio";
