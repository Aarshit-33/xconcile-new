import Image from "next/image";
import Link from "next/link";

import { ArrowRightAltIcon } from "@/components/icons/material-symbols";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { IndustriesContent } from "@/content/types";
import { plainTitle } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B11 Industries. Mobile: centred heading, snap rail of 306px cards + progress bar, then the CTA
 * centred below (user request 2026-10-25; not drawn on mobile). Desktop: left-aligned heading with
 * an outline CTA on the right, four cards.
 * Each card is one link (title, copy, photo) to its industry page.
 */
/** `headingAlign="center"`: heading centred on desktop too (designs without the CTA, e.g. audit). */
export function Industries({
  data,
  headingAlign = "responsive",
  className,
}: {
  data: IndustriesContent;
  headingAlign?: "responsive" | "center";
  /** Spacing overrides, e.g. `pt-0 lg:pt-0` after another white section (Industries gallery). */
  className?: string;
}) {
  return (
    <section id={sectionId(data, "industries")} aria-labelledby="industries-title" className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId="industries-title"
            subtitle={data.subtitle}
            align={headingAlign}
            className={headingAlign === "center" ? "mx-auto lg:max-w-[900px]" : "lg:max-w-[900px]"}
            subtitleClassName="lg:max-w-[776px]"
          />
          {data.cta.href ? (
            <CtaLink href={data.cta.href} variant="outline" className="hidden shrink-0 lg:inline-flex">
              {data.cta.label}
            </CtaLink>
          ) : null}
        </div>

        {/* Each whole card (title row, copy and photo) rises via the Rail's RevealList
            (whole-card motion since 2026-10-22). */}
        <Rail
          label={plainTitle(data.title)}
          listClassName="grid grid-flow-col grid-rows-[repeat(3,auto)] lg:grid-flow-row lg:grid-cols-4 lg:gap-6"
          reveal
        >
          {data.items.map((item) => {
            const card = (
              <>
                {/* contents: title row + text join the card's subgrid rows (see cardCls). */}
                <div className="contents">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-h5 text-heading-alt transition-colors group-hover:text-brand">{item.title}</h3>
                    <ArrowRightAltIcon className="size-6 shrink-0 text-heading-alt transition-colors group-hover:text-brand" />
                  </div>
                  {/* lg: -mt-2 / -mt-0.5 = the 24px row gap minus these = the 16px / 22px drawn
                      spacing. Rail: 16px row gap, +6px above the photo (= 22px). */}
                  <p className="text-b1 text-body-alt lg:-mt-2">{item.body}</p>
                </div>
                {/* Card photo: zoom only, on card hover (client request 2026-10-22). */}
                <div className="img-zoom relative mt-1.5 aspect-[274/146] overflow-hidden rounded-sm lg:-mt-0.5">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1440px) 274px, (min-width: 1024px) 20vw, 274px"
                    className="object-cover"
                  />
                </div>
              </>
            );
            // li and card are 3-row subgrids (title / text / photo) of the list (rail and 4-column
            // grid), so every title row takes the tallest title's height and the texts line up
            // (audit L5; on the phone rail too since 2026-10-25).
            const cardCls =
              "img-zoom-trigger row-span-3 grid w-full grid-rows-subgrid gap-y-[normal] rounded-md border border-hairline bg-white p-4 lg:border-[#d2d5da]";
            return (
              <li key={item.title} className="row-span-3 grid w-[306px] shrink-0 snap-start grid-rows-subgrid lg:w-auto">
                {item.href ? (
                  // Hover: title + arrow turn green; no background change (client request 2026-10-22).
                  <Link
                    href={item.href}
                    className={`group ${cardCls} focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none`}
                  >
                    {card}
                  </Link>
                ) : (
                  // No industry page yet: same card, not a link (no hover state).
                  <div className={cardCls}>{card}</div>
                )}
              </li>
            );
          })}
        </Rail>
        {/* Below lg the header button is hidden, so the same CTA sits under the cards. */}
        {data.cta.href ? (
          <div className="flex justify-center lg:hidden">
            <CtaLink href={data.cta.href} variant="outline" className="w-full md:w-auto">
              {data.cta.label}
            </CtaLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
