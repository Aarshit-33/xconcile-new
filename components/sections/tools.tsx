import Image from "next/image";

import { Rail } from "@/components/shared/rail";
import { SectionHeading } from "@/components/shared/section-heading";
import type { ToolsContent } from "@/content/types";
import { cardHover } from "@/lib/hover";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B13 Tools / software expertise. Mobile: centred heading, two-row snap rail + progress bar
 * on white. Desktop (#FAFAFA): heading left, two columns of five cards on the right,
 * filled column by column (same source order as the mobile rail).
 */
export function Tools({ data }: { data: ToolsContent }) {
  return (
    <section id={sectionId(data, "tools")} aria-labelledby="tools-title" className="bg-white section-y lg:bg-surface-muted">
      <div className="container-site grid gap-8 lg:gap-12 xl:grid-cols-2 xl:gap-[26px]">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId="tools-title"
          subtitle={data.subtitle}
          align="responsive"
          // Sticky left panel like Challenges/FAQ (client request 2026-10-17); xl = where this
          // section becomes two columns. self-start keeps it from stretching to the row.
          className="xl:sticky xl:top-header-offset xl:max-w-[636px] xl:self-start [&>h2]:mb-2"
        />

        {/* Card reveal on every page (option B, 2026-10-18). */}
        <Rail
          label={data.title}
          reveal
          listClassName="grid grid-flow-col grid-rows-2 auto-cols-[minmax(266px,max-content)] lg:grid-cols-2 lg:grid-rows-5 lg:auto-cols-auto lg:gap-x-6 lg:gap-y-8"
        >
          {data.items.map((tool) => (
            <li
              key={tool.name}
              className={cn("flex h-[90px] snap-start items-center gap-4 overflow-hidden rounded-md border border-hairline p-6", cardHover)}
            >
              <Image
                src={tool.logo}
                alt=""
                width={tool.width}
                height={tool.height}
                unoptimized={tool.logo.endsWith(".svg")}
                className="size-10 shrink-0 object-contain"
              />
              <span className="text-h3 whitespace-nowrap text-black">{tool.name}</span>
            </li>
          ))}
        </Rail>
      </div>
    </section>
  );
}
