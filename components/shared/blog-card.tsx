import Image from "next/image";
import Link from "next/link";

import {
  ArrowForwardIcon,
  CalendarTodayIcon,
  History2Icon,
} from "@/components/icons/material-symbols";
import { routes } from "@/lib/routes";
import type { PostCard } from "@/sanity/lib/queries";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/** Trims body text to a whole word and adds an ellipsis (design: "…the tax ....."). */
function toExcerpt(text: string | null, max = 120) {
  if (!text) return null;
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, clean.lastIndexOf(" ", max)).replace(/[,.;:]$/, "")}…`;
}

/**
 * Class for the list item around a `BlogCard` in a 3-column grid: from lg each card spans 4
 * shared rows (cover / title / excerpt / footer) via subgrid, so excerpts start on one line even
 * when titles wrap differently (user request 2026-10-25). Works for any number of rows.
 */
export const blogCardItemClassName = "lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0";

/**
 * Extra class for grids that show 2 columns on tablets (md, 768–1023px): a lone last card (odd
 * count) is centred at card width instead of sitting alone on the left. Not for 1-column grids.
 */
export const blogCardTabletOrphanClassName =
  "md:max-lg:last:odd:col-span-2 md:max-lg:last:odd:mx-auto md:max-lg:last:odd:w-[calc(50%-12px)]";

/**
 * Blog post card, the same on every page (Home "Helpful Accounting Insights", Blog gallery).
 * The whole card is one link (stretched title link); "Read more" is visual only.
 * `sizes`: cover image sizes for the grid it sits in (default: 1 column below lg, 3 from lg).
 */
export function BlogCard({
  post,
  sizes = "(min-width: 1440px) 416px, (min-width: 1024px) 30vw, 100vw",
}: {
  post: PostCard;
  sizes?: string;
}) {
  const excerpt = toExcerpt(post.excerpt);
  const readTime = post.readTime?.trim();

  return (
    <article className="img-zoom-trigger group/post relative flex h-full flex-col lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
      {/* 16:9 = the live posts' image ratio, so their covers (titles baked in) fill the box uncropped.
          object-cover (user report 2026-10-24: "image fix full width"): a cover in another ratio
          fills the full card width instead of showing grey bars (was object-contain, audit M4). */}
      {/* Cover zooms on card hover (client request 2026-10-22). */}
      <div className="relative aspect-video img-zoom overflow-hidden rounded-t-md">
        <Image
          src={post.image ?? "/images/home/blog-fallback.jpg"}
          alt={post.imageAlt ?? ""}
          fill
          sizes={sizes}
          className="bg-surface-alt object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-b-md border border-t-0 border-line/60 bg-white p-6 lg:row-span-3 lg:grid lg:grid-rows-subgrid">
        <div className="flex flex-col gap-4 lg:contents">
          {/* Title turns green while the card (one stretched link) is hovered (client request). */}
          {/* Full title (2-line clamp removed 2026-10-22: it cut titles mid-word at every width). */}
          <h3 className="font-display text-h5 font-medium text-black transition-colors group-hover/post:text-brand">
            <Link
              href={post.href ?? routes.post(post.slug)}
              className="outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {post.title}
            </Link>
          </h3>
          {excerpt ? (
            <p className="line-clamp-2 text-b1 text-body">{excerpt}</p>
          ) : (
            // Keeps the footer in the 4th shared row on desktop when a post has no excerpt.
            <span aria-hidden className="hidden lg:block" />
          )}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4">
          <p className="flex items-center gap-4 font-display text-b2 font-normal whitespace-nowrap text-meta">
            {post.publishedAt ? (
              <span className="flex items-center gap-1">
                <CalendarTodayIcon className="size-4" />
                <time dateTime={post.publishedAt}>
                  {dateFormat.format(new Date(post.publishedAt))}
                </time>
              </span>
            ) : null}
            {readTime ? (
              <span className="flex items-center gap-1">
                <History2Icon className="size-4" />
                <span>
                  {readTime}
                  <span className="sr-only"> read</span>
                </span>
              </span>
            ) : null}
          </p>
          <span
            aria-hidden
            className="flex shrink-0 items-center gap-2 text-b1 font-medium text-brand"
          >
            Read more
            <ArrowForwardIcon className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
