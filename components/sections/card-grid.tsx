import { Icon } from "@/components/icons/registry";
import { RevealList } from "@/components/motion/reveal-list";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CardGridContent } from "@/content/types";
import { hoverDark } from "@/lib/hover";
import { plainTitle } from "@/lib/highlight";
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
 * No mobile design: no swipe rail (user request 2026-10-24, was a Rail + progress bar until md);
 * the tiles stack in 1 column on phones, 2 from sm and 3 from md.
 * Each whole tile rises into place when it reaches the viewport (RevealList; whole-card motion
 * since 2026-10-22 — before that only the title/body moved).
 */
export function CardGrid({ data, className }: { data: CardGridContent; className?: string }) {
  const id = sectionId(data, "cardGrid");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;
  const title = plainTitle(data.title);
  // Any tile with a text line: every tile gets the text row so texts line up.
  const hasBody = data.items.some((item) => item.body);

  return (
    <section
      id={id}
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

        <RevealList aria-label={title} className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          {/* Tiles share icon / title / text rows (subgrid), so texts start on one line across a
              row (2026-10-25). Pages without tile texts use two rows. */}
          {data.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                "grid grid-rows-subgrid gap-y-2 overflow-hidden rounded-md border border-hairline bg-dark-card p-4 lg:p-6",
                hasBody ? "row-span-3" : "row-span-2",
                hoverDark,
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-md bg-brand-tile-dark lg:size-12">
                <Icon name={item.icon} className="size-6 text-brand" />
              </span>
              {/* mt-4: 24px below the icon (8px row gap + 16px), 8px to the text. */}
              <h3 className="mt-4 text-h4-m text-white lg:text-h5 lg:leading-6">{item.title}</h3>
              {hasBody ? <p className="text-b2 text-on-dark lg:text-b1">{item.body}</p> : null}
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
