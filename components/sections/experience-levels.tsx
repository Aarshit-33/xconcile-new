import { CheckIcon, History2Icon } from "@/components/icons/material-symbols";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ExperienceLevelsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * B21 Experience levels (Hire "Choose the Right Accounting Professional for Your Needs").
 * Desktop: white section, centred heading, three equal-height 415px cards (padding 24, radius 8):
 * level tag (#F1F5F9, radius 4), 24/32 title, history
 * meta, then "Core Responsibilities" between hairlines with 14/20 "Label: text" rows, and a
 * full-width button. The middle card is the spec's `featured-card` (#13212C, green
 * "Most Popular" tag, filled discs, solid button).
 * No mobile design: Home-style snap rail of 300px cards.
 * Every card spans 5 shared rows (CSS subgrid: tag / title / meta / responsibilities / button),
 * so the meta, responsibilities and buttons sit on the same line in every card on every screen,
 * however the titles wrap (user requests 2026-10-24 and 2026-10-25; replaced the two-line title box).
 */
export function ExperienceLevels({ data, className }: { data: ExperienceLevelsContent; className?: string }) {
  const id = sectionId(data, "experienceLevels");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          titleClassName="max-w-[600px]"
          subtitle={data.subtitle}
          subtitleClassName="max-w-[715px]"
        />

        {/* Cards share five rows (tag / title / experience / responsibilities / button) via
            subgrid, on the rail and the desktop grid, so every part lines up across the cards
            (user request 2026-10-25; replaces the desktop 2-line title box). Row gap 0: each part
            sets its own top margin (the drawn spacing). */}
        <Rail
          label={plainTitle(data.title)}
          listClassName="grid grid-flow-col grid-rows-[repeat(5,auto)] lg:grid-flow-row lg:grid-cols-3 lg:gap-6"
          reveal
        >
          {data.items.map((lvl) => {
            const featured = lvl.featured === true;
            return (
              <li
                key={lvl.title}
                className={cn(
                  "row-span-5 grid w-[300px] shrink-0 snap-start grid-rows-subgrid gap-y-0 overflow-hidden rounded-md border border-hairline p-6 lg:w-auto",
                  // No hover background on these cards (client request 2026-10-22). Non-featured
                  // cards: light grey `surface-soft` instead of white (user request 2026-10-24).
                  featured ? "bg-navy" : "bg-surface-soft",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={cn(
                      "flex h-8 items-center rounded-sm border border-hairline px-2.5 text-b2 font-medium uppercase",
                      featured ? "bg-brand-100 text-heading" : "bg-slate-100 text-body",
                    )}
                  >
                    {lvl.level}
                  </span>
                  {featured ? (
                    <span className="flex h-8 items-center rounded-sm bg-brand px-2.5 text-b2 font-medium text-white">
                      {data.featuredLabel}
                    </span>
                  ) : null}
                </div>
                <h3 className={cn("mt-6 text-h3 font-bold", featured ? "text-white" : "text-heading")}>
                  {lvl.title}
                </h3>
                <p
                  className={cn(
                    "mt-4 flex items-center gap-1 text-b2 font-medium",
                    featured ? "text-brand" : "text-slate-500",
                  )}
                >
                  <History2Icon className="size-4 shrink-0" />
                  {lvl.experience}
                </p>

                <div
                  className={cn(
                    "mt-[38px] flex flex-col gap-4 border-y py-6",
                    featured ? "border-white/8" : "border-hairline",
                  )}
                >
                  <p className={cn("text-b2 font-medium", featured ? "text-white" : "text-body")}>
                    {data.listLabel}
                  </p>
                  <ul className="flex flex-col gap-6">
                    {lvl.responsibilities.map((r) => (
                      <li key={r.label} className="flex items-start gap-2 text-b2">
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full",
                            featured ? "bg-brand text-white" : "bg-brand-100 text-brand",
                          )}
                        >
                          <CheckIcon className="size-4" />
                        </span>
                        <span className={featured ? "text-on-dark" : "text-body"}>
                          <strong className={cn("font-bold", featured ? "text-white" : "text-heading")}>
                            {r.label}:
                          </strong>{" "}
                          {r.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-10 self-end">
                  <CtaLink
                    href={lvl.cta.href}
                    variant={featured ? "solid" : "outline"}
                    block="always"
                    arrow={false}
                    className="justify-center px-6 text-center"
                  >
                    {lvl.cta.label}
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
