import { Icon } from "@/components/icons/registry";
import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ProcessContent } from "@/content/types";
import { hoverGreen, hoverTile } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * B10 Process steps. Mobile: centred heading, snap rail of 264px cards + progress bar.
 * Desktop: five equal cards (240×238). Faded step numbers are decorative (aria-hidden);
 * the ordered list carries the sequence for assistive tech.
 */
/** `subtitleClassName`: per-design subtitle width (audit: 666px). */
export function Process({ data, subtitleClassName }: { data: ProcessContent; subtitleClassName?: string }) {
  return (
    <section id={sectionId(data, "process")} aria-labelledby="process-title" className="bg-surface-soft section-y">
      <div className="container-site flex flex-col gap-6 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId="process-title"
          subtitle={data.subtitle}
          className="mx-auto max-w-[880px]"
          titleClassName="max-w-[290px] md:max-w-none"
          subtitleClassName={cn("max-w-[326px] md:max-w-[880px]", subtitleClassName)}
        />

        {/* Card reveal on every page (option B, 2026-10-18). The cards share three grid rows
            (icon / title / description) via subgrid, on the rail and on the desktop grid, so all
            descriptions start on one line (user request 2026-10-25). */}
        <Rail
          label={plainTitle(data.title)}
          as="ol"
          listClassName="grid grid-flow-col grid-rows-[repeat(3,auto)] lg:grid-flow-row lg:grid-cols-5 lg:gap-6"
          reveal
        >
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "row-span-3 grid w-[264px] shrink-0 snap-start grid-rows-subgrid gap-y-4 overflow-hidden rounded-md border border-hairline bg-white p-6 lg:w-auto",
                hoverGreen,
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className={cn("flex size-12 shrink-0 items-center justify-center rounded-md bg-brand-50", hoverTile)}>
                  <Icon name={step.icon} className="size-6 text-brand" />
                </span>
                <span aria-hidden className="text-[40px] leading-12 font-bold text-hairline">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              {/* mt-2: 24px from the icon row (16px row gap + 8px), 16px to the description. */}
              <h3 className="mt-2 font-display text-h5 font-medium text-heading">{step.title}</h3>
              <p className="text-b1 text-body">{step.body}</p>
            </li>
          ))}
        </Rail>
      </div>
    </section>
  );
}
