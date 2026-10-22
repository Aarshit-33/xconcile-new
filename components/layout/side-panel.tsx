"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { FacebookIcon, InstagramIcon, LinkedInIcon, MenuBarsIcon, PinterestIcon, YouTubeIcon } from "@/components/icons/brand-icons";
import { CallIcon, CloseIcon, LocationOnIcon, MailIcon } from "@/components/icons/material-symbols";
import { CtaLink } from "@/components/shared/cta";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { SidePanel as SidePanelData, SocialLink, SocialPlatform } from "@/sanity/lib/site-settings";

const socialIcons: Record<SocialPlatform, (props: React.SVGProps<SVGSVGElement>) => React.ReactNode> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  pinterest: PinterestIcon,
  youtube: YouTubeIcon,
};

/**
 * Desktop side panel (client request 2026-10-22; design: pages svg/Home/home-sidepanel.svg):
 * the hamburger at the right of the navbar pill opens this "About Us" panel from xl, where the
 * navigation links are visible in the pill. Below xl that hamburger keeps opening the navigation
 * menu (MobileMenu). Content: Sanity Site Settings -> Side panel; phone, email, address and social
 * icons come from the Contact & Offices / Social media tabs.
 *
 * Layout follows the design (306px drawn; 360px here so the address fits on one line) with one
 * fix: the contact rows and social icons share the 32px left edge of everything else (the export
 * had them at x=9-11, out of line with the logo and copy).
 */
export function SidePanel({
  data,
  social,
  className,
}: {
  data: SidePanelData;
  social: SocialLink[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open about panel"
        className={cn(
          "flex size-11 items-center justify-center rounded-md text-heading outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          className,
        )}
      >
        <MenuBarsIcon className="h-[18px] w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 overflow-y-auto border-l-0 bg-white p-8 data-[side=right]:w-full sm:data-[side=right]:max-w-[360px]"
      >
        <SheetTitle className="sr-only">{data.title}</SheetTitle>
        <SheetDescription className="sr-only">About Xconcile and how to reach us</SheetDescription>

        <div className="flex justify-end">
          <SheetClose
            aria-label="Close panel"
            className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-ink transition-colors outline-none hover:bg-brand-100 focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CloseIcon className="size-6" />
          </SheetClose>
        </div>

        <Link href="/" aria-label="Xconcile home" onClick={close} className="mt-[11px] w-fit">
          <Image src="/images/brand/logo-color.svg" alt="Xconcile" width={187} height={41} className="h-10 w-auto" unoptimized />
        </Link>

        <h2 className="mt-12 border-b border-hairline pb-4 text-h5 font-medium text-heading">{data.title}</h2>
        <p className="mt-6 text-b1 text-body">{data.body}</p>

        <div className="mt-8">
          <CtaLink href={data.cta.href} onClick={close}>
            {data.cta.label}
          </CtaLink>
        </div>

        <ul className="mt-11 flex flex-col gap-5 text-b2 text-body">
          {data.phone ? (
            <li>
              <a href={`tel:${data.phone.tel}`} className="flex items-center gap-3 transition-colors hover:text-brand">
                <CallIcon className="size-6 shrink-0 text-ink" />
                <span>
                  ({data.phone.label}) {data.phone.display}
                </span>
              </a>
            </li>
          ) : null}
          <li>
            <a href={`mailto:${data.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-brand">
              <MailIcon className="size-6 shrink-0 text-ink" />
              <span>{data.email}</span>
            </a>
          </li>
          {data.address ? (
            <li className="flex items-center gap-3">
              <LocationOnIcon className="size-6 shrink-0 text-ink" />
              <address className="not-italic">{data.address}</address>
            </li>
          ) : null}
        </ul>

        {social.length ? (
          <ul className="mt-6 flex flex-wrap gap-3.5" aria-label="Social media">
            {social.map((s, i) => {
              const Icon = socialIcons[s.platform];
              return (
                <li key={`${s.platform}-${i}`}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Xconcile on ${s.label}`}
                    className="flex size-10 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand/85"
                  >
                    <Icon className="size-5" />
                  </a>
                </li>
              );
            })}
          </ul>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
