import { BlogCard, blogCardItemClassName, blogCardTabletOrphanClassName } from "@/components/shared/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BlogPostsContent } from "@/content/blog-gallery";
import { sectionId } from "@/lib/section-ids";
import type { PostCard } from "@/sanity/lib/queries";

import { BlogPostsPager } from "./blog-posts-pager";

/** Cover sizes for this grid: 1 column on phones, 2 from md, 3 from lg (416px max). */
const coverSizes = "(min-width: 1440px) 416px, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw";

/**
 * Blog gallery post grid (design: pages/Case study gallary/page.svg, built mobile first).
 * Centred eyebrow + H2 + subtitle, then the site's blog card (components/shared/blog-card.tsx):
 * 1 column on phones, 2 on tablets, 3 on desktop (24px gaps, as drawn). Static cards (no scroll
 * animation). First `perPage` cards (default 6 = two desktop rows), then a button below shows
 * the next batch (BlogPostsPager, user request 2026-10-26). Every card is in the server HTML.
 */
export function BlogPosts({ data, posts }: { data: BlogPostsContent; posts: PostCard[] }) {
  const id = sectionId(data, "blog");
  const titleId = `${id}-title`;
  const perPage = Math.max(1, data.perPage);
  const pages: PostCard[][] = [];
  for (let i = 0; i < posts.length; i += perPage) pages.push(posts.slice(i, i + perPage));

  return (
    <section id={id} aria-labelledby={titleId} className="bg-white section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          className="mx-auto max-w-[776px]"
        />

        {pages.length ? (
          <BlogPostsPager
            listId={`${id}-list`}
            total={posts.length}
            perPage={perPage}
            loadMoreLabel={data.loadMoreLabel}
            pages={pages.map((page, i) => (
              <ul key={i} className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {page.map((post) => (
                  <li key={post.id} className={`${blogCardItemClassName} ${blogCardTabletOrphanClassName}`}>
                    <BlogCard post={post} sizes={coverSizes} />
                  </li>
                ))}
              </ul>
            ))}
          />
        ) : (
          <p className="text-center text-b1 text-body lg:text-b3">{data.emptyText}</p>
        )}
      </div>
    </section>
  );
}
