"use client";

import { useState } from "react";

import { AddIcon, ArrowBackIosNewIcon, RemoveIcon } from "@/components/icons/material-symbols";
import { SvgPathIcon } from "@/components/icons/svg-path-icon";
import { cardTones, defaultToneCycle } from "@/components/shared/card-tones";
import { CtaLink } from "@/components/shared/cta";
import { ctaClassName } from "@/components/shared/cta-styles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { ServicesContent } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * B6 Numbered services accordion. Dark palette on every screen (user request 2026-10-24: mobile
 * matches desktop; the mobile design drew a white section with #FAFAFA open rows).
 * Mobile layout: items separated by 16px (top + bottom rules); an open item shows its
 * description, "Key services" and a full-width CTA (background unchanged, user request 2026-10-24).
 * Desktop layout: number + icon + title + description rows, 5 visible +
 * "Show more services (n)". The open item gets the green title + top rule.
 * All items start collapsed on every screen (client rule 2026-10-22: no accordion opens by
 * default). The design drew item 1 open on mobile and green on desktop; both dropped, along with
 * the old "pristine" workaround that kept item 1 open-but-hidden on desktop.
 * Client rule: service items turn green on hover.
 * `iconPaths[i]`: item i's icon path, resolved by the server parent (services.tsx) so this client
 * component doesn't bundle the whole icon set.
 */
export function ServicesAccordionList({
  data,
  iconPaths,
}: {
  data: ServicesContent;
  iconPaths: (string | undefined)[];
}) {
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
              "group/item border-y border-white/10 transition-colors not-last:border-b lg:border-t lg:border-b-0 lg:not-last:border-b-0 lg:hover:border-t-brand lg:data-open:border-t-brand",
              !showAll && i >= data.initiallyVisible && "lg:hidden",
            )}
          >
            <AccordionTrigger className="min-w-0 items-center gap-4 rounded-none px-4 py-6 group-data-open/item:items-start group-data-open/item:px-0 hover:no-underline focus-visible:ring-inset **:data-[slot=accordion-trigger-icon]:hidden lg:gap-0 lg:px-0 lg:group-data-open/item:items-center">
              <span aria-hidden className="hidden w-[17px] shrink-0 text-b1 text-brand lg:block">
                {String(i + 1).padStart(2, "0")}
              </span>{" "}
              {iconPaths[i] ? (
                <SvgPathIcon d={iconPaths[i]} className="size-6 shrink-0 text-brand lg:ml-[46px]" />
              ) : null}
              <span className="flex min-w-0 flex-1 flex-col gap-2 lg:ml-14">
                {/* Full title always shown: wraps on narrow screens (was `truncate`, which cut long
                    names to "Hire Dedicated Acc…" at 320–390px; client report 2026-10-22). */}
                <span className="text-h5 text-white transition-colors group-hover/item:text-brand group-data-open/item:text-brand">
                  {item.title}
                </span>{" "}
                {/* font-normal: copy weight (2026-10-22); the trigger button itself is font-medium. */}
                <span className="hidden text-b2 font-normal text-on-dark group-data-open/item:block lg:block">
                  {item.description}
                </span>
              </span>
              <span
                aria-hidden
                className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[rgb(250_250_250/0.08)] p-0.5 lg:ml-6"
              >
                <AddIcon className="size-6 text-brand group-data-open/item:hidden" />
                <RemoveIcon className="hidden size-6 text-brand group-data-open/item:block" />
              </span>
            </AccordionTrigger>
            <AccordionContent
              forceMount
              className="px-0 pb-6 lg:pb-8 lg:pl-[143px] [&_a]:no-underline [&_a]:hover:text-white [&_p:not(:last-child)]:mb-0"
            >
              <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
                {item.keyItems?.length ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-b2 font-semibold text-white">{item.keyLabel}:</p>
                    <ul className="grid gap-2 text-b2 text-on-dark sm:grid-cols-2 lg:max-w-[640px] lg:gap-x-8">
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
                  // Grouped tasks (service pages): long sentences, so one column per group. Each
                  // group is a card in the Home "Key Challenges" colours (Studio → Card colour,
                  // user request 2026-10-26), borderless, no hover; empty colour =
                  // challenges order.
                  <div className="grid gap-4 lg:max-w-[880px] lg:grid-cols-2 lg:gap-6">
                    {item.groups.map((g, gi) => {
                      const tone = g.tone ?? defaultToneCycle[gi % defaultToneCycle.length];
                      const t = tone === "transparent" ? null : cardTones[tone];
                      return (
                        <div
                          key={g.title}
                          className={cn(
                            // No border and no hover effect (user requests 2026-10-26). Tint a little
                            // stronger than the Key Challenges cards (`groupBg`, card-tones.ts).
                            "flex flex-col gap-3 rounded-md p-4 lg:p-6",
                            t ? t.groupBg : "bg-transparent",
                          )}
                        >
                          <p
                            className={cn(
                              "text-b2 font-semibold",
                              t ? "text-heading" : "text-white",
                            )}
                          >
                            {g.title}
                          </p>
                          <ul
                            className={cn(
                              "flex flex-col gap-2 text-b2",
                              t ? "text-body" : "text-on-dark",
                            )}
                          >
                            {g.items.map((k) => (
                              <li key={k} className="flex gap-2">
                                {/* Bullet in the card's ink colour (brand green on transparent). */}
                                <span
                                  aria-hidden
                                  className={cn(
                                    "mt-1.5 size-2 shrink-0 rounded-full",
                                    t ? ["bg-current", t.icon] : "bg-brand",
                                  )}
                                />
                                {k}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
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
