import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ArrowBackIcon } from "@/components/icons/material-symbols";
import { ResetScroll } from "@/components/shared/reset-scroll";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/lib/section-ids";
import { getNotFoundPage } from "@/sanity/lib/not-found";

// Next also adds <meta name="robots" content="noindex"> and a 404 status for this page; the
// explicit robots entry replaces the root layout's "index, follow" so the tags don't conflict.
// Title/description: Studio → 404 Page → SEO (fallback: content/not-found.ts).
export async function generateNotFoundMetadata(): Promise<Metadata> {
  const { seo } = await getNotFoundPage();
  return {
    title: seo.title,
    description: seo.description,
    // Same value Next adds itself to 404 responses, so the page has no conflicting robots tags.
    robots: { index: false },
    // Audit N-SEO11: don't inherit the root layout's Home canonical / og:url on a 404.
    alternates: { canonical: null },
    openGraph: { title: seo.title, description: seo.description, siteName: "Xconcile" },
  };
}

/**
 * 404 page body (`../pages svg, css & png/404`). Chrome-free: rendered by
 * `app/(website)/not-found.tsx` (inside the site layout) and `app/not-found.tsx` (wraps it in
 * <SiteShell /> for unmatched URLs). Never add the header/footer here, or they render twice.
 *
 * Desktop (lg) follows the 1440 design: content column 831px, top 135px, illustration
 * 563×285, gaps 56 / 40 / 24, H1 56/62, copy "mobile H4" 18/24 600, green 326×48 button
 * (radius 8, arrow_back 20px + 14/20 500 label).
 * Mobile (base) has no design: the same stack with the mobile type tokens (H1 = h2-m 28/36)
 * and gaps scaled to the mobile rhythm.
 *
 * The desktop header is the same fixed white-logo pill as on every other page (its navy
 * backing keeps it legible on this white page); the 135px top clears it. <ResetScroll />:
 * a client navigation that ends here keeps the previous page's scroll position in Next, which
 * hid the top of this page under the header; it scrolls back to the top on open.
 */
export async function NotFoundContent() {
  // Studio → 404 Page; any empty field falls back to content/not-found.ts.
  const { illustration, title, body, cta } = await getNotFoundPage();

  return (
    <section
      id={SECTION_IDS.notFound}
      aria-labelledby="not-found-title"
      // Top space (client request 2026-10-17, "more distance from the navbar"): 80px under the
      // in-flow mobile bar, 96px on tablet, desktop = fixed-pill clearance (116) + 96 = 212px
      // (was 135px, only 35px below the pill).
      className="container-site flex flex-col items-center pt-20 pb-16 text-center md:pt-24 lg:pt-[calc(var(--spacing-header-offset)+6rem)] lg:pb-[135px]"
    >
      <ResetScroll />
      <div className="flex w-full max-w-[831px] flex-col items-center gap-8 lg:gap-14">
        <Image
          src={illustration.src}
          alt=""
          width={illustration.width}
          height={illustration.height}
          priority
          unoptimized
          // Short laptop screens (≥1024 wide, ≤800 tall): 400px so the button stays above the fold (audit M3).
          className="h-auto w-full max-w-[563px] lg:[@media(max-height:800px)]:max-w-[400px]"
        />

        <div className="flex w-full flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1
              id="not-found-title"
              className="text-h1-m text-heading lg:text-h1 lg:leading-[62px]"
            >
              {title}
            </h1>
            <p className="text-h4-m text-body">
              {body[0]} <span className="lg:block lg:whitespace-nowrap">{body[1]}</span>
            </p>
          </div>

          <Button
            asChild
            className="h-12 w-full max-w-[326px] gap-2 rounded-md bg-brand px-8 py-2.5 text-b2 font-medium text-white hover:bg-brand/90"
          >
            <Link href={cta.href}>
              <ArrowBackIcon className="size-5" />
              {cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
