import { Icon } from "@/components/icons/registry";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CardGridContent } from "@/content/types";
import { hoverDark } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B7 Card grid, `dark-tile-3col` (Hire "Our Accounting Professionals Have Expertise In"; the
 * Industry "Services" grid uses the same block). Dark gradient, padding 80/71, centred dark
 * eyebrow + white H2 + 80% subtitle (715px), 3×2 tiles 416 wide: rgba(255,255,255,.04), radius 8,
 * 48px rgba(106,190,82,.16) icon tile top-left, 20/24 white title below it. Tile height follows
 * the content (the design's fixed 258px left a large gap under the icon; removed at client
 * request 2026-10-18); tiles in a row still match height via grid stretch. Content starts right
 * under the icon, so when a neighbour's title wraps the extra height falls BELOW the text,
 * never between icon and title (user request 2026-10-18, tablet).
 * No mobile design: phones get the swipe Rail + progress bar like every other card list
 * (user request 2026-10-18); 3 columns from `md`.
 * Each whole tile rises into place when it reaches the viewport (RevealList; whole-card motion
 * since 2026-10-22 — before that only the title/body moved).
 */
export function CardGrid({ data, className }: { data: CardGridContent; className?: string }) {
  const titleId = `${data.id ?? "card-grid"}-title`;
  const title =
    typeof data.title === "string"
      ? data.title
      : [data.title.before, data.title.highlight, data.title.after].filter(Boolean).join(" ");

  return (
    <section
      id={sectionId(data, "cardGrid")}
      aria-labelledby={titleId}
      className={cn("bg-dark-gradient section-y", className)}
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          eyebrowTone="dark"
          tone="dark"
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          subtitleClassName="max-w-[715px]"
        />

        <Rail
          label={title}
          until="md"
          reveal
          listClassName="items-stretch md:grid md:grid-cols-3 md:gap-4 lg:gap-6"
        >
          {data.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                "flex w-[284px] shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-md border border-hairline bg-dark-card p-4 md:w-auto lg:p-6",
                hoverDark,
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-tile-dark lg:size-12">
                <Icon name={item.icon} className="size-6 text-brand" />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-h4-m text-white lg:text-h5 lg:leading-6">{item.title}</h3>
                {item.body ? (
                  <p className="text-b2 text-on-dark lg:text-b1">{item.body}</p>
                ) : null}
              </div>
            </li>
          ))}
        </Rail>
      </div>
    </section>
  );
}
