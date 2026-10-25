import Image from "next/image";

import { CheckItem } from "@/components/shared/check-item";
import { CtaLink } from "@/components/shared/cta";
import { Eyebrow } from "@/components/shared/eyebrow";
import { HighlightText } from "@/components/shared/highlight-text";
import { Parallax } from "@/components/motion/parallax";
import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B1 Hero. Mobile: centred, one full-width CTA, two checks. Desktop: left-aligned, two CTAs,
 * three checks, faded X watermark (parallax). Green glow on every screen.
 * Entrance uses CSS (starts at first paint) so the LCP text is never held back by JS.
 */
/** `variant="inner"`: inner-page spacing (audit design: 743px tall, content at 224px). */
/**
 * `wide` (Hire design): 871px text column with an 857px subtitle and content at 232px, so the
 * longer H1 wraps on two lines as drawn. Same 743px hero height.
 */
/**
 * `align="center"` (About design): badge, H1, subtitle and buttons centred at every width, no X
 * watermark, 616px desktop hero (content at 195px). Pages without checks get no checklist.
 */
export function Hero({
  data,
  variant = "home",
  wide = false,
  align = "left",
  className,
  subtitleClassName,
}: {
  data: HeroContent;
  variant?: "home" | "inner";
  wide?: boolean;
  align?: "left" | "center";
  /** Spacing overrides for the content container (e.g. Industry: `lg:pt-[232px] lg:pb-[91px]`). */
  className?: string;
  /** e.g. `lg:max-w-[631px]` (Industry design). */
  subtitleClassName?: string;
}) {
  const rise = (delay: number) => ({ animationDelay: `${delay}ms` });
  const center = align === "center";

  return (
    <section id={sectionId(data, "hero")} aria-labelledby="hero-title" className="relative overflow-hidden bg-dark-gradient">
      {/* Decorative: green glow (Figma Ellipse 12, blur 270) + X watermark. The glow shows on every
          screen (user request 2026-10-25; was desktop-only): phones and tablets get a smaller
          ellipse at the same relative spot (right edge, ~84% down = 620px of the 743px desktop
          hero); desktop keeps the drawn 640x420 ellipse at 620px. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_300px_at_100%_84%,var(--color-brand-glow),transparent_72%)] md:bg-[radial-gradient(520px_360px_at_100%_84%,var(--color-brand-glow),transparent_72%)] lg:bg-[radial-gradient(640px_420px_at_100%_620px,var(--color-brand-glow),transparent_72%)]"
      />
      <Parallax
        amount={10}
        className={cn(
          "pointer-events-none absolute top-[323px] right-[max(72px,calc((100vw-1296px)/2))] hidden",
          !center && "lg:block",
        )}
      >
        <Image src="/images/home/hero-x.svg" alt="" width={282} height={254} unoptimized />
      </Parallax>

      <div
        className={cn(
          "container-site relative pt-[47px] pb-[41px]",
          center
            ? "lg:pt-[195px] lg:pb-[145px]"
            : wide
              ? "lg:pt-[232px] lg:pb-[91px]"
              : variant === "inner"
                ? "lg:pt-[224px] lg:pb-[123px]"
                : "lg:pt-[208px] lg:pb-[107px]",
          className,
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[359px] flex-col items-center text-center",
            !center && "lg:mx-0 lg:items-start lg:text-left",
            // Tablet 768–1023: 560px text column instead of the 359px phone width (audit L7a on
            // Home; every page since 2026-10-18, audit L4).
            "md:max-w-[560px]",
            wide ? "lg:max-w-[871px]" : "lg:max-w-[753px]",
          )}
        >
          <div className={cn("flex flex-col items-center gap-4", !center && "lg:items-start")}>
            {/* Below 360px: 12px side padding so the nowrap badge fits the 288px column (audit L1). */}
            <Eyebrow tone="hero" className="animate-hero-rise max-[360px]:px-3" >
              {data.badge}
            </Eyebrow>
            {/* LCP element: transform-only entrance (no opacity fade), see --animate-hero-lift */}
            <h1
              id="hero-title"
              className="animate-hero-lift text-h1-m text-white lg:text-h1"
            >
              {/* One string, `*green*` markup; flows as one line and wraps naturally. */}
              <HighlightText text={data.title} />
            </h1>
            <p
              className={cn(
                "animate-hero-rise text-b1 font-normal text-on-dark lg:text-b3-tight",
                wide ? "lg:max-w-[857px]" : center ? "lg:max-w-[660px]" : "lg:max-w-[746px]",
                subtitleClassName,
              )}
              style={rise(120)}
            >
              {data.subtitle}
            </p>
          </div>

          <div
            // md: centred, label-sized CTAs on tablets (audit L4); phones keep full-width pills,
            // stacked 16px apart. The secondary button shows on every screen (user request
            // 2026-10-25; it was desktop-only).
            className={cn(
              "mt-8 flex w-full animate-hero-rise flex-col gap-4 md:flex-row md:justify-center lg:mt-10 lg:w-auto lg:items-stretch lg:gap-8",
              !center && "lg:justify-start",
            )}
            style={rise(220)}
          >
            <CtaLink href={data.primaryCta.href} block className="w-full md:w-auto">
              {data.primaryCta.label}
            </CtaLink>
            {data.secondaryCta ? (
              <CtaLink
                href={data.secondaryCta.href}
                variant="outline-dark"
                // Hover: solid #FFFFFF + green label (client request 2026-10-14; was white/10).
                className="w-full justify-center hover:bg-[#FFFFFF] hover:text-brand md:w-auto dark:hover:bg-[#FFFFFF] dark:hover:text-brand"
              >
                {data.secondaryCta.label}
              </CtaLink>
            ) : null}
          </div>

          {data.checks.length ? (
            <ul
              className={cn(
                "mt-6 flex animate-hero-rise flex-wrap justify-center gap-x-4 gap-y-2 text-b2 leading-6 font-medium text-[#fafafa]",
                !center && "lg:justify-start",
                variant === "inner" ? "lg:mt-6" : "lg:mt-8",
              )}
              style={rise(320)}
            >
              {data.checks.map((c) => (
                <CheckItem key={c.label} className={cn(c.desktopOnly && "hidden lg:flex")}>
                  {c.label}
                </CheckItem>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}
