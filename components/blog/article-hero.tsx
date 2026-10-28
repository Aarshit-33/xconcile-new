import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

import { AlarmIcon, CalendarTodayIcon } from "@/components/icons/material-symbols";
import { Eyebrow } from "@/components/shared/eyebrow";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import type { BlogArticle } from "@/sanity/lib/blog-post";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const initials = (name: string) =>
  name
    .replace(/,.*$/, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/**
 * Article hero (design pages/blog/page.svg): dark band, breadcrumb (Home / Blog / title),
 * "Blog" pill, H1, then the author (photo, name, title), date and read time: a small card on
 * phones, the drawn single-line pill from sm.
 * SEO articles (design pages/article/page.svg): breadcrumb Home / title and no pill
 * (`crumbs={[]}`, `badge={null}`).
 */
export function ArticleHero({
  article,
  crumbs = [{ label: "Blog", href: routes.blog() }],
  badge = "Blog",
}: {
  article: BlogArticle;
  /** Links between "Home" and the title. */
  crumbs?: { label: string; href: string }[];
  badge?: string | null;
}) {
  const { author } = article;
  return (
    <section aria-labelledby="article-title" className="relative overflow-hidden bg-dark-gradient">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(360px_300px_at_100%_90%,var(--color-brand-glow),transparent_72%)] lg:bg-[radial-gradient(640px_420px_at_100%_100%,var(--color-brand-glow),transparent_72%)]"
      />
      <div className="relative container-site flex flex-col gap-6 pt-8 pb-10 lg:gap-8 lg:pt-[132px] lg:pb-[60px]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-b2 text-white/60">
            <li>
              <Link href={routes.home()} className="hover:text-white">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <Fragment key={c.href}>
                <li aria-hidden>/</li>
                <li>
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                </li>
              </Fragment>
            ))}
            <li aria-hidden>/</li>
            <li aria-current="page" className="line-clamp-1 text-white">
              {article.title}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col items-start gap-4 lg:gap-6">
          {badge ? <Eyebrow tone="hero">{badge}</Eyebrow> : null}
          <h1
            id="article-title"
            className="max-w-[900px] text-h2-m text-white md:text-h2 lg:text-[52px] lg:leading-[58px]"
          >
            {article.title}
          </h1>
        </div>

        {/* Mobile first: a small card, author on top and date + read time on one row under a
            divider (the single-line pill wrapped badly on phones, user report 2026-10-26).
            From sm the drawn single-line pill. */}
        <div
          className={cn(
            "flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-b2 text-white sm:w-fit sm:max-w-full sm:flex-row sm:items-center sm:gap-6 sm:rounded-[40px] sm:py-2 sm:pr-6",
            author ? "sm:pl-2" : "px-4 sm:pl-6",
          )}
        >
          {author ? (
            <div className="flex items-center gap-3 sm:gap-2">
              {author.photo ? (
                <Image
                  src={author.photo}
                  alt=""
                  width={48}
                  height={48}
                  className="size-12 shrink-0 rounded-full border border-white/20 object-cover"
                />
              ) : (
                <span
                  aria-hidden
                  className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/20 text-b1 font-semibold text-white"
                >
                  {initials(author.name)}
                </span>
              )}
              <span className="flex min-w-0 flex-col">
                <span className="text-b1 text-white">{author.name}</span>
                {author.title ? <span className="text-white/80">{author.title}</span> : null}
              </span>
            </div>
          ) : null}
          {article.publishedAt || article.readMinutes ? (
            <div
              className={cn(
                "flex flex-wrap items-center gap-x-6 gap-y-2",
                author && "border-t border-white/10 pt-3 sm:border-0 sm:pt-0",
              )}
            >
              {article.publishedAt ? (
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <CalendarTodayIcon className="size-4" />
                  <time dateTime={article.publishedAt}>
                    {dateFormat.format(new Date(article.publishedAt))}
                  </time>
                </span>
              ) : null}
              {article.readMinutes ? (
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <AlarmIcon className="size-4" />
                  {article.readMinutes} min read
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
