"use client";

import { useEffect, useRef, useState } from "react";

import { ArrowBackIosNewIcon } from "@/components/icons/material-symbols";
import { ctaClassName } from "@/components/shared/cta-styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * "Show more" for the Blog gallery. Every batch of cards is server-rendered (all post links are
 * in the HTML for crawlers); batches after the first are only `hidden` until the button below the
 * grid reveals the next one (hidden cards' lazy images don't load). After a click, focus moves to
 * the first new card so keyboard and screen-reader users continue from there.
 */
export function BlogPostsPager({
  pages,
  total,
  perPage,
  loadMoreLabel,
  listId,
}: {
  /** One rendered card grid per page. */
  pages: React.ReactNode[];
  total: number;
  perPage: number;
  loadMoreLabel: string;
  listId: string;
}) {
  const [shown, setShown] = useState(1);
  const root = useRef<HTMLDivElement>(null);
  const focusPage = useRef<number | null>(null);

  useEffect(() => {
    if (focusPage.current === null) return;
    root.current?.querySelector<HTMLElement>(`[data-page="${focusPage.current}"] a`)?.focus();
    focusPage.current = null;
  }, [shown]);

  const visibleCount = Math.min(total, shown * perPage);

  return (
    <div ref={root} className="flex flex-col gap-8 lg:gap-12">
      <div id={listId} className="flex flex-col gap-4 md:gap-6">
        {pages.map((page, i) => (
          <div key={i} data-page={i} hidden={i >= shown}>
            {page}
          </div>
        ))}
      </div>

      {/* Polite status for screen readers after each "Load more". */}
      <p className="sr-only" aria-live="polite">
        {shown > 1 ? `Showing ${visibleCount} of ${total} articles` : ""}
      </p>

      {shown < pages.length ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="ghost"
            aria-controls={listId}
            onClick={() => {
              focusPage.current = shown;
              setShown((n) => n + 1);
            }}
            // Full-width pill on phones (like the other section CTAs), label-sized from md.
            className={ctaClassName({ variant: "outline", className: "w-full gap-2.5 md:w-auto" })}
          >
            {loadMoreLabel}
            <ArrowBackIosNewIcon className={cn("size-5 -rotate-90")} />
          </Button>
        </div>
      ) : null}
    </div>
  );
}
