"use client";

import { useState } from "react";

import { AddIcon, RemoveIcon } from "@/components/icons/material-symbols";
import { RichText } from "@/components/shared/rich-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/types";

const MOBILE_QUERY = "(max-width: 1023.98px)";

/**
 * FAQ accordion. Every question starts closed (client request 2026-10-14; the Home desktop
 * design drew item 1 open). Question titles turn green on hover.
 * `firstOpen` (opt-in, unused): item 1 open in the HTML (answers are always in the DOM via
 * forceMount); below lg it is shown collapsed ("pristine") until the first interaction, and its
 * first tap opens it rather than closing it.
 * Questions render as <h3> (Radix Accordion.Header).
 */
export function FaqAccordion({ items, firstOpen = false }: { items: FaqItem[]; firstOpen?: boolean }) {
  const [value, setValue] = useState(firstOpen ? "faq-0" : "");
  const [pristine, setPristine] = useState(firstOpen);

  const onValueChange = (next: string) => {
    const keepFirstOpen = firstOpen && pristine && next === "" && window.matchMedia(MOBILE_QUERY).matches;
    setPristine(false);
    if (!keepFirstOpen) setValue(next);
  };

  return (
    <Accordion
      type="single"
      collapsible
      value={value}
      onValueChange={onValueChange}
      data-pristine={pristine ? "" : undefined}
      className="gap-4 lg:gap-6"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`faq-${i}`}
          className="group/faq border-b border-hairline pb-8 not-last:border-b data-open:border-brand max-lg:in-data-pristine:border-hairline!"
        >
          {/* before:*: invisible 44px-tall tap area around the 28px question row (no visual change). */}
          <AccordionTrigger className="items-center gap-4 rounded-none border-0 p-0 text-h5 font-semibold text-heading-alt transition-colors before:absolute before:inset-x-0 before:-inset-y-2 hover:text-brand hover:no-underline focus-visible:ring-offset-4 group-data-open/faq:text-brand max-lg:in-data-pristine:text-heading-alt max-lg:in-data-pristine:hover:text-brand **:data-[slot=accordion-trigger-icon]:hidden">
            <span className="flex-1">{item.q}</span>
            <AddIcon className="size-6 shrink-0 text-body group-data-open/faq:hidden max-lg:in-data-pristine:block" />
            <RemoveIcon className="hidden size-6 shrink-0 text-brand group-data-open/faq:block max-lg:in-data-pristine:hidden" />
          </AccordionTrigger>
          <AccordionContent
            forceMount
            className="pt-4 pb-0 text-b1 text-body max-lg:in-data-pristine:hidden [&_a]:hover:text-brand"
          >
            <p>
              <RichText value={item.a} />
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
