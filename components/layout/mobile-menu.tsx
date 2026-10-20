"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ScheduleMeetingButton } from "@/components/calendly/schedule-meeting-button";
import { MenuBarsIcon } from "@/components/icons/brand-icons";
import { CloseIcon } from "@/components/icons/material-symbols";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { MenuGroup } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Hamburger menu (mobile header + the hamburger drawn at the right of the desktop pill).
 * Panel content is not designed; it reuses the header groups as an accordion.
 */
export function MobileMenu({
  items,
  ctaLabel,
  tone = "dark",
  className,
}: {
  items: MenuGroup[];
  /** Label of the scheduler button at the bottom of the panel (Site Settings → Header). */
  ctaLabel?: string;
  /** dark bars on the white mobile bar, light bars on the dark desktop pill */
  tone?: "dark" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(
          "flex size-11 items-center justify-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
          tone === "dark" ? "text-heading" : "text-white",
          className,
        )}
      >
        <MenuBarsIcon className="h-[18px] w-6" />
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-full gap-0 border-l-0 bg-white p-0 data-[side=right]:w-full sm:data-[side=right]:max-w-sm"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-hairline px-4">
          <Link href="/" aria-label="Xconcile home" onClick={() => setOpen(false)}>
            <Image src="/images/brand/logo-color.svg" alt="Xconcile" width={187} height={41} className="h-10 w-auto" unoptimized />
          </Link>
          <SheetClose
            aria-label="Close menu"
            className="flex size-11 items-center justify-center rounded-md text-heading outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <CloseIcon className="size-6" />
          </SheetClose>
        </div>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4">
          <Accordion type="single" collapsible>
            {items.map((group) => (
              <AccordionItem key={group.label} value={group.label} className="border-b border-hairline">
                <AccordionTrigger className="rounded-none py-4 text-h5 text-heading hover:no-underline data-open:text-brand **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-heading">
                  {group.label}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <ul className="flex flex-col gap-1">
                    {group.items.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-md px-3 py-2 text-b1 font-medium text-body no-underline! transition-colors hover:bg-brand-50 hover:text-brand"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </nav>

        <div className="shrink-0 border-t border-hairline p-4">
          <ScheduleMeetingButton block="always" onClick={() => setOpen(false)}>
            {ctaLabel}
          </ScheduleMeetingButton>
        </div>
      </SheetContent>
    </Sheet>
  );
}
