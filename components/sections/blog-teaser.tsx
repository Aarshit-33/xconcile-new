import Image from "next/image";
import Link from "next/link";

import { ArrowForwardIcon, CalendarTodayIcon, History2Icon } from "@/components/icons/material-symbols";
import { RevealList } from "@/components/motion/reveal-list";
import { CtaLink } from "@/components/shared/cta";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BlogContent } from "@/content/types";
import { routes } from "@/lib/routes";
import { sectionId } from "@/lib/section-ids";
import { getLatestPosts, type PostCard } from "@/sanity/lib/queries";

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
 * B15 Blog teaser: the 3 latest posts from Sanity (blog content stays as on the live site).
 * Mobile: #F5F7F8 section with stacked cards, no "Explore all blogs" button (as drawn).
 * Desktop: white, heading left + outline CTA right, 3 cards. The whole card is one link
 * (stretched title link); "Read more" is visual only. Hidden if Sanity returns nothing.
 */
export async function BlogTeaser({ data }: { data: BlogContent }) {
  const posts = await getLatestPosts(3).catch((error: unknown) => {
    console.error("[home] Failed to load latest blog posts", error);
    return null;
  });
  if (!posts?.length) return null;

  return (
    // mt-12: the mobile design leaves a 48px white gap above this grey section.
    <section id={sectionId(data, "blog")} aria-labelledby="blog-title" className="mt-12 bg-surface-alt section-y lg:mt-0 lg:bg-white">
      <div className="container-site flex flex-col gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId="blog-title"
            subtitle={data.subtitle}
            align="responsive"
            className="lg:max-w-[776px]"
            subtitleClassName="text-b3"
          />
          <CtaLink href={data.cta.href} variant="outline" className="hidden shrink-0 lg:inline-flex">
            {data.cta.label}
          </CtaLink>
        </div>

        {/* Each whole post card (cover + body) rises into place (RevealList; whole-card motion
            since 2026-10-22). */}
        <RevealList className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <li key={post.id}>
              <BlogCard post={post} />
            </li>
          ))}
        </RevealList>
      </div>
    </section>
  );
}

function BlogCard({ post }: { post: PostCard }) {
  const excerpt = toExcerpt(post.excerpt);
  const readTime = post.readTime?.trim();

  return (
    <article className="img-zoom-trigger group/post relative flex h-full flex-col">
      {/* 16:9 = the live posts' image ratio; their titles are baked in, so no cropping.
          object-contain: a cover in another ratio shows whole on a #F5F7F8 fill (audit M4). */}
      {/* Cover zooms on card hover (client request 2026-10-22). */}
      <div className="img-zoom relative aspect-video overflow-hidden rounded-t-md">
        <Image
          src={post.image ?? "/images/home/blog-fallback.jpg"}
          alt={post.imageAlt ?? ""}
          fill
          sizes="(min-width: 1440px) 416px, (min-width: 1024px) 30vw, 100vw"
          className="bg-surface-alt object-contain"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-hidden rounded-b-md border border-t-0 border-line/60 bg-white p-6">
        <div className="flex flex-col gap-4">
          {/* Title turns green while the card (one stretched link) is hovered (client request). */}
          {/* Full title (2-line clamp removed 2026-10-22: it cut titles mid-word at every width). */}
          <h3 className="font-display text-h5 font-medium text-black transition-colors group-hover/post:text-brand">
            <Link
              href={routes.post(post.slug)}
              className="outline-none after:absolute after:inset-0 after:rounded-md focus-visible:after:ring-3 focus-visible:after:ring-ring/50"
            >
              {post.title}
            </Link>
          </h3>
          {excerpt ? <p className="line-clamp-2 text-b1 text-body">{excerpt}</p> : null}
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4">
          <p className="flex items-center gap-4 font-display text-b2 font-normal whitespace-nowrap text-meta">
            {post.publishedAt ? (
              <span className="flex items-center gap-1">
                <CalendarTodayIcon className="size-4" />
                <time dateTime={post.publishedAt}>{dateFormat.format(new Date(post.publishedAt))}</time>
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
          <span aria-hidden className="flex shrink-0 items-center gap-2 text-b1 font-medium text-brand">
            Read more
            <ArrowForwardIcon className="size-5" />
          </span>
        </div>
      </div>
    </article>
  );
}
