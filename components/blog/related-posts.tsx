import { RevealList } from "@/components/motion/reveal-list";
import { BlogCard, blogCardItemClassName, blogCardTabletOrphanClassName } from "@/components/shared/blog-card";
import { CtaLink } from "@/components/shared/cta";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BlogArticleSettings } from "@/content/blog-gallery";
import { routes } from "@/lib/routes";
import type { PostCard } from "@/sanity/lib/queries";

/**
 * "Related Blog" (design pages/blog/page.svg): same layout as Home's blog section (heading left
 * + "Explore all blogs" on the right, 3 blog cards; button under the cards on phones). Posts:
 * the article's picks (Blog Post → Related blogs, max 3, in order), else the 3 latest.
 */
export function RelatedPosts({ data, posts }: { data: BlogArticleSettings["related"]; posts: PostCard[] }) {
  if (!posts.length) return null;
  return (
    <section id="related-blog" aria-labelledby="related-blog-title" className="bg-white section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId="related-blog-title"
            subtitle={data.subtitle}
            align="responsive"
            className="lg:max-w-[776px]"
            subtitleClassName="text-b1 lg:text-b3"
          />
          <CtaLink href={routes.blog()} variant="outline" className="hidden shrink-0 lg:inline-flex">
            {data.ctaLabel}
          </CtaLink>
        </div>
        <RevealList className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.id} className={`${blogCardItemClassName} ${blogCardTabletOrphanClassName}`}>
              <BlogCard
                post={post}
                sizes="(min-width: 1440px) 416px, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              />
            </li>
          ))}
        </RevealList>
        <div className="flex justify-center lg:hidden">
          <CtaLink href={routes.blog()} variant="outline" className="w-full md:w-auto">
            {data.ctaLabel}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
