import Image from "next/image";

import { CheckItem } from "@/components/shared/check-item";
import { CtaLink } from "@/components/shared/cta";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Parallax } from "@/components/motion/parallax";
import type { HeroContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B1 Hero. Mobile: centred, one full-width CTA, two checks. Desktop: left-aligned, two CTAs,
 * three checks, faded X watermark (parallax) + green glow.
 * Entrance uses CSS (starts at first paint) so the LCP text is never held back by JS.
 */
/** `variant="inner"`: inner-page spacing (audit design: 743px tall, content at 224px). */
/**
 * `wide` (Hire design): 871px text column with an 857px subtitle and content at 232px, so the
 * longer H1 wraps on two lines as drawn. Same 743px hero height.
 */
export function Hero({
  data,
  variant = "home",
  wide = false,
  className,
  subtitleClassName,
}: {
  data: HeroContent;
  variant?: "home" | "inner";
  wide?: boolean;
  /** Spacing overrides for the content container (e.g. Industry: `lg:pt-[232px] lg:pb-[91px]`). */
  className?: string;
  /** e.g. `lg:max-w-[631px]` (Industry design). */
  subtitleClassName?: string;
}) {
  const rise = (delay: number) => ({ animationDelay: `${delay}ms` });

  return (
    <section id={sectionId(data, "hero")} aria-labelledby="hero-title" className="relative overflow-hidden bg-dark-gradient">
      {/* Decorative: green glow (Figma Ellipse 12, blur 270) + X watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(640px_420px_at_100%_620px,var(--color-brand-glow),transparent_72%)] lg:block"
      />
      <Parallax
        amount={10}
        className="pointer-events-none absolute top-[323px] right-[max(72px,calc((100vw-1296px)/2))] hidden lg:block"
      >
        <Image src="/images/home/hero-x.svg" alt="" width={282} height={254} unoptimized />
      </Parallax>

      <div
        className={cn(
          "container-site relative pt-[47px] pb-[41px]",
          wide
            ? "lg:pt-[232px] lg:pb-[91px]"
            : variant === "inner"
              ? "lg:pt-[224px] lg:pb-[123px]"
              : "lg:pt-[208px] lg:pb-[107px]",
          className,
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[359px] flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left",
            // Tablet 768–1023: 560px text column instead of the 359px phone width (audit L7a on
            // Home; every page since 2026-10-18, audit L4).
            "md:max-w-[560px]",
            wide ? "lg:max-w-[871px]" : "lg:max-w-[753px]",
          )}
        >
          <div className="flex flex-col items-center gap-4 lg:items-start">
            {/* Below 360px: 12px side padding so the nowrap badge fits the 288px column (audit L1). */}
            <Eyebrow tone="hero" className="animate-hero-rise max-[360px]:px-3" >
              {data.badge}
            </Eyebrow>
            {/* LCP element: transform-only entrance (no opacity fade), see --animate-hero-lift */}
            <h1
              id="hero-title"
              className="animate-hero-lift text-h1-m text-white lg:text-h1"
            >
              {data.title.before}{" "}
              {data.title.highlight ? <span className="text-brand">{data.title.highlight}</span> : null}
              {/* Both designs break the H1 here (after the green word on Home) */}
              {data.title.after ? (
                data.title.inline ? (
                  ` ${data.title.after}`
                ) : (
                  <>
                    <br />
                    {data.title.after}
                  </>
                )
              ) : null}
            </h1>
            <p
              className={cn(
                "animate-hero-rise text-b1 font-normal text-on-dark lg:text-b3-tight",
                wide ? "lg:max-w-[857px]" : "lg:max-w-[746px]",
                subtitleClassName,
              )}
              style={rise(120)}
            >
              {data.subtitle}
            </p>
          </div>

          <div
            // md: centred, label-sized CTA on tablets (audit L4); phones keep the full-width pill.
            className="mt-8 flex w-full animate-hero-rise flex-col gap-8 md:items-center lg:mt-10 lg:w-auto lg:flex-row lg:items-stretch"
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
                className="hidden hover:bg-[#FFFFFF] hover:text-brand dark:hover:bg-[#FFFFFF] dark:hover:text-brand lg:inline-flex"
              >
                {data.secondaryCta.label}
              </CtaLink>
            ) : null}
          </div>

          <ul
            className={cn(
              "mt-6 flex animate-hero-rise flex-wrap justify-center gap-x-4 gap-y-2 text-b2 leading-6 font-medium text-[#fafafa] lg:justify-start",
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
        </div>
      </div>
    </section>
  );
}
