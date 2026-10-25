import Image from "next/image";

import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AudienceCardsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * B22 Audience cards (Hire "Businesses We Work With"). Desktop: #FAFAFA, padding 80/71, three
 * 415px cards: 277px photo (top radius 8) over a white body (padding 24): 20/28 title, 16/24
 * #4D5560 copy, full-width outline button pinned to the bottom so the buttons align.
 * No mobile design: Home-style snap rail (300px cards).
 * Titles reserve two lines below 1440px, where one of them wraps in the narrower cards, so the
 * copy under every title starts at the same height (user report 2026-10-24: "fix heading height").
 */
export function AudienceCards({ data, className }: { data: AudienceCardsContent; className?: string }) {
  const id = sectionId(data, "audienceCards");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("bg-surface-soft section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
        />

        {/* Cards share photo / title / text / button rows (subgrid), on the rail and the desktop
            grid, so titles, texts and buttons line up (2026-10-25; replaces the old 2-line title
            reservation). */}
        <Rail
          label={plainTitle(data.title)}
          listClassName="grid grid-flow-col grid-rows-[repeat(4,auto)] lg:grid-flow-row lg:grid-cols-3 lg:gap-6"
          reveal
        >
          {data.items.map((item) => (
            <li
              key={item.title}
              // No hover background on these cards (client request 2026-10-22); the photo zooms.
              className="img-zoom-trigger row-span-4 grid w-[300px] shrink-0 snap-start grid-rows-subgrid gap-y-0 overflow-hidden rounded-md border border-hairline bg-white lg:w-auto"
            >
              <div className="img-zoom relative aspect-[415/277] overflow-hidden bg-line">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(min-width: 1440px) 415px, (min-width: 1024px) 30vw, 300px"
                  className="object-cover"
                />
              </div>
              {/* Whole card (photo + text) rises via the Rail's RevealList (2026-10-22). The padded
                  body is itself a subgrid over the title / text / button rows. */}
              <div className="row-span-3 grid grid-rows-subgrid gap-y-4 p-6">
                <h3 className="text-h5 font-medium text-heading-alt">{item.title}</h3>
                <p className="text-b1 text-body-alt">{item.body}</p>
                {/* 32px (lg 43px) above the button: 16px row gap + this margin. */}
                <div className="mt-4 self-end lg:mt-[27px]">
                  <CtaLink
                    href={item.cta.href}
                    variant="outline"
                    block="always"
                    arrow={false}
                    className="justify-center px-6 text-center"
                  >
                    {item.cta.label}
                  </CtaLink>
                </div>
              </div>
            </li>
          ))}
        </Rail>
      </div>
    </section>
  );
}
