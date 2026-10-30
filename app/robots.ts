import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/routes";

/**
 * Replaces old-code public/robots.txt. Non-production deployments are fully disallowed
 * (set NEXT_PUBLIC_SITE_ENV=production only on the live deployment).
 */
export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio/", "/api/"] },
      // AI crawlers: allowed for GEO/AEO visibility (report §8.3). Change to disallow if the client opts out.
      // A named group REPLACES the `*` group for those bots, so it repeats the disallows (audit N-SEO5).
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "ClaudeBot", "PerplexityBot", "Google-Extended"],
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // No `host`: a Yandex-only directive (dropped in 2018) that expects a bare hostname.
  };
}
