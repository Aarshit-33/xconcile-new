import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CalendlyProvider } from "@/components/calendly/calendly-provider";
import { BackToTop } from "@/components/layout/back-to-top";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/sanity/lib/site-settings";

/**
 * Site cookie banner switched off for now (client request 2026-10-17): only Zoho SalesIQ's own
 * cookie banner is shown. Set to `true` to bring <CookieConsent /> back. While it is off, Google
 * Consent Mode keeps its "denied" default from app/layout.tsx for new visitors.
 */
const SHOW_SITE_COOKIE_BANNER = false;

/**
 * Public-site chrome: GTM, Org/WebSite JSON-LD, skip link, header/footer, cookie banner,
 * Vercel Analytics, Speed Insights and Zoho chat. Used by `app/(website)/layout.tsx` and
 * `app/not-found.tsx`.
 *
 * Kept out of the root layout so `/studio` renders bare, like the old site's separate
 * `(studio)` layout: no site header/footer, tracking, chat widget or `globals.css` in the CMS.
 */
export async function SiteShell({ children }: { children: React.ReactNode }) {
  // Calendly link + Organization data (contact, offices, social) from Sanity Site Settings.
  const settings = await getSiteSettings();
  return (
    <>
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${siteConfig.gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      <JsonLd data={[organizationJsonLd(settings), websiteJsonLd()]} />

      <a
        href="#main"
        className="sr-only rounded-pill bg-brand px-5 py-3 text-b2 font-medium text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]"
      >
        Skip to content
      </a>

      <CalendlyProvider url={settings.calendlyUrl}>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
        {SHOW_SITE_COOKIE_BANNER ? <CookieConsent /> : null}
      </CalendlyProvider>

      <SpeedInsights />
      <Analytics />

      {/* Zoho SalesIQ chat (kept from old site). Loaded lazily to protect INP/LCP. */}
      <Script id="zoho-salesiq-init" strategy="lazyOnload">
        {`window.$zoho=window.$zoho||{};window.$zoho.salesiq=window.$zoho.salesiq||{ready:function(){}};`}
      </Script>
      <Script
        id="zoho-salesiq-widget"
        src={siteConfig.zohoSalesIqWidgetUrl}
        strategy="lazyOnload"
      />
    </>
  );
}
