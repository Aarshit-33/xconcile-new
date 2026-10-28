import { Icon } from "@/components/icons/registry";
import { RevealList } from "@/components/motion/reveal-list";
import { SectionHeading } from "@/components/shared/section-heading";
import type { FeatureCardsContent } from "@/content/types";
import { hoverGreen, hoverTile } from "@/lib/hover";
import { plainTitle } from "@/lib/highlight";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * Feature cards (Industries gallery design, `/industries`: "Industries We Serve" + four cards).
 * White section, centred eyebrow + H2 + subtitle, then four white bordered cards (radius 8,
 * padding 24): #F3F8F2 icon tile on top, 20/28 title, 16/24 copy. Same card look and hover
 * as the industry pages' feature strip (B3), with the tile above the text at every width.
 * No mobile design: 1 column on phones, 2 from sm, 4 from lg. Cards rise in (RevealList).
 */
export function FeatureCards({
  data,
  className,
}: {
  data: FeatureCardsContent;
  className?: string;
}) {
  const id = sectionId(data, "featureCards");
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
        />
        <RevealList
          aria-label={plainTitle(data.title)}
          className={cn(
            "grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:gap-6",
            // Three cards (About "Our Core Values") fill a 3-column row; otherwise 4 per row.
            data.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
          )}
        >
          {/* Cards share icon / title / text rows (subgrid), so texts start on one line (2026-10-25). */}
          {data.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                "row-span-3 grid grid-rows-subgrid gap-y-3 rounded-md border border-line/60 bg-white p-6",
                hoverGreen,
              )}
            >
              <span
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-50",
                  hoverTile,
                )}
              >
                <Icon name={item.icon} className="size-6 text-brand" />
              </span>
              {/* mt-3: 24px below the icon (12px row gap + 12px), 12px to the text. */}
              <h3 className="mt-3 text-h4-m text-heading-alt lg:text-h5">{item.title}</h3>
              <p className="text-b1 text-body">{item.body}</p>
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
