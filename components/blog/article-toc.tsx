"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";

import { cn } from "@/lib/utils";
import type { TocItem } from "@/sanity/lib/blog-post";

/** A heading counts as "being read" once its top passes this line (px from the viewport top). */
const ACTIVE_LINE = 160;

/**
 * Table of Contents (design pages/blog/page.svg). Desktop: sticky card on the left that stays
 * in view while the article scrolls; the section being read is highlighted green and the bar
 * on the right fills with reading progress. Phones/tablets (mobile first): a collapsible
 * "Table of Contents" box above the article (closes after a link is picked).
 * Entries: the article's H2 headings + the FAQ section (sanity/lib/blog-post.ts).
 */
export function ArticleToc({ items, articleId }: { items: TocItem[]; articleId: string }) {
  const [active, setActive] = useState(items[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = items[0]?.id;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = item.id;
      }
      setActive(current);

      const article = document.getElementById(articleId);
      if (article) {
        const { top, height } = article.getBoundingClientRect();
        const total = height - window.innerHeight * 0.6;
        setProgress(total > 0 ? Math.min(1, Math.max(0, (ACTIVE_LINE - top) / total)) : 1);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items, articleId]);

  if (!items.length) return null;

  const links = (onPick?: (e: MouseEvent<HTMLAnchorElement>) => void) => (
    <ol className="flex flex-col gap-4">
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={isActive ? "location" : undefined}
              onClick={onPick}
              className={cn(
                "block text-b2 leading-5 transition-colors hover:text-brand lg:text-b1 lg:leading-5",
                isActive ? "text-brand" : "text-heading",
              )}
            >
              {item.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Phones / tablets: collapsible box above the article. */}
      <details className="group rounded-md border border-line/60 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-b1 font-medium text-heading [&::-webkit-details-marker]:hidden">
          Table of Contents
          {/* 20px chevron (client note 2026-10-28: the ▾ glyph was too small). */}
          <ChevronDown
            aria-hidden
            className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180"
          />
        </summary>
        <nav aria-label="Table of contents" className="border-t border-line/60 px-4 py-4">
          {links((e) => e.currentTarget.closest("details")?.removeAttribute("open"))}
        </nav>
      </details>

      {/* Desktop: sticky card with the reading-progress bar. */}
      <nav
        aria-label="Table of contents"
        className="sticky top-header-offset hidden max-h-[calc(100vh-var(--spacing-header-offset)-24px)] flex-col overflow-hidden rounded-md border border-line/60 bg-white lg:flex"
      >
        <p className="border-b border-line/60 px-4 py-3 text-b1 font-medium text-heading">Table of Contents</p>
        <div className="flex min-h-0 gap-4 py-6 pr-6 pl-4">
          <div className="min-w-0 flex-1 overflow-y-auto pr-1">{links()}</div>
          {/* Reading progress: light green track, brand-green fill. */}
          <div aria-hidden className="relative w-1.5 shrink-0 rounded-full bg-brand-50">
            <div
              className="absolute inset-x-0 top-0 rounded-full bg-brand transition-[height] duration-150"
              style={{ height: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </nav>
    </>
  );
}
