import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  // `npm run share` (ngrok) / `npm run share:cf` (Cloudflare quick tunnel): let the dev server
  // serve its dev-only assets/HMR to tunnel URLs.
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.app",
    "*.ngrok.dev",
    "*.ngrok.io",
    "*.trycloudflare.com",
  ],
  // Note: experimental.inlineCss was A/B tested on Home: no Lighthouse gain, HTML 422KB -> 792KB
  // (CSS duplicated in the RSC payload) and no cross-page CSS caching. Keep linked CSS.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async redirects() {
    // Carried over from the old site. Keep every redirect SINGLE-HOP.
    // If the Figma slugs are adopted (report §6), add old-slug -> new-slug rules here.
    return [
      { source: "/services/:slug", destination: "/:slug", permanent: true },
      { source: "/hire-staff/:slug", destination: "/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
