import Image from "next/image";
import Link from "next/link";

import { ArrowRightAltIcon } from "@/components/icons/material-symbols";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { IndustriesContent } from "@/content/types";
import { sectionId } from "@/lib/section-ids";

/**
 * B11 Industries. Mobile: centred heading, snap rail of 306px cards + progress bar (no CTA
 * drawn). Desktop: left-aligned heading with an outline CTA on the right, four cards.
 * Each card is one link (title, copy, photo) to its industry page.
 */
/** `headingAlign="center"`: heading centred on desktop too (designs without the CTA, e.g. audit). */
export function Industries({
  data,
  headingAlign = "responsive",
}: {
  data: IndustriesContent;
  headingAlign?: "responsive" | "center";
}) {
  return (
    <section id={sectionId(data, "industries")} aria-labelledby="industries-title" className="section-y">
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

        {/* Card reveal on every page (option B, 2026-10-18): only the title row and copy rise
            (`data-reveal`; their wrapper is `display: contents` on lg); card + photo stay still. */}
        <Rail label={data.title} listClassName="lg:grid lg:grid-cols-4 lg:gap-6" reveal>
          {data.items.map((item) => {
            const card = (
              <>
                {/* lg:contents: title row + text join the card's subgrid rows (see cardCls). */}
                <div className="flex flex-col gap-4 lg:contents">
                  <div data-reveal className="flex items-start justify-between gap-4">
                    <h3 className="text-h5 text-heading-alt transition-colors group-hover:text-brand">{item.title}</h3>
                    <ArrowRightAltIcon className="size-6 shrink-0 text-heading-alt transition-colors group-hover:text-brand" />
                  </div>
                  {/* -mt-2 / -mt-0.5: the 24px row gap minus these = the 16px / 22px drawn spacing. */}
                  <p data-reveal className="text-b1 text-body-alt lg:-mt-2">{item.body}</p>
                </div>
                <div data-reveal className="relative mt-auto aspect-[274/146] overflow-hidden rounded-sm lg:-mt-0.5">
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
            // lg: li and card are 3-row subgrids (title / text / photo) of the 4-column list, so every
            // title row takes the tallest title's height and the texts line up (audit L5).
            const cardCls =
              "flex w-full flex-col gap-[22px] rounded-md border border-hairline bg-white p-4 lg:row-span-3 lg:grid lg:grid-rows-subgrid lg:gap-y-[normal] lg:border-[#d2d5da]";
            return (
              <li key={item.title} className="flex w-[306px] shrink-0 snap-start lg:row-span-3 lg:grid lg:w-auto lg:grid-rows-subgrid">
                {item.href ? (
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
      </div>
    </section>
  );
}
