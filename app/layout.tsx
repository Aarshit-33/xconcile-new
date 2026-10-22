import type { Metadata, Viewport } from "next";
import { Manrope, Outfit } from "next/font/google";
import Script from "next/script";

import { siteConfig } from "@/lib/site-config";

// Document shell shared by the public site and the embedded Studio (/studio).
// Site chrome + globals.css live in `app/(website)/layout.tsx` (via <SiteShell />) so the
// Studio renders bare, matching the old site's separate `(studio)` layout.

// Fonts from the Figma files. Manrope = primary, Outfit = footer / process titles / blog titles.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  // Only used below the fold (process/blog titles, footer): don't compete with the hero for
  // bandwidth in the LCP window. The size-adjusted fallback keeps the later swap shift-free.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.defaultTitle, template: siteConfig.titleTemplate },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: { canonical: "/" },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: { google: siteConfig.googleSiteVerification },
};

export const viewport: Viewport = {
  themeColor: "#13212C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior="smooth": globals.css sets smooth scrolling for #anchor links; this
    // tells Next 16 to switch it off while it scrolls a newly navigated page to the top, so a
    // new page opens at the top instantly instead of visibly scrolling up from the old position.
    <html
      lang={siteConfig.lang}
      className={`${manrope.variable} ${outfit.variable}`}
      data-scroll-behavior="smooth"
    >
      {/* `margin: 0` as in the old studio layout; the site's globals.css preflight does the same. */}
      <body className="flex min-h-svh flex-col" style={{ margin: 0 }}>
        {/* GTM Consent Mode v2: denied by default; restores a choice saved by <CookieConsent />.
            `beforeInteractive` must sit in the root layout. It only seeds dataLayer: GTM itself
            loads from <SiteShell />, so nothing is tracked on /studio. */}
        <Script id="gtm-consent-default" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var c='denied';try{if(localStorage.getItem('xc-consent')==='granted')c='granted'}catch(e){}
gtag('consent','default',{ad_storage:c,ad_user_data:c,ad_personalization:c,analytics_storage:c,wait_for_update:500});`}
        </Script>
        {children}
      </body>
    </html>
  );
}
