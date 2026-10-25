import { CheckIcon, StarFillIcon } from "@/components/icons/material-symbols";
import { Icon } from "@/components/icons/registry";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { EngagementModelsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * B20 Engagement models (Hire "Choose Accounting Support That Fits Your Workload").
 * Desktop: #FAFAFA, padding 80/71, three equal-height 416px cards (padding 24, radius 8): number
 * chip + glyph row, H4 title over a green 14/20 tagline and a hairline, 16/24 copy, check list
 * (20px #E7F6E2 discs, 14/20), full-width 48px button. The featured card (spec `featured-card`)
 * is #13212C with white copy, filled green discs, a green "Most Popular" pill and a solid button.
 * No mobile design: the cards become the Home-style snap rail (300px cards, progress bar).
 * Every card is as tall as the longest one (rail and grid both stretch) and the button sits at
 * the bottom, so the buttons line up in one row (user request 2026-10-24).
 */
export function EngagementModels({ data, className }: { data: EngagementModelsContent; className?: string }) {
  const id = sectionId(data, "engagementModels");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id}
      aria-labelledby={titleId}
      className={cn("bg-white section-y", className)}
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          subtitleClassName="max-w-[715px]"
        />

        {/* Cards share six rows (header / title / tagline / description / features / button) via
            subgrid, on the rail and the desktop grid, so every part lines up across the cards
            (user request 2026-10-25; replaces the 2-line title reservation at 1024–1439px). Row
            gap 0: each part sets its own top margin (the drawn spacing). */}
        <Rail
          label={plainTitle(data.title)}
          listClassName="grid grid-flow-col grid-rows-[repeat(6,auto)] lg:grid-flow-row lg:grid-cols-3 lg:gap-6"
          reveal
        >
          {data.items.map((m) => {
            const featured = m.featured === true;
            return (
              <li
                key={m.title}
                className={cn(
                  "row-span-6 grid w-[300px] shrink-0 snap-start grid-rows-subgrid gap-y-0 overflow-hidden rounded-md border border-hairline p-6 lg:w-auto",
                  // No hover background on these cards (client request 2026-10-22). Non-featured
                  // cards: light grey `surface-soft` instead of white (user request 2026-10-24).
                  featured ? "bg-navy" : "bg-surface-soft",
                )}
              >
                <div className="flex items-center justify-between gap-4 p-2.5">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-sm border text-b1 font-medium",
                      featured ? "border-transparent bg-white text-brand" : "border-hairline text-black",
                    )}
                  >
                    {m.number}
                  </span>
                  {featured ? (
                    <span className="flex h-8 items-center gap-2.5 rounded-[23px] bg-brand px-4 text-b2 font-medium text-white">
                      <StarFillIcon className="size-4" />
                      {data.featuredLabel}
                    </span>
                  ) : m.icon ? (
                    <Icon name={m.icon} className="size-8 text-heading" />
                  ) : null}
                </div>

                <h3 className={cn("mt-8 text-h3 font-bold", featured ? "text-white" : "text-heading")}>
                  {m.title}
                </h3>
                {/* The hairline under the tagline closes the title block (8px below the title). */}
                <p
                  className={cn(
                    "mt-2 border-b pb-6 text-b2 font-medium text-brand",
                    featured ? "border-white/8" : "border-hairline",
                  )}
                >
                  {m.tagline}
                </p>
                <p className={cn("mt-4 text-b1", featured ? "text-white" : "text-body")}>{m.body}</p>

                <ul className="mt-8 flex flex-col gap-4">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-b2">
                      <span
                        className={cn(
                          "flex size-5 shrink-0 items-center justify-center rounded-full",
                          featured ? "bg-brand text-white" : "bg-brand-100 text-brand",
                        )}
                      >
                        <CheckIcon className="size-4" />
                      </span>
                      <span className={featured ? "text-on-dark" : "text-body"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 self-end">
                  <CtaLink
                    href={m.cta.href}
                    variant={featured ? "solid" : "outline"}
                    block="always"
                    arrow={false}
                    className="justify-center px-6 text-center"
                  >
                    {m.cta.label}
                  </CtaLink>
                </div>
              </li>
            );
          })}
        </Rail>
      </div>
    </section>
  );
}
