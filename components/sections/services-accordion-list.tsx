"use client";

import { useState } from "react";

import { Icon } from "@/components/icons/registry";
import { AddIcon, ArrowBackIosNewIcon, RemoveIcon } from "@/components/icons/material-symbols";
import { CtaLink } from "@/components/shared/cta";
import { ctaClassName } from "@/components/shared/cta-styles";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ServicesContent } from "@/content/types";
import { cn } from "@/lib/utils";

const DESKTOP_QUERY = "(min-width: 1024px)";

/**
 * B6 Numbered services accordion.
 * Mobile design: white section, items separated by 16px (top + bottom hairlines), first item
 * open (#FAFAFA) with description, "Key services" and a full-width CTA.
 * Desktop design: dark gradient, number + icon + title + description rows, 5 visible +
 * "Show more services (n)". The list starts collapsed with NO item highlighted (client request
 * 2026-10-14: the design's green item 1 is not wanted). Item 1 starts open (mobile), so on desktop
 * it stays visually collapsed and un-highlighted ("pristine") until the first interaction; its
 * first click then opens it instead of closing. The open-state green (title + top rule) applies
 * only once the list is no longer pristine.
 * Client rule: service items turn green on hover.
 */
export function ServicesAccordionList({ data }: { data: ServicesContent }) {
  const [showAll, setShowAll] = useState(false);
  const [value, setValue] = useState("service-0");
  const [pristine, setPristine] = useState(true);
  const hiddenCount = Math.max(0, data.items.length - data.initiallyVisible);

  const onValueChange = (next: string) => {
    const keepFirstOpen = pristine && next === "" && window.matchMedia(DESKTOP_QUERY).matches;
    setPristine(false);
    if (!keepFirstOpen) setValue(next);
  };

  return (
    <div className="mx-auto w-full max-w-[1078px]">
      <Accordion
        type="single"
        collapsible
        value={value}
        onValueChange={onValueChange}
        data-pristine={pristine ? "" : undefined}
        // Pristine (desktop): item 1 is open in state but drawn collapsed. The collapse uses the
        // accordion's own grid-rows transition (not display:none), so the first click opens it
        // smoothly like every other row (audit A4, 2026-10-18).
        className="gap-4 lg:gap-0 lg:border-b lg:border-white/10 lg:data-pristine:[&_[data-slot=accordion-content]>div]:invisible lg:data-pristine:[&_[data-slot=accordion-content]>div]:grid-rows-[0fr]"
      >
        {data.items.map((item, i) => (
          <AccordionItem
            key={item.title}
            value={`service-${i}`}
            className={cn(
              "group/item border-y border-hairline transition-colors not-last:border-b data-open:bg-surface-muted lg:border-t lg:border-b-0 lg:border-white/10 lg:not-last:border-b-0 lg:hover:border-t-brand lg:data-open:bg-transparent",
              !pristine && "lg:data-open:border-t-brand",
              !showAll && i >= data.initiallyVisible && "lg:hidden",
            )}
          >
            <AccordionTrigger className="min-w-0 items-center gap-4 rounded-none px-4 py-6 group-data-open/item:items-start group-data-open/item:px-0 hover:no-underline focus-visible:ring-inset lg:gap-0 lg:px-0 lg:group-data-open/item:items-center **:data-[slot=accordion-trigger-icon]:hidden">
              <span aria-hidden className="hidden w-[17px] shrink-0 text-b1 text-brand lg:block">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              <Icon name={item.icon} className="size-6 shrink-0 text-brand lg:ml-[46px]" />
              <span className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-14">
                <span
                  className={cn(
                    "truncate text-h5 text-heading transition-colors group-hover/item:text-brand group-data-open/item:whitespace-normal lg:whitespace-normal lg:text-white lg:group-hover/item:text-brand",
                    !pristine && "lg:group-data-open/item:text-brand",
                  )}
                >
                  {item.title}
                </span>{" "}
                <span className="hidden text-b2 font-medium text-body group-data-open/item:block lg:block lg:text-on-dark">
                  {item.description}
                </span>
              </span>
              <span
                aria-hidden
                className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-muted p-0.5 lg:ml-6 lg:bg-[rgb(250_250_250/0.08)]"
              >
                <AddIcon className="size-6 text-brand group-data-open/item:hidden lg:in-data-pristine:block" />
                <RemoveIcon className="hidden size-6 text-brand group-data-open/item:block lg:in-data-pristine:hidden" />
              </span>
            </AccordionTrigger>
            <AccordionContent forceMount className="px-0 pb-6 lg:pb-8 lg:pl-[143px] [&_a]:no-underline [&_a]:hover:text-white [&_p:not(:last-child)]:mb-0">
              <div className="flex flex-col gap-6 border-t border-hairline pt-6 lg:border-white/10">
                {item.keyItems?.length ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-b2 font-semibold text-heading lg:text-white">{item.keyLabel}:</p>
                    <ul className="grid gap-2 text-b2 font-medium text-body sm:grid-cols-2 lg:max-w-[640px] lg:gap-x-8 lg:text-on-dark">
                      {item.keyItems.map((k) => (
                        <li key={k} className="flex items-center gap-2">
                          <span aria-hidden className="size-2 shrink-0 rounded-full bg-brand" />
                          {k}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {item.groups?.length ? (
                  // Grouped tasks (service pages): long sentences, so one column per group.
                  <div className="grid gap-6 lg:max-w-[880px] lg:grid-cols-2 lg:gap-x-10">
                    {item.groups.map((g) => (
                      <div key={g.title} className="flex flex-col gap-3">
                        <p className="text-b2 font-semibold text-heading lg:text-white">{g.title}</p>
                        <ul className="flex flex-col gap-2 text-b2 font-medium text-body lg:text-on-dark">
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
                ) : null}
                {item.cta ? (
                  <div>
                    <CtaLink href={item.cta.href} block>
                      {item.cta.label}
                    </CtaLink>
                  </div>
                ) : null}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {hiddenCount > 0 ? (
        <div className="mt-8 hidden justify-center lg:flex">
          <Button
            type="button"
            variant="ghost"
            aria-expanded={showAll}
            onClick={() => setShowAll((v) => !v)}
            className={ctaClassName({
              variant: "outline-dark",
              className: "gap-2.5 bg-dark-card px-4 hover:text-brand",
            })}
          >
            {showAll ? "Show fewer services" : `Show more services (${hiddenCount})`}
            <ArrowBackIosNewIcon
              className={cn("size-5 transition-transform", showAll ? "rotate-90" : "-rotate-90")}
            />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
