"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowBackIosNewIcon } from "@/components/icons/material-symbols";
import { ctaClassName } from "@/components/shared/cta-styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ALL = "__all__";

/**
 * Case study grid with industry filter tabs and "Show more" (user request 2026-10-27).
 * Every card is server-rendered (all links are in the HTML for crawlers); filtering and paging
 * only toggle `hidden`, so hidden cards' lazy photos don't load. Picking a tab starts again at
 * the first `perPage` cards. After "Show more", focus moves to the first new card.
 * Tablets (2 columns): a lone last card is centred instead of sitting alone on the left.
 */
export function CaseStudyGrid({
  items,
  industries,
  perPage,
  allLabel,
  loadMoreLabel,
  listId,
}: {
  /** Rendered cards with their industry (for the filter). */
  items: { id: string; industry: string; card: React.ReactNode }[];
  /** Filter tabs after "All", in display order. */
  industries: string[];
  perPage: number;
  allLabel: string;
  loadMoreLabel: string;
  listId: string;
}) {
  const [active, setActive] = useState(ALL);
  const [shown, setShown] = useState(1);
  const list = useRef<HTMLUListElement>(null);
  const focusIndex = useRef<number | null>(null);

  const matches = items.filter((i) => active === ALL || i.industry === active);
  const visibleCount = Math.min(matches.length, shown * perPage);
  const visible = new Set(matches.slice(0, visibleCount).map((i) => i.id));
  const lastVisibleId = matches[visibleCount - 1]?.id;

  useEffect(() => {
    if (focusIndex.current === null) return;
    const id = matches[focusIndex.current]?.id;
    focusIndex.current = null;
    if (id) list.current?.querySelector<HTMLElement>(`[data-id="${CSS.escape(id)}"] a`)?.focus();
  }, [shown, matches]);

  const tabs = [
    { value: ALL, label: allLabel },
    ...industries.map((i) => ({ value: i, label: i })),
  ];

  return (
    <div className="flex flex-col gap-8 lg:gap-12">
      {industries.length > 1 ? (
        <div
          role="group"
          aria-label="Filter case studies by industry"
          aria-controls={listId}
          // Same pill bar as Home's case-study tabs: hugs its pills, centred, scrolls sideways
          // from the first tab when the pills don't fit.
          className="mx-auto no-scrollbar flex h-14 w-fit max-w-full items-center justify-start gap-6 overflow-x-auto rounded-[35px] border border-hairline bg-brand-50 px-4 max-[360px]:gap-2"
        >
          {tabs.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={active === t.value}
              onClick={() => {
                setActive(t.value);
                setShown(1);
              }}
              className="relative h-9 flex-none cursor-pointer rounded-[32px] border border-line bg-white px-6 text-b1 font-medium text-body transition-colors before:absolute before:inset-x-0 before:-inset-y-1 hover:text-heading aria-pressed:border-brand aria-pressed:bg-brand aria-pressed:text-white max-[360px]:px-4"
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : null}

      <ul id={listId} ref={list} className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {items.map((i) => (
          <li
            key={i.id}
            data-id={i.id}
            hidden={!visible.has(i.id)}
            className={cn(
              // Odd count on tablets: centre the lone last card at card width.
              visibleCount % 2 === 1 &&
                i.id === lastVisibleId &&
                "md:max-lg:col-span-2 md:max-lg:mx-auto md:max-lg:w-[calc(50%-12px)]",
            )}
          >
            {i.card}
          </li>
        ))}
      </ul>

      <p className="sr-only" aria-live="polite">
        {`Showing ${visibleCount} of ${matches.length} case studies`}
      </p>

      {visibleCount < matches.length ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            aria-controls={listId}
            onClick={() => {
              focusIndex.current = visibleCount;
              setShown((n) => n + 1);
            }}
            className={ctaClassName({ variant: "outline", className: "w-full gap-2.5 md:w-auto" })}
          >
            {loadMoreLabel}
            <ArrowBackIosNewIcon className="size-5 -rotate-90" />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
