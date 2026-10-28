import Image from "next/image";

import { Icon } from "@/components/icons/registry";
import { ChevronForwardIcon } from "@/components/icons/material-symbols";
import { FadeUp } from "@/components/motion/fade-up";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { ToolTabsContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { plainTitle } from "@/lib/highlight";
import { sectionId } from "@/lib/section-ids";

/**
 * B13 Tools, `tabs` variant (service pages; audit design "Your Tools, Our Expertise").
 *
 * Desktop (#FAFAFA): centred heading; white 526px card of category tabs (88px rows, active row
 * #E7F6E2 with a green icon tile + green chevron) next to a white 746px panel (green 32px rule,
 * H4 category title, wrapping logo chips 40px / radius 18).
 * Mobile (no design): the tabs become a horizontal chip scroller above the panel (report §3.5).
 * Categories without tools are not rendered; every panel is in the HTML (forceMount).
 * All panels share one grid cell and inactive ones are only `invisible` (not removed), so the
 * panel is always as tall as the fullest category and the section height doesn't jump when
 * switching tabs (user request 2026-10-25).
 */
export function ToolTabs({ data, className }: { data: ToolTabsContent; className?: string }) {
  const categories = data.categories.filter((c) => c.tools.length > 0);
  const [first] = categories;
  if (!first) return null;

  const id = sectionId(data, "tools");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={cn("bg-white section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          className="mx-auto max-w-[776px]"
          subtitleClassName="lg:text-b3"
        />

        {/* Entrance (option B, 2026-10-18): tab card + panel fade up together as one block
            (wrapping the individual tabs would break the Radix tablist structure). */}
        <FadeUp>
          <Tabs
            defaultValue={first.id}
            orientation="vertical"
            className="grid gap-4 lg:grid-cols-[minmax(0,526fr)_minmax(0,746fr)] lg:items-stretch lg:gap-6"
          >
            <TabsList
              variant="line"
              aria-label={`${plainTitle(data.title)}: categories`}
              className="no-scrollbar h-auto w-full flex-row! justify-start gap-3 overflow-x-auto rounded-none p-0 group-data-vertical/tabs:h-auto lg:flex-col! lg:gap-0 lg:overflow-visible lg:rounded-md lg:border lg:border-hairline lg:bg-white lg:p-4 xl:p-6"
            >
              {categories.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="group/tab h-auto w-auto! flex-none justify-between! gap-4 rounded-md border-hairline bg-white p-3 pr-4 text-h4-m text-heading transition-[background-color,border-color] duration-200 after:hidden hover:bg-brand-50 hover:text-heading lg:h-auto lg:min-h-[88px] lg:w-full! lg:border-transparent lg:p-4 lg:text-h5 lg:whitespace-normal xl:p-6 data-active:border-brand-border data-active:bg-brand-100! lg:data-active:border-hairline"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-50 text-body group-data-active/tab:bg-brand group-data-active/tab:text-white lg:size-10">
                      <Icon name={c.icon} className="size-5 lg:size-6" />
                    </span>
                    <span className="text-b1 font-semibold whitespace-nowrap lg:text-left lg:text-h5 lg:whitespace-normal">
                      {c.label}
                    </span>
                  </span>
                  <ChevronForwardIcon className="hidden size-6 text-heading group-data-active/tab:text-brand lg:block" />
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="grid">
              {categories.map((c) => (
                <TabsContent
                  key={c.id}
                  value={c.id}
                  forceMount
                  className="flex flex-col gap-6 rounded-md border border-hairline bg-white p-6 [grid-area:1/1] data-[state=inactive]:invisible lg:gap-10 lg:px-9 lg:py-8"
                >
                  <div className="flex flex-col gap-5">
                    <span aria-hidden className="h-0.5 w-8 bg-brand" />
                    <h3 className="text-h3 font-bold text-heading">{c.label}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-3 lg:gap-6">
                    {c.tools.map((tool) => (
                      <li
                        key={tool.name}
                        className="flex h-10 items-center gap-[11px] rounded-[18px] border border-hairline bg-white px-4 text-b2 font-medium text-black"
                      >
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt=""
                            width={tool.width ?? 24}
                            height={tool.height ?? 24}
                            unoptimized={tool.logo.endsWith(".svg")}
                            className="h-6 w-auto max-w-14 shrink-0 object-contain"
                          />
                        ) : null}
                        {tool.name}
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </FadeUp>
      </div>
    </section>
  );
}
