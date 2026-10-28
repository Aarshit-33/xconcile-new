/**
 * The one canonical origin (client requirement 2026-10-27: https://xconcile.com/ is preferred).
 * Normalised so a mistyped NEXT_PUBLIC_SITE_URL (http://, www., trailing slash) can never leak
 * a second version of the site into canonicals, the sitemap or structured data. Localhost keeps
 * its scheme so local builds work. The other host/scheme variants are redirected by Vercel
 * (Domains: www.xconcile.com → xconcile.com, HTTP → HTTPS) plus next.config.ts as a backup.
 */
function canonicalOrigin(raw: string): string {
  try {
    const u = new URL(/^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`);
    const local = u.hostname === "localhost" || u.hostname === "127.0.0.1";
    return `${local ? u.protocol : "https:"}//${u.host.replace(/^www\./, "")}`;
  } catch {
    return "https://xconcile.com";
  }
}

/**
 * Global site constants. Single source of truth for NAP data and third-party IDs.
 * NAP comes from the footer design (desktop + mobile) and social links from the live
 * site's Sanity `settings` document. Never reintroduce the old site's placeholder data.
 * The footer blurb, contact details, offices, social links and Calendly link are edited in
 * Sanity Site Settings (sanity/lib/site-settings.ts); the values here are the fallbacks for when
 * Sanity is empty or down, and the seed source (scripts/seed-site-settings-sanity.ts).
 */
export const siteConfig = {
  name: "Xconcile",
  legalName: "Xconcile Inc.",
  /** `https://xconcile.com` (no trailing slash). Build URLs with `absoluteUrl` (lib/routes.ts). */
  url: canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL || "https://xconcile.com"),
  locale: "en_US",
  lang: "en-US",
  titleTemplate: "%s | Xconcile",
  defaultTitle: "Xconcile | Outsourced Accounting & Bookkeeping for U.S. Businesses and CPA Firms",
  defaultDescription:
    "Xconcile provides outsourced accounting and bookkeeping, tax preparation, payroll, sales tax compliance, audit support, and Virtual CFO & FP&A services for U.S. businesses and CPA firms.",
  ogImage: "/og-image.png",
  logo: "/logo_autocropped.png",
  footerBlurb:
    "We are a trusted outsourced accounting partner, helping businesses simplify their financial operations through expert accounting, bookkeeping, payroll, tax, and finance solutions",

  // Kept from the old site (see docs/design/xconcile_redesign_report.md §5.6).
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-WRRFT9ZZ",
  googleSiteVerification: "zzIyWkg7jUhAgdRPn1TfTvBUkaG3cB5dIuXgsK4Dv9A",
  zohoSalesIqWidgetUrl:
    "https://salesiq.zohopublic.in/widget?wc=siq8a0dcfe4029b2bfa13fa6838399d6a0aa78afa63c2632cef8ededcc2ea45caec",
  // Live booking page used by the old /meeting route. Opened in a popup (client rule).
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/xconcile/new-meeting",

  contact: {
    email: "connect@xconcile.com",
    // Drawn in the mobile footer design only.
    phones: [
      { label: "Sales", display: "+91 798 494-9224", tel: "+917984949224" },
      { label: "HR", display: "+91 635 104-3147", tel: "+916351043147" },
    ],
  },

  offices: [
    {
      name: "India",
      country: "in" as const,
      lines:
        "Sun orbit, 606, Rajpath Rangoli Rd, near Nayara petrol pump, PRL Colony, Bodakdev, Ahmedabad, Gujarat 380059",
      streetAddress:
        "Sun Orbit, 606, Rajpath Rangoli Rd, near Nayara petrol pump, PRL Colony, Bodakdev",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380059",
      addressCountry: "IN",
    },
    {
      name: "USA",
      country: "us" as const,
      lines: "10 Heston Ave South Amboy, NJ 08879",
      streetAddress: "10 Heston Ave",
      addressLocality: "South Amboy",
      addressRegion: "NJ",
      postalCode: "08879",
      addressCountry: "US",
    },
  ],

  /** Order as drawn: Facebook, Instagram, LinkedIn, Pinterest, YouTube. Empty URL = hidden. */
  social: [
    { platform: "facebook", label: "Facebook", url: "https://www.facebook.com/Xconcile/" },
    { platform: "instagram", label: "Instagram", url: "https://www.instagram.com/xconcile_inc/" },
    {
      platform: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/company/xconcile-us/",
    },
    // TODO(client): Pinterest is drawn but no profile URL exists on the live site.
    { platform: "pinterest", label: "Pinterest", url: "" },
    { platform: "youtube", label: "YouTube", url: "https://www.youtube.com/@XconcileInc" },
  ] as const,

  /** Certification badges in the desktop footer (files in public/). `size` = rendered square, px. */
  footerBadges: [
    {
      src: "/images/badges/intuit-bookkeeping.png",
      alt: "Intuit Bookkeeping Trained badge",
      size: 100,
    },
    {
      src: "/images/badges/intuit-proadvisor.png",
      alt: "Intuit ProAdvisor Client Advisory Services Foundations badge",
      size: 100,
    },
    {
      src: "/images/badges/xero-certified.png",
      alt: "Xero L1 Certified Associate badge",
      size: 80,
    },
  ],
} as const;
