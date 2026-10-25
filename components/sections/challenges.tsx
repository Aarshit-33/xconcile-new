import { Icon } from "@/components/icons/registry";
import { CtaLink } from "@/components/shared/cta";
import { Rail } from "@/components/shared/rail";
import { RichText } from "@/components/shared/rich-text";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ChallengesContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * `hover` (client request 2026-10-16): each card deepens within its OWN tint instead of the shared
 * `cardHover` veil. The shade is the tone's tile/line colour at 50%, so it sits between the resting
 * card background and the icon tile (the tile stays visible).
 */
const tones = {
  rose: {
    card: "bg-tint-rose border-tint-rose-line",
    hover: "hover:bg-tint-rose-line/50",
    tile: "bg-tint-rose-line",
    icon: "text-tint-rose-ink",
  },
  amber: {
    card: "bg-tint-amber border-tint-amber-line",
    hover: "hover:bg-tint-amber-line/50",
    tile: "bg-tint-amber-line",
    icon: "text-tint-amber-ink",
  },
  blue: {
    card: "bg-tint-blue border-tint-blue-line",
    hover: "hover:bg-tint-blue-line/50",
    tile: "bg-tint-blue-line",
    icon: "text-tint-blue-ink",
  },
  purple: {
    card: "bg-tint-purple border-tint-purple-line",
    hover: "hover:bg-tint-purple-line/50",
    tile: "bg-tint-purple-line",
    icon: "text-tint-purple-ink",
  },
  green: {
    card: "bg-tint-green border-hairline",
    hover: "hover:bg-brand-tile/50",
    tile: "bg-brand-tile",
    icon: "text-brand",
  },
  white: {
    card: "bg-white border-hairline",
    hover: "hover:bg-brand-50/50",
    tile: "bg-brand-50",
    icon: "text-brand",
  },
} as const;

/**
 * B5 Challenges. Mobile: heading, then a snap rail of tinted cards with the progress bar, then
 * the CTA (user request 2026-10-25; not drawn on mobile). Desktop: sticky heading + CTA on the
 * left, stacked cards on the right.
 */
export function Challenges({
  data,
  className,
  reveal = true,
}: {
  data: ChallengesContent;
  className?: string;
  /** Cards rise into place as they reach the viewport (every page since 2026-10-18, option B). */
  reveal?: boolean;
}) {
  const id = sectionId(data, "challenges");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id}
      aria-labelledby={titleId}
      className={cn("bg-white section-y", className)}
    >
      <div className="container-site grid gap-8 lg:grid-cols-2 lg:gap-6">
        {/* Sticks below the fixed desktop navbar (was top-10 = 40px, under the 100px pill). */}
        <div className="flex flex-col gap-8 lg:sticky lg:top-header-offset lg:self-start">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId={titleId}
            align="left"
            className="lg:gap-6"
            subtitle={data.body}
            subtitleClassName="lg:text-b3-tight -mt-0 lg:-mt-2"
          />
          {data.cta ? (
            <div className="hidden lg:block">
              <CtaLink href={data.cta.href} variant="outline">
                {data.cta.label}
              </CtaLink>
            </div>
          ) : null}
        </div>

        {/* Rail (below lg): the cards share two grid rows (title / description) via subgrid, so
            every description starts on the same line however the titles wrap (user request
            2026-10-25). lg: the cards stack in one column (no row sharing needed). */}
        <Rail
          label={plainTitle(data.title)}
          listClassName="grid grid-flow-col grid-rows-[auto_auto] lg:flex lg:flex-col lg:gap-6"
          reveal={reveal}
        >
          {data.items.map((item) => {
            const t = tones[item.tone];
            return (
              <li
                key={item.title}
                className={cn(
                  "row-span-2 grid w-[284px] shrink-0 snap-start grid-cols-[auto_minmax(0,1fr)] grid-rows-subgrid gap-x-[17px] gap-y-4 overflow-hidden rounded-md border p-4 transition-colors duration-200 lg:w-auto lg:grid-rows-[auto_auto] lg:p-6",
                  t.card,
                  t.hover,
                )}
              >
                <span
                  className={cn(
                    "row-span-2 flex size-10 shrink-0 items-center justify-center rounded-md",
                    t.tile,
                  )}
                >
                  <Icon name={item.icon} className={cn("size-6", t.icon)} />
                </span>
                <h3 className="text-h4-m text-heading lg:text-h5">{item.title}</h3>
                <p className="text-b1 text-body">
                  <RichText value={item.body} />
                </p>
              </li>
            );
          })}
        </Rail>
        {/* Below lg the sticky column's button is hidden, so the same CTA sits under the cards.
            No button when the design draws none (virtual CFO page). */}
        {data.cta ? (
          <div className="lg:hidden">
            <CtaLink href={data.cta.href} variant="outline" className="w-full md:w-auto">
              {data.cta.label}
            </CtaLink>
          </div>
        ) : null}
      </div>
    </section>
  );
}
