"use client";

import { AddIcon, RemoveIcon } from "@/components/icons/material-symbols";
import { RichText } from "@/components/shared/rich-text";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/content/types";

/**
 * FAQ accordion. Every question starts closed (client request 2026-10-14; the Home desktop
 * design drew item 1 open). Question titles turn green on hover.
 * No question opens by default (client rule 2026-10-22); the old `firstOpen` opt-in is removed.
 * Questions render as <h3> (Radix Accordion.Header).
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="gap-4 lg:gap-6"
    >
      {items.map((item, i) => (
        <AccordionItem
          key={item.q}
          value={`faq-${i}`}
          className="group/faq border-b border-hairline pb-8 not-last:border-b data-open:border-brand"
        >
          {/* before:*: invisible 44px-tall tap area around the 28px question row (no visual change). */}
          <AccordionTrigger className="items-center gap-4 rounded-none border-0 p-0 text-h5 font-semibold text-heading-alt transition-colors before:absolute before:inset-x-0 before:-inset-y-2 hover:text-brand hover:no-underline focus-visible:ring-offset-4 group-data-open/faq:text-brand **:data-[slot=accordion-trigger-icon]:hidden">
            <span className="flex-1">{item.q}</span>
            <AddIcon className="size-6 shrink-0 text-body group-data-open/faq:hidden" />
            <RemoveIcon className="hidden size-6 shrink-0 text-brand group-data-open/faq:block" />
          </AccordionTrigger>
          <AccordionContent
            forceMount
            className="pt-4 pb-0 text-b1 text-body [&_a]:hover:text-brand"
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
