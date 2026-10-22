import Image from "next/image";
import Link from "next/link";

import { ScheduleMeetingButton } from "@/components/calendly/schedule-meeting-button";
import { getSiteSettings } from "@/sanity/lib/site-settings";

import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";
import { SidePanel } from "./side-panel";

/**
 * Mobile (<lg): sticky white bar, colour logo + hamburger (mobile design).
 * Desktop (lg+): floating pill (desktop design: 1296×68, top 32, radius 44), FIXED so it stays in
 * place for the whole scroll (client request 2026-10-14). Since 2026-10-22 (client request) it is
 * solid white with the coloured logo and dark links, replacing the design's dark pill + white
 * logo: the teal wordmark was unreadable on a dark backing, and translucent white read as dull
 * grey over the dark hero. Hairline border + soft shadow define it over white sections, so
 * desktop now matches the mobile bar. Identical on every page (incl. 404).
 *
 * Menus, the menu promo card and the button label: Sanity Site Settings (sanity/lib/site-settings.ts).
 */
export async function SiteHeader() {
  const { header, sidePanel, social } = await getSiteSettings();
  return (
    <header className="sticky top-0 z-50 bg-white lg:fixed lg:inset-x-0 lg:top-8 lg:bg-transparent">
      {/* Mobile bar */}
      <div className="flex h-[68px] items-center justify-between pr-2 pl-4 md:pr-6 md:pl-8 lg:hidden">
        {/* before:*: invisible 44px-tall tap area around the 40px logo (no visual change). */}
        <Link href="/" aria-label="Xconcile home" className="relative shrink-0 before:absolute before:inset-x-0 before:-inset-y-0.5">
          <Image
            src="/images/brand/logo-color.svg"
            alt="Xconcile"
            width={187}
            height={41}
            priority
            unoptimized
            className="h-10 w-auto"
          />
        </Link>
        <MobileMenu items={header.menus} ctaLabel={header.ctaLabel} tone="dark" />
      </div>

      {/* Desktop pill */}
      <div className="container-site hidden lg:block">
        {/* Backing colour lives in globals.css (--color-header-pill); `--header-fg` is the link
            colour inside (desktop-nav.tsx reads it). Light tone since 2026-10-22; history in the token. */}
        <div className="flex h-[68px] items-center justify-between gap-6 rounded-[44px] border border-hairline bg-header-pill px-8 shadow-[0_8px_24px_rgb(19_33_44/0.40)] [--header-fg:var(--color-heading)]">
          <Link href="/" aria-label="Xconcile home" className="relative shrink-0 before:absolute before:inset-x-0 before:-inset-y-0.5">
            <Image
              src="/images/brand/logo-color.svg"
              alt="Xconcile"
              width={187}
              height={41}
              priority
              unoptimized
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-10">
            <div className="hidden xl:block">
              <DesktopNav items={header.menus} promo={header.promo} />
            </div>
            <div className="flex items-center gap-6">
              <ScheduleMeetingButton>{header.ctaLabel}</ScheduleMeetingButton>
              {/* The nav links show from xl; there the hamburger opens the About side panel
                  (client request 2026-10-22). Below xl it still opens the navigation menu. */}
              <MobileMenu items={header.menus} ctaLabel={header.ctaLabel} tone="dark" className="-mr-2.5 xl:hidden" />
              <SidePanel data={sidePanel} social={social} className="-mr-2.5 hidden xl:flex" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
