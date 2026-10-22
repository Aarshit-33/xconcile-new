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
/** `tile="light"`: #E7F6E2 icon tiles on desktop as well (audit design); Home desktop uses dark tiles. */
export function WhyChoose({
  data,
  tile = "dark",
  className,
}: {
  data: WhyChooseContent;
  tile?: "dark" | "light";
  className?: string;
}) {
  const [p1, p2, p3, p4] = data.images;

  return (
    <section id={sectionId(data, "whyChoose")}
      aria-labelledby="why-choose-title"
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
            titleId="why-choose-title"
            highlightOnNewLine
            subtitle={data.subtitle}
            subtitleClassName="text-on-dark-muted lg:text-b1"
          />

          <RevealList className="grid gap-4 lg:grid-cols-[minmax(0,352fr)_minmax(0,370fr)] lg:gap-6">
            {data.features.map((f) => (
              <li key={f.title} className={cn("flex gap-4 overflow-hidden rounded-md border border-hairline p-4 lg:p-6", hoverDark)}>
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-sm border border-brand-border bg-brand-100",
                    tile === "dark" && "lg:border-transparent lg:bg-brand-tile-dark",
                  )}
                >
                  <Icon name={f.icon} className="size-5 text-brand" />
                </span>
                <div className="flex flex-col gap-4">
                  <h3 className="text-h5 text-white">{f.title}</h3>
                  <p className="text-b1 text-on-dark-muted">{f.body}</p>
                </div>
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
