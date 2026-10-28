import "server-only";

/**
 * Server-only Sanity secrets. Kept out of `sanity/env.ts`, which the Studio bundle (browser) also
 * imports: `import "server-only"` makes the build fail if a Client Component ever pulls this in.
 *
 * Token names (security audit 2026-10-27, S8): the code used to read only `SANITY_API_TOKEN` (the
 * old site's name), but the Vercel ↔ Sanity integration creates `SANITY_API_WRITE_TOKEN` and
 * `SANITY_API_READ_TOKEN`. Both spellings work, so form leads are saved whichever one is set.
 */

/** Editor token: writes contact submissions and newsletter subscriptions. */
export const writeToken = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

/**
 * Viewer token for published-content reads. Optional while the dataset is public; required once
 * it is made private (audit S2). Falls back to the write token, which can also read.
 */
export const readToken = process.env.SANITY_API_READ_TOKEN || writeToken;

/** Shared secret for the Sanity webhook -> /api/revalidate. */
export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
