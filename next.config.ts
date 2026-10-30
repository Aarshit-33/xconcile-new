import type { NextConfig } from "next";

/** Only the live deployment sets NEXT_PUBLIC_SITE_ENV=production (see app/robots.ts). */
const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
/** `next dev`: React's dev build needs eval, and HMR uses a websocket. */
const isDev = process.env.NODE_ENV === "development";

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
];

/** Directives that can't break any third-party script; enforced everywhere, Studio included. */
const baseCsp = [
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // Production only: on http://localhost it would upgrade the page's own assets to https.
  ...(isProduction ? ["upgrade-insecure-requests"] : []),
];

/**
 * Full CSP for the website (not /studio), ENFORCED since 2026-10-30 (audit S6: "add a reporting
 * endpoint, review the reports, then enforce"). Hosts come from:
 * - the live GTM container GTM-WRRFT9ZZ (checked 2026-10-30): GA4 G-CXWJ1X8BEM, and a Custom
 *   HTML tag that loads Apollo.io's tracker (assets.apollo.io → aplo-evnt.com), which loads
 *   LiveIntent (d-code.liadm.com → *.liadm.com);
 * - Zoho SalesIQ, Calendly, YouTube (nocookie), Vercel Analytics / Speed Insights;
 * - a headless-Chrome crawl of the production build with consent denied and granted, opening
 *   Calendly, the chat widget, a video and the contact CAPTCHA: 0 violations.
 * `'unsafe-inline'` scripts are needed for Next's inline bootstrap and GTM's Custom HTML tag
 * (nonces would make every page dynamic).
 *
 * Violations are reported to /api/csp-report (app/api/csp-report/route.ts) and logged as
 * `[csp] {...}` lines. If marketing adds a GTM tag that loads a new host, its requests are
 * blocked and logged there: add the host below.
 * Emergency switch, no code change: set CSP_REPORT_ONLY=true in Vercel and redeploy; the
 * policy is then only reported, never enforced.
 */
const googleHosts = [
  "https://*.googletagmanager.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
  "https://www.google.com",
  "https://www.googleadservices.com",
  "https://googleads.g.doubleclick.net",
  "https://pagead2.googlesyndication.com",
];
const zohoHosts = ["https://*.zohopublic.in", "https://*.zohocdn.com"];
const vercelToolbar = isProduction
  ? { script: [], style: [], font: [], connect: [], frame: [] }
  : {
      // Vercel's preview toolbar (preview deployments only).
      script: ["https://vercel.live"],
      style: ["https://vercel.live"],
      font: ["https://vercel.live", "https://assets.vercel.com"],
      connect: ["https://vercel.live", "wss://ws-us3.pusher.com"],
      frame: ["https://vercel.live"],
    };

const websiteCsp = [
  "default-src 'self'",
  [
    "script-src 'self' 'unsafe-inline'",
    ...(isDev ? ["'unsafe-eval'"] : []),
    ...googleHosts,
    ...zohoHosts,
    "https://assets.calendly.com",
    "https://assets.apollo.io",
    "https://*.liadm.com",
    "https://va.vercel-scripts.com",
    ...vercelToolbar.script,
  ].join(" "),
  [
    "style-src 'self' 'unsafe-inline'",
    ...zohoHosts,
    "https://assets.calendly.com",
    ...vercelToolbar.style,
  ].join(" "),
  "img-src 'self' data: blob: https:",
  ["font-src 'self' data:", ...zohoHosts, ...vercelToolbar.font].join(" "),
  [
    "connect-src 'self'",
    ...(isDev ? ["ws:", "wss:"] : []),
    ...googleHosts,
    "https://*.google.com",
    "https://*.doubleclick.net",
    ...zohoHosts,
    "wss://*.zohopublic.in",
    "https://aplo-evnt.com",
    "https://*.apollo.io",
    "https://*.liadm.com",
    "https://calendly.com",
    "https://vitals.vercel-insights.com",
    ...vercelToolbar.connect,
  ].join(" "),
  [
    "frame-src 'self'",
    "https://www.youtube-nocookie.com",
    "https://www.youtube.com",
    "https://calendly.com",
    "https://*.zohopublic.in",
    "https://www.googletagmanager.com",
    "https://td.doubleclick.net",
    "https://*.liadm.com",
    ...vercelToolbar.frame,
  ].join(" "),
  "media-src 'self' blob: https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  ...baseCsp,
  "report-uri /api/csp-report",
].join("; ");

const cspReportOnly = process.env.CSP_REPORT_ONLY === "true";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  // Don't advertise the framework (audit S6).
  poweredByHeader: false,
  // svg-captcha (contact form CAPTCHA, lib/captcha.ts) reads its font file from node_modules at
  // runtime; keep it out of the server bundle so that path still resolves.
  serverExternalPackages: ["svg-captcha"],
  experimental: {
    // Set by the Next 16.4.0 → 16.4.3 security upgrade (`next upgrade --agent=security`): coding
    // agents are nudged only about security releases. Dev-tooling only; no effect on the site.
    agentUpgrade: "security",
  },
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
    // Quality 90 for every optimized image (user request 2026-10-29: Studio uploads looked soft
    // at the default 75). Next 16 serves any image without a `quality` prop at the closest
    // allowed value, so this one entry sets it site-wide; it is also the only quality the
    // /_next/image endpoint accepts. Images are still resized per screen and sent as AVIF/WebP.
    qualities: [90],
    // Only this Sanity project's images (audit N-S8: any cdn.sanity.io path was accepted, so
    // anyone could use this site's billed optimizer for other Sanity customers' images).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: `/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "3fkk9bs9"}/**`,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          ...securityHeaders,
          { key: "Content-Security-Policy", value: baseCsp.join("; ") },
        ],
      },
      // Website pages: the full policy. Same header name in enforce mode, so it replaces the base
      // one above (Next keeps the last match); in report-only mode both are sent.
      {
        source: "/:path((?!studio(?:/|$)).*)",
        headers: [
          {
            key: cspReportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
            value: websiteCsp,
          },
        ],
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
    // Renamed service/hire/industry pages are NOT listed here: their old URLs 301 from the page
    // routes (sanity/lib/page-urls.ts: `redirectFrom` in the content file + the Studio document's
    // "Old URLs"), so a slug changed in Studio redirects without a deploy.
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
      // Old /services/<slug> and /hire-staff/<slug>: handled by app/(website)/services/[slug] and
      // hire-staff/[slug], which 301 straight to the page's live URL in one hop (2026-10-29: a
      // rule here sent them to /<old-slug>, which then redirected again to the renamed slug).
      // Old-site pages that are sections on the new site (2026-10-27 audit).
      // /contact is a real page again since 2026-10-27 (app/(website)/contact).
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/team", destination: "/about#team", permanent: true },
      // Old /solutions page (list of services) was a 404 on the new site (audit 2026-10-29).
      { source: "/solutions", destination: "/#services", permanent: true },
      // The old /meeting page only embedded Calendly.
      {
        source: "/meeting",
        destination:
          process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/xconcile/new-meeting",
        permanent: false,
      },
      // Old industry with no page in the redesign.
      { source: "/industries/industrial-niche", destination: "/industries", permanent: true },
      // Older iOS/Android versions probe these names when a page doesn't declare its icon
      // (audit N-SEO13: they were 404s). The site's touch icon is app/apple-icon.png.
      { source: "/apple-touch-icon.png", destination: "/apple-icon.png", permanent: true },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/apple-icon.png",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
