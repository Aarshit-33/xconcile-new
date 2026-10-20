import Image from "next/image";
import Link from "next/link";

import { ScheduleMeetingButton } from "@/components/calendly/schedule-meeting-button";
import { getSiteSettings } from "@/sanity/lib/site-settings";

import { DesktopNav } from "./desktop-nav";
import { MobileMenu } from "./mobile-menu";

/**
 * Mobile (<lg): sticky white bar, colour logo + hamburger (mobile design).
 * Desktop (lg+): floating pill (desktop design: 1296×68, top 32, radius 44, white logo + white
 * links), FIXED so it stays in place for the whole scroll (client request 2026-10-14). The
 * drawn 6%-white fill is layered over a navy backing + blur, so it looks as drawn on the dark
 * hero and stays legible over white sections. Identical on every page (incl. 404).
 *
 * Menus, the menu promo card and the button label: Sanity Site Settings (sanity/lib/site-settings.ts).
 */
export async function SiteHeader() {
  const { header } = await getSiteSettings();
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
        {/* Navy backing 0.82 (was 0.94): slightly see-through, client request 2026-10-16. */}
        <div className="flex h-[68px] items-center justify-between gap-6 rounded-[44px] border border-brand-faint bg-[rgb(18_18_18/0.7)] px-8 shadow-[0_8px_24px_rgb(19_33_44/0.12)] backdrop-blur-md [--header-fg:var(--color-white)]">
          <Link href="/" aria-label="Xconcile home" className="relative shrink-0 before:absolute before:inset-x-0 before:-inset-y-0.5">
            <Image
              src="/images/brand/logo-white.png"
              alt="Xconcile"
              width={256}
              height={88}
              priority
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex items-center gap-10">
            <div className="hidden xl:block">
              <DesktopNav items={header.menus} promo={header.promo} />
            </div>
            <div className="flex items-center gap-6">
              <ScheduleMeetingButton>{header.ctaLabel}</ScheduleMeetingButton>
              <MobileMenu items={header.menus} ctaLabel={header.ctaLabel} tone="light" className="-mr-2.5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
