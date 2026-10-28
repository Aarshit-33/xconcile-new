import { RevealList } from "@/components/motion/reveal-list";
import { BlogCard, blogCardItemClassName } from "@/components/shared/blog-card";
import { CtaLink } from "@/components/shared/cta";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BlogContent } from "@/content/types";
import { sectionId } from "@/lib/section-ids";
import { getLatestPosts } from "@/sanity/lib/queries";

/**
 * B15 Blog teaser: the 3 latest posts from Studio → Blog Posts.
 * White on every screen (user request 2026-10-25: desktop colour everywhere; mobile was #F5F7F8).
 * Mobile: stacked cards, then the "Explore all blogs" button centred below
 * them (user request 2026-10-25; not drawn on mobile).
 * Desktop: heading left + outline CTA right, 3 cards. The whole card is one link
 * (stretched title link); "Read more" is visual only. Hidden if Sanity returns nothing.
 */
export async function BlogTeaser({ data }: { data: BlogContent }) {
  const posts = await getLatestPosts(3).catch((error: unknown) => {
    console.error("[home] Failed to load latest blog posts", error);
    return null;
  });
  if (!posts?.length) return null;

  return (
    // White everywhere since 2026-10-25, so the old 48px mobile gap above the grey band is gone.
    <section id={sectionId(data, "blog")} aria-labelledby="blog-title" className="bg-white section-y">
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
            since 2026-10-22). Card: components/shared/blog-card.tsx (same on the Blog gallery). */}
        <RevealList className="grid gap-4 lg:grid-cols-3 lg:gap-6">
          {posts.map((post) => (
            <li key={post.id} className={blogCardItemClassName}>
              <BlogCard post={post} />
            </li>
          ))}
        </RevealList>
        {/* Below lg the header button is hidden, so the same CTA sits under the cards. */}
        <div className="flex justify-center lg:hidden">
          <CtaLink href={data.cta.href} variant="outline" className="w-full md:w-auto">
            {data.cta.label}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
