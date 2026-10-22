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

/**
 * B6 Numbered services accordion.
 * Mobile design: white section, items separated by 16px (top + bottom hairlines); an open item
 * gets #FAFAFA with description, "Key services" and a full-width CTA.
 * Desktop design: dark gradient, number + icon + title + description rows, 5 visible +
 * "Show more services (n)". The open item gets the green title + top rule.
 * All items start collapsed on every screen (client rule 2026-10-22: no accordion opens by
 * default). The design drew item 1 open on mobile and green on desktop; both dropped, along with
 * the old "pristine" workaround that kept item 1 open-but-hidden on desktop.
 * Client rule: service items turn green on hover.
 */
export function ServicesAccordionList({ data }: { data: ServicesContent }) {
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = Math.max(0, data.items.length - data.initiallyVisible);

  return (
    <div className="mx-auto w-full max-w-[1078px]">
      <Accordion
        type="single"
        collapsible
        className="gap-4 lg:gap-0 lg:border-b lg:border-white/10"
      >
        {data.items.map((item, i) => (
          <AccordionItem
            key={item.title}
            value={`service-${i}`}
            className={cn(
              "group/item border-y border-hairline transition-colors not-last:border-b data-open:bg-surface-muted lg:border-t lg:border-b-0 lg:border-white/10 lg:not-last:border-b-0 lg:hover:border-t-brand lg:data-open:border-t-brand lg:data-open:bg-transparent",
              !showAll && i >= data.initiallyVisible && "lg:hidden",
            )}
          >
            <AccordionTrigger className="min-w-0 items-center gap-4 rounded-none px-4 py-6 group-data-open/item:items-start group-data-open/item:px-0 hover:no-underline focus-visible:ring-inset lg:gap-0 lg:px-0 lg:group-data-open/item:items-center **:data-[slot=accordion-trigger-icon]:hidden">
              <span aria-hidden className="hidden w-[17px] shrink-0 text-b1 text-brand lg:block">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              <Icon name={item.icon} className="size-6 shrink-0 text-brand lg:ml-[46px]" />
              <span className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-14">
                {/* Full title always shown: wraps on narrow screens (was `truncate`, which cut long
                    names to "Hire Dedicated Acc…" at 320–390px; client report 2026-10-22). */}
                <span className="text-h5 text-heading transition-colors group-hover/item:text-brand lg:text-white lg:group-hover/item:text-brand lg:group-data-open/item:text-brand">
                  {item.title}
                </span>{" "}
                {/* font-normal: copy weight (2026-10-22); the trigger button itself is font-medium. */}
                <span className="hidden text-b2 font-normal text-body group-data-open/item:block lg:block lg:text-on-dark">
                  {item.description}
                </span>
              </span>
              <span
                aria-hidden
                className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-surface-muted p-0.5 lg:ml-6 lg:bg-[rgb(250_250_250/0.08)]"
              >
                <AddIcon className="size-6 text-brand group-data-open/item:hidden" />
                <RemoveIcon className="hidden size-6 text-brand group-data-open/item:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent forceMount className="px-0 pb-6 lg:pb-8 lg:pl-[143px] [&_a]:no-underline [&_a]:hover:text-white [&_p:not(:last-child)]:mb-0">
              <div className="flex flex-col gap-6 border-t border-hairline pt-6 lg:border-white/10">
                {item.keyItems?.length ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-b2 font-semibold text-heading lg:text-white">{item.keyLabel}:</p>
                    <ul className="grid gap-2 text-b2 text-body sm:grid-cols-2 lg:max-w-[640px] lg:gap-x-8 lg:text-on-dark">
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
                        <ul className="flex flex-col gap-2 text-b2 text-body lg:text-on-dark">
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
