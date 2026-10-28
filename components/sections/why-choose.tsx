import Image from "next/image";

import { Icon } from "@/components/icons/registry";
import { CountUp } from "@/components/motion/count-up";
import { ParallaxImageFrame } from "@/components/motion/parallax";
import { RevealList } from "@/components/motion/reveal-list";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ImageAsset, WhyChooseContent } from "@/content/types";
import { hoverDark } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

type Photo = ImageAsset;

/**
 * B12 Why choose us (dark). Mobile: heading → stacked feature cards (light icon tiles) →
 * 3-photo mosaic → 2×2 stats card. Desktop: heading + 2-column feature grid on the left;
 * 4-photo mosaic (columns centred on each other) + 4-up stats panel on the right.
 * Photos drift slightly inside their frames (subtle parallax).
 * 1024–1279 (user request 2026-10-18, audit U3): the right column is too short next to the
 * text, leaving an empty dark block, so the split starts at `xl`; below it the photos and the
 * stats sit side by side under the text.
 * Motion (2026-10-18): feature cards reveal (RevealList), stat numbers count up (CountUp).
 */
/**
 * Icon tiles: the Home design's dark tile on every page and screen size (user requests
 * 2026-10-24; inner pages used the audit design's light #E7F6E2 tiles via a `tile` prop).
 */
export function WhyChoose({ data, className }: { data: WhyChooseContent; className?: string }) {
  const [p1, p2, p3, p4] = data.images;

  const id = sectionId(data, "whyChoose");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("overflow-hidden bg-dark-gradient section-y", className)}
    >
      <div className="container-site grid gap-4 lg:gap-12 xl:grid-cols-[minmax(0,746fr)_minmax(0,526fr)] xl:gap-6">
        <div className="flex flex-col gap-8 lg:gap-12">
          <SectionHeading
            eyebrow={data.badge}
            eyebrowTone="dark"
            tone="dark"
            align="left"
            title={data.title}
            titleId={titleId}
            subtitle={data.subtitle}
            subtitleClassName="text-on-dark-muted lg:text-b1"
          />

          <RevealList className="grid gap-4 lg:grid-cols-[minmax(0,352fr)_minmax(0,370fr)] lg:gap-6">
            {/* Paired cards share title / text rows (subgrid), so texts start on one line (2026-10-25). */}
            {data.features.map((f) => (
              <li
                key={f.title}
                className={cn(
                  "row-span-2 grid grid-cols-[auto_minmax(0,1fr)] grid-rows-subgrid gap-x-4 gap-y-4 overflow-hidden rounded-md border border-hairline p-4 lg:p-6",
                  hoverDark,
                )}
              >
                <span className="row-span-2 flex size-8 shrink-0 items-center justify-center rounded-sm bg-brand-tile-dark">
                  <Icon name={f.icon} className="size-5 text-brand" />
                </span>
                <h3 className="text-h4-m text-white lg:text-h5">{f.title}</h3>
                <p className="text-b1 text-on-dark-muted">{f.body}</p>
              </li>
            ))}
          </RevealList>
        </div>

        <div className="flex flex-col gap-6 lg:max-xl:grid lg:max-xl:grid-cols-2 lg:max-xl:items-center xl:gap-[25px]">
          <div className="grid grid-cols-2 items-center gap-4 lg:gap-6">
            <div className="flex flex-col gap-4 lg:gap-6">
              <MosaicPhoto photo={p1} className="aspect-[171/179] lg:aspect-[251/210]" />
              <MosaicPhoto photo={p2} className="aspect-[171/179] lg:aspect-[251/210]" />
            </div>
            <div className="flex flex-col gap-4 lg:gap-6">
              <MosaicPhoto photo={p3} className="aspect-[171/374] lg:aspect-[251/371]" />
              {/* Fourth photo is drawn on desktop only */}
              <MosaicPhoto photo={p4} className="hidden aspect-[251/173] lg:block" />
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-y-4 rounded-md bg-white/4 p-4 lg:bg-white/5 xl:flex xl:justify-between">
            {data.stats.map((s, i) => (
              <div
                key={s.label}
                className={cn(
                  // 1280–1365px: 12px side padding so the single stats row fits the card (audit M1).
                  "flex flex-col gap-2 px-4 xl:max-[1366px]:px-3",
                  i % 2 === 1 && "border-l border-white/10",
                  i > 0 && "xl:border-l xl:border-white/10",
                )}
              >
                <dt className="order-2 w-min text-b2 font-medium text-white">{s.label}</dt>
                <dd className="order-1 text-stat-sm text-brand">
                  <CountUp value={s.value} index={i} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function MosaicPhoto({ photo, className }: { photo?: Photo; className?: string }) {
  if (!photo) return null;
  return (
    // The mosaic is half the section: splash + zoom on hover (client request 2026-10-22).
    <ParallaxImageFrame amount={3} className={cn("img-splash img-zoom rounded-md", className)}>
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1440px) 251px, (min-width: 1024px) 18vw, 50vw"
        className="object-cover"
      />
    </ParallaxImageFrame>
  );
}
