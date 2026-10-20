import { cacheLife } from "next/cache";

/**
 * Current year, cached (Cache Components forbids reading the clock during prerender
 * outside a cache scope). Refreshes at most daily / on redeploy.
 */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
