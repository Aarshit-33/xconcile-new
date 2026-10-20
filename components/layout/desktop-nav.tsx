"use client";

import Link from "next/link";
import { useState } from "react";

import { useCalendly } from "@/components/calendly/calendly-provider";
import { NavIcon } from "@/components/icons/nav-icons";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { MenuGroup, MenuPromo } from "@/content/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop dropdown nav (Services, Hire Experts, Industries, Resources, Company).
 *
 * Dropdown panels copy the OLD live site's mega menu (client request 2026-10-16; not in the
 * Figma): 896px white panel, 12px radius, grey hairline + large shadow, uppercase group label,
 * 2-column list (teal icon tile, bold title, 2-line description) and, for the page menus, the
 * dark "Ready to scale?" card. Colours are the old site's palette as hex values (teal
 * primary-50/100/600/700, neutral greys), not this site's tokens: a deliberate, client-requested
 * exception to AGENTS.md rule 3, like the old-site contact section. The closed navbar is unchanged.
 *
 * Panels are centred under the whole menu (items are `static`, so they position against the
 * menu root) so the wide panels never run off-screen under Resources/Company.
 *
 * Force-mounted so every link is in the server HTML for crawlers. Force-mounting makes every
 * panel a live Radix dismissable layer, and a pointerdown inside the open panel is "outside" for
 * all the closed ones, which dismissed the whole menu before the click reached the link (links
 * never navigated). `keepOpenInsideNav` ignores outside events that start inside this nav;
 * clicks elsewhere on the page still close it.
 */
const keepOpenInsideNav = (event: Event) => {
  if ((event.target as Element | null)?.closest?.('[data-slot="navigation-menu"]'))
    event.preventDefault();
};

export function DesktopNav({ items, promo }: { items: MenuGroup[]; promo: MenuPromo }) {
  // Controlled so "Free Consultation" can close the menu before the Calendly popup opens.
  const [open, setOpen] = useState("");
  const { openScheduler } = useCalendly();

  return (
    <NavigationMenu viewport={false} aria-label="Main" value={open} onValueChange={setOpen}>
      <NavigationMenuList className="gap-8">
        {items.map((group) => (
          <NavigationMenuItem key={group.label} value={group.label} className="static">
            {/* Thin chevron = shadcn's built-in icon, sized to the design (10×5 glyph) */}
            <NavigationMenuTrigger className="h-auto gap-1 rounded-none bg-transparent px-0 py-0 text-b1 font-medium text-(color:--header-fg) hover:bg-transparent hover:text-brand focus:bg-transparent focus:text-brand data-open:bg-transparent data-open:text-brand data-open:hover:bg-transparent data-open:focus:bg-transparent [&>svg]:top-0 [&>svg]:ml-0 [&>svg]:size-5">
              {group.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent
              forceMount
              onPointerDownOutside={keepOpenInsideNav}
              onFocusOutside={keepOpenInsideNav}
              className={cn(
                // Old site: w-[56rem] bg-white rounded-xl shadow-2xl border-neutral-200 p-6,
                // fade + slide-in-from-top-2, 200ms.
                "left-1/2! mt-3! w-[56rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-[12px]! border border-[#e5e5e5] bg-white! p-6! text-[#171717] shadow-2xl! ring-0! md:w-[56rem] data-closed:hidden",
                "[--tw-enter-scale:1]! group-data-[viewport=false]/navigation-menu:duration-200 group-data-[viewport=false]/navigation-menu:data-open:slide-in-from-top-2",
              )}
            >
              <div className={cn(group.promo && "grid grid-cols-12 gap-8")}>
                <div className={cn(group.promo && "col-span-8")}>
                  <div className="mb-4 flex items-center justify-between border-b border-[#f5f5f5] pb-2">
                    <p className="text-sm font-bold tracking-wider text-[#a3a3a3] uppercase">
                      {group.label}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                    {group.items.map((link) => (
                      <li key={link.label}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={link.href}
                            className="group/item flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-[#fafafa] focus:bg-[#fafafa]"
                          >
                            <span className="mt-1 rounded-lg bg-[#e8f0f2] p-2 text-[#165a6a] transition-colors group-hover/item:bg-[#d1e2e6] group-hover/item:text-[#10434f]">
                              <NavIcon name={link.icon} className="size-6!" />
                            </span>
                            <span className="flex flex-col">
                              <span className="text-base font-bold text-[#171717] transition-colors group-hover/item:text-[#165a6a]">
                                {link.label}
                              </span>
                              <span className="mt-0.5 line-clamp-2 text-sm font-normal text-[#737373]">
                                {link.description}
                              </span>
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {group.promo ? (
                  <div className="group/promo relative col-span-4 flex flex-col justify-between overflow-hidden rounded-[12px] bg-[#171717] p-6 text-white">
                    <div
                      aria-hidden
                      className="absolute top-0 right-0 -mt-8 -mr-8 size-32 rounded-full bg-[#1c7185]/10 blur-2xl transition-all duration-500 group-hover/promo:bg-[#1c7185]/20"
                    />
                    <div>
                      <span className="mb-3 inline-block rounded bg-[#1c7185]/20 px-2 py-1 text-xs font-bold tracking-widest text-[#76a9b5] uppercase">
                        {promo.badge}
                      </span>
                      <p className="mb-2 text-xl font-bold">{promo.title}</p>
                      <p className="mb-4 text-sm leading-relaxed font-normal text-[#a3a3a3]">
                        {promo.body}
                      </p>
                    </div>
                    <Button
                      type="button"
                      aria-haspopup="dialog"
                      onClick={() => {
                        setOpen("");
                        openScheduler();
                      }}
                      className="h-auto w-full rounded-lg border-none bg-white px-4 py-2 text-sm font-bold text-[#171717] shadow-md transition-all duration-200 hover:bg-[#f5f5f5] hover:shadow-lg"
                    >
                      {promo.cta}
                    </Button>
                  </div>
                ) : null}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
