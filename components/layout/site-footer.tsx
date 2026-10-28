import Image from "next/image";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  YouTubeIcon,
} from "@/components/icons/brand-icons";
import { CallIcon, MailIcon } from "@/components/icons/material-symbols";
import { getSiteSettings, type SocialPlatform } from "@/sanity/lib/site-settings";
import { CopyrightYear } from "./copyright-year";

const socialIcons: Record<
  SocialPlatform,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  pinterest: PinterestIcon,
  youtube: YouTubeIcon,
};

/**
 * Footer: teal #012B35 (`bg-footer`, desktop design colour) on every screen (user request
 * 2026-10-25; the mobile design's #173345 was briefly used everywhere earlier that day).
 * Mobile keeps its stacked columns + phones (mobile design). Typography: Outfit.
 * Server-rendered so all links are crawlable.
 *
 * Description, link columns, badges, contact details, offices, social links and the copyright
 * name are edited in Sanity Studio -> Site Settings (`siteSettings`).
 */
export async function SiteFooter() {
  const { footer, contact, offices, social } = await getSiteSettings();

  return (
    // -mt-px: the footer tucks 1px under the section above. At 125% / 150% display scaling the
    // dark CTA band and the footer met in the middle of a device pixel, each covering part of it,
    // and the white page showed through as a light line (user report 2026-10-27). The CTA band
    // paints above the footer (it's positioned), so the overlap hides nothing.
    <footer className="-mt-px bg-footer font-display text-white">
      <div className="container-site pt-12 lg:pt-[71px]">
        {/* Row 1: brand + link columns. Mobile/tablet: 48px between groups (user request
            2026-10-18; was 24px, the same as the link spacing, so groups ran together). */}
        <div className="flex flex-col gap-12 lg:gap-6 xl:flex-row xl:justify-between xl:gap-10">
          <div className="flex flex-col gap-10 lg:gap-6 xl:w-[348px]">
            <div className="flex flex-col gap-4">
              <Link href="/" aria-label="Xconcile home" className="w-fit">
                <Image
                  src="/images/brand/logo-white.png"
                  alt="Xconcile"
                  width={256}
                  height={88}
                  className="h-12 w-auto"
                />
              </Link>
              {/* Fills its column at every width (user requests 2026-10-24: the 336/254px caps left
                  an empty band on tablets and ~94px unused in the 348px desktop column). */}
              <p className="text-b1 leading-5 font-medium text-footer-text">{footer.description}</p>
            </div>
            <ul className="flex flex-col gap-6 font-sans text-b2 font-medium">
              {/* Studio → Footer → Show phone numbers. Every screen size (user request 2026-10-26;
                  they were drawn in the mobile footer only). */}
              {(footer.showPhones ? contact.phones : []).map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="relative flex items-center gap-3 before:absolute before:inset-x-0 before:-inset-y-2.5 hover:text-brand"
                  >
                    <CallIcon className="size-6" />({p.label}) {p.display}
                  </a>
                </li>
              ))}
              <li>
                {/* before:*: invisible 44px-tall tap areas on the footer links/icons (no visual change). */}
                <a
                  href={`mailto:${contact.email}`}
                  className="relative flex items-center gap-3 before:absolute before:inset-x-0 before:-inset-y-2.5 hover:text-brand"
                >
                  <MailIcon className="size-6" />
                  {contact.email}
                </a>
              </li>
            </ul>
            {/* Certification badges: every breakpoint (user request 2026-10-24; the mobile design
                omits them). Always one row: below ~330px the badges shrink proportionally instead
                of wrapping (a wrapped Xero badge sat alone and out of line, user report 2026-10-24). */}
            <ul className="flex items-center gap-3 sm:gap-4" aria-label="Certifications">
              {footer.badges.map((b) => (
                <li key={b.src} className="min-w-0">
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={b.size}
                    height={b.size}
                    className="h-auto max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-12 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:mt-6 lg:grid-cols-4 xl:mt-0 xl:flex xl:flex-row xl:gap-[85px]"
          >
            {footer.columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-8">
                <h2 className="font-display text-[24px] leading-[30px] font-semibold text-[#f5f5f5]">
                  {col.title}
                </h2>
                {/* Same 24px rhythm in every column so rows align (client request 2026-10-22; the
                    design drew Company with 30px). Links 14px (client note 2026-10-27; was 16px). */}
                <ul className="flex flex-col gap-6">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="relative block w-fit text-b2 leading-5 font-medium text-footer-text transition-colors before:absolute before:inset-x-0 before:-inset-y-3 hover:text-brand xl:whitespace-nowrap"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Row 2: social + offices */}
        <div className="mt-12 flex flex-col gap-6 border-[rgb(242_242_242/0.2)] py-8 lg:mt-10 lg:border-t lg:py-6 xl:mt-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex items-center gap-4">
            <p className="text-b1 leading-5 font-medium">Follow us</p>
            <ul className="flex items-center gap-3.5">
              {social.map((s, i) => {
                const Icon = socialIcons[s.platform];
                return (
                  <li key={`${s.platform}-${i}`}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Xconcile on ${s.label}`}
                      className="relative flex size-10 items-center justify-center rounded-full bg-[rgb(250_250_250/0.04)] transition-colors before:absolute before:-inset-0.5 hover:bg-brand"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <ul className="flex flex-col gap-6 border-t border-[rgb(242_242_242/0.2)] pt-14 lg:flex-row lg:gap-[33px] lg:border-t-0 lg:pt-0">
            {offices.map((o) => (
              <li
                key={o.name}
                className="flex min-h-[158px] flex-col gap-6 rounded-md bg-white/4 px-[19px] py-[17px] lg:min-h-[178px] lg:w-[315px]"
              >
                <p className="flex items-center gap-3 text-stat-sm font-semibold">
                  {/* Height attrs = the height the browser actually renders (CSS height:auto keeps the
                      SVG ratio: 48x32.5 / 40x26.3), so next/image no longer warns. Drawing unchanged. */}
                  <Image
                    src={`/images/flags/${o.country}.svg`}
                    alt=""
                    width={o.country === "in" ? 48 : 40}
                    height={o.country === "in" ? 33 : 26}
                    unoptimized
                  />
                  {o.name}
                </p>
                <address className="text-b1 leading-5 font-medium text-on-dark not-italic">
                  {o.lines}
                </address>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 3: copyright. */}
        <div className="border-t border-[rgb(242_242_242/0.2)] py-6 text-center">
          <p className="text-b2 leading-[18px] font-medium text-on-dark">
            © <CopyrightYear /> {footer.copyrightName} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
