import Image from "next/image";

import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AudienceCardsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B22 Audience cards (Hire "Businesses We Work With"). Desktop: #FAFAFA, padding 80/71, three
 * 415px cards: 277px photo (top radius 8) over a white body (padding 24): 20/28 title, 16/24
 * #4D5560 copy, full-width outline button pinned to the bottom so the buttons align.
 * No mobile design: Home-style snap rail (300px cards).
 */
export function AudienceCards({ data, className }: { data: AudienceCardsContent; className?: string }) {
  return (
    <section id={sectionId(data, "audienceCards")} aria-labelledby="audience-title" className={cn("bg-surface-soft section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId="audience-title"
          subtitle={data.subtitle}
        />

        <Rail label={data.title} listClassName="lg:grid lg:grid-cols-3 lg:gap-6" reveal>
          {data.items.map((item) => (
            <li
              key={item.title}
              // No hover background on these cards (client request 2026-10-22); the photo zooms.
              className="img-zoom-trigger flex w-[300px] shrink-0 snap-start flex-col overflow-hidden rounded-md border border-hairline bg-white lg:w-auto"
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
              {/* Whole card (photo + text) rises via the Rail's RevealList (2026-10-22). */}
              <div className="flex flex-1 flex-col gap-8 p-6 lg:gap-[43px]">
                <div className="flex flex-col gap-4">
                  <h3 className="text-h5 font-medium text-heading-alt">{item.title}</h3>
                  <p className="text-b1 text-body-alt">{item.body}</p>
                </div>
                <div className="mt-auto">
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
