"use client";

import { Icon } from "@/components/icons/registry";
import { AddIcon, RemoveIcon } from "@/components/icons/material-symbols";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { SubIndustriesContent } from "@/content/types";
import { cn } from "@/lib/utils";

/** Number + icon + title/line, shared by accordion rows and static rows (geometry as drawn). */
function RowHead({ item, index }: { item: SubIndustriesContent["items"][number]; index: number }) {
  return (
    <>
      <span aria-hidden className="w-5 shrink-0 text-b1 font-medium text-brand lg:w-[17px]">
        {String(index + 1).padStart(2, "0")}
      </span>
      <Icon name={item.icon} className="size-6 shrink-0 text-brand lg:ml-[30px]" />
      <span className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-10">
        <span className="text-h4-m text-heading transition-colors group-hover/sub:text-brand group-data-open/sub:text-brand lg:text-h5">
          {item.title}
        </span>
        <span className="text-b2 text-body">{item.body}</span>
      </span>
    </>
  );
}

/**
 * Sub-Industries rows as an accordion (user request 2026-10-18). Closed rows match the design:
 * hairline-separated, padding 24/0, 28px round "+" (#FAFAFA, hairline, green glyph) on the right.
 * The design has no open state, so it follows the site's FAQ/services accordions: one row open
 * at a time, all closed at first, title green on hover/open, "−" when open, details indented
 * under the title (143px on desktop) as grouped lists with green dots. Panels are force-mounted
 * so the details are in the server HTML. Rows without `groups` render as static rows.
 */
export function SubIndustriesAccordion({ items }: { items: SubIndustriesContent["items"] }) {
  return (
    <Accordion type="single" collapsible className="border-b border-hairline">
      {items.map((item, i) =>
        item.groups?.length ? (
          <AccordionItem key={item.title} value={`sub-${i}`} className="group/sub border-t border-hairline not-last:border-b-0">
            <AccordionTrigger className="items-start gap-4 rounded-none border-0 py-6 text-left font-normal hover:no-underline focus-visible:ring-inset lg:items-center **:data-[slot=accordion-trigger-icon]:hidden">
              <RowHead item={item} index={i} />
              <span
                aria-hidden
                className="flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-muted p-0.5"
              >
                <AddIcon className="size-6 text-brand group-data-open/sub:hidden" />
                <RemoveIcon className="hidden size-6 text-brand group-data-open/sub:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent forceMount className="pb-6 lg:pr-[52px] lg:pb-8 lg:pl-[143px] [&_p:not(:last-child)]:mb-0">
              <div className="grid gap-6 border-t border-hairline pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
                {item.groups.map((g) => (
                  <div key={g.title} className="flex flex-col gap-3">
                    <p className="text-b2 font-semibold text-heading">{g.title}</p>
                    <ul className="flex flex-col gap-2 text-b2 text-body">
                      {g.items.map((k) => (
                        <li key={k} className="flex gap-2">
                          <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div key={item.title} className={cn("flex items-start gap-4 border-t border-hairline py-6 lg:items-center")}>
            <h3 className="contents">
              <RowHead item={item} index={i} />
            </h3>
          </div>
        ),
      )}
    </Accordion>
  );
}
