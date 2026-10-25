import { Icon } from "@/components/icons/registry";
import type { FeatureStripContent } from "@/content/types";
import { hoverGreen, hoverTile } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B3 Feature strip (Hire design, directly under the hero): #FAFAFA band, padding 24, four white
 * bordered cards 306×130 (padding 24, gap 16): #F3F8F2 40px icon tile, 18/24 title, 16/24 copy.
 * No mobile design: 2×2 grid (1 column under 360px) with the tile above the text; the tile
 * moves beside the text from `xl`, where the four cards are wide enough for it.
 * The titles are not headings (the strip has no heading of its own); it is labelled instead.
 */
export function FeatureStrip({ data, className }: { data: FeatureStripContent; className?: string }) {
  return (
    <section id={sectionId(data, "featureStrip")} aria-label={data.label} className={cn("py-6", className)}>
      {/* Cards share their rows via subgrid (icon / title / text below xl; title / text with the
          icon beside them from xl), so titles and texts line up across a row (2026-10-25). */}
      <ul className="container-site grid grid-cols-2 gap-4 max-[360px]:grid-cols-1 lg:grid-cols-4 lg:gap-6">
        {data.items.map((item) => (
          <li
            key={item.title}
            className={cn(
              "row-span-3 grid grid-rows-subgrid gap-y-2 rounded-md border border-hairline bg-white p-4 lg:p-6 xl:row-span-2 xl:grid-cols-[auto_minmax(0,1fr)] xl:gap-x-4",
              hoverGreen,
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md bg-brand-50 xl:row-span-2",
                hoverTile,
              )}
            >
              <Icon name={item.icon} className="size-6 text-brand" />
            </span>
            {/* mt-2: 16px below the icon (8px row gap + 8px) until xl, where they sit side by side. */}
            <p className="mt-2 text-h4-m text-black xl:mt-0">{item.title}</p>
            <p className="text-b1 text-body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
