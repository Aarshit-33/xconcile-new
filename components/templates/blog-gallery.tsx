import { BlogPosts } from "@/components/sections/blog-posts";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import type { BlogGalleryContent } from "@/content/blog-gallery";
import type { PostCard } from "@/sanity/lib/queries";

/**
 * Blog gallery template (`/blog`, design: pages/Case study gallary/page.svg). Mobile first; one
 * DOM for every breakpoint. Order as drawn: centred hero (badge, H1, subtitle, one button; no
 * checks, no watermark), the post grid, CTA band. Hero and CTA band are the shared blocks; the
 * desktop hero spacing follows the design (content at 193px, 87px below the button).
 */
export function BlogGalleryTemplate({ content, posts }: { content: BlogGalleryContent; posts: PostCard[] }) {
  return (
    <>
      <Hero data={content.hero} variant="inner" align="center" className="lg:pt-[193px] lg:pb-[87px]" />
      <BlogPosts data={content.posts} posts={posts} />
      <CtaBand data={content.ctaBand} />
    </>
  );
}
