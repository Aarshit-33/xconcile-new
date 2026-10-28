import type { NextConfig } from "next";

/** Only the live deployment sets NEXT_PUBLIC_SITE_ENV=production (see app/robots.ts). */
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

/**
 * Security headers (audit 2026-10-27, S6). Sent on every response, Studio included.
 * HSTS is not set here: Vercel already sends `max-age=63072000` on its domains, and adding
 * `includeSubDomains` would force HTTPS on every xconcile.com subdomain (mail, autodiscover, ...).
 */
const securityHeaders = [
  // Anti-clickjacking: no other site may frame these pages (the Studio especially).
  // `frame-ancestors` is the modern form; X-Frame-Options covers older browsers.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Enforced CSP limited to directives that cannot break third-party scripts.
  {
    key: "Content-Security-Policy",
    value: [
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      // Production only: on http://localhost it would upgrade the page's own assets to https.
      ...(isProduction ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

/**
 * Full CSP, REPORT-ONLY for now: browsers log violations in the console but block nothing. GTM
 * can inject any tag configured in its container, so check the console on the live site (and GTM's
 * tag list) and add missing hosts here before switching the header name to
 * `Content-Security-Policy`. `'unsafe-inline'` is needed for Next's inline bootstrap scripts
 * unless nonces are added (which would make every page dynamic). Not applied to /studio.
 */
const reportOnlyCsp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://*.google-analytics.com https://salesiq.zohopublic.in https://*.zohopublic.in https://static.zohocdn.com https://assets.calendly.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://static.zohocdn.com https://*.zohopublic.in https://assets.calendly.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://static.zohocdn.com https://*.zohopublic.in",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.zohopublic.in wss://*.zohopublic.in https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://calendly.com https://*.zohopublic.in https://www.googletagmanager.com",
  "media-src 'self' https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  // Don't advertise the framework (audit S6).
  poweredByHeader: false,
  experimental: {
    // Set by the Next 16.4.0 → 16.4.3 security upgrade (`next upgrade --agent=security`): coding
    // agents are nudged only about security releases. Dev-tooling only; no effect on the site.
    agentUpgrade: "security",
  },
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
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:path((?!studio(?:/|$)).*)",
        headers: [{ key: "Content-Security-Policy-Report-Only", value: reportOnlyCsp }],
      },
      // Preview/staging deployments (xconcile-new.vercel.app, ...): never indexed, even when a
      // URL is linked from elsewhere (robots.txt alone only stops crawling). Audit SEO6.
      ...(isProduction
        ? []
        : [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]),
    ];
  },
  async redirects() {
    // Carried over from the old site. Keep every redirect SINGLE-HOP.
    // If the Figma slugs are adopted (report §6), add old-slug -> new-slug rules here.
    return [
      // Preferred origin is https://xconcile.com (client requirement 2026-10-27). Vercel does
      // this first (Project → Domains: www.xconcile.com "Redirect to xconcile.com", 308; HTTP →
      // HTTPS is automatic). This rule is the backup if www is ever attached as a normal domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.xconcile.com" }],
        destination: "https://xconcile.com/:path*",
        permanent: true,
      },
      { source: "/services/:slug", destination: "/:slug", permanent: true },
      { source: "/hire-staff/:slug", destination: "/:slug", permanent: true },
      // Old-site pages that are sections on the new site (2026-10-27 audit).
      // /contact is a real page again since 2026-10-27 (app/(website)/contact).
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/team", destination: "/about#team", permanent: true },
      // The old /meeting page only embedded Calendly.
      {
        source: "/meeting",
        destination:
          process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/xconcile/new-meeting",
        permanent: false,
      },
      // Old industry with no page in the redesign.
      { source: "/industries/industrial-niche", destination: "/industries", permanent: true },
      // IT page renamed to its Figma page name (client note 2026-10-27).
      {
        source: "/industries/it-technology",
        destination: "/industries/it-technology-accounting-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
