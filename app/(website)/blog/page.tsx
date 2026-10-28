import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/json-ld";
import { BlogGalleryTemplate } from "@/components/templates/blog-gallery";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, itemListJsonLd } from "@/lib/seo";
import { getBlogGallery } from "@/sanity/lib/blog-gallery";
import { getAllPosts } from "@/sanity/lib/queries";

/**
 * Blog gallery (`/blog`, design pages/Case study gallary/page.svg): every blog post, newest first,
 * as the site's blog cards. Page copy: Studio → Blog Gallery, falling back to
 * content/blog-gallery.ts. Posts: Studio → Blog Posts (sanity/lib/queries.ts).
 */
export async function generateMetadata(): Promise<Metadata> {
  const { content, ogImage, metaTags } = await getBlogGallery();
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: routes.blog(),
  });
}

export default async function BlogPage() {
  const [{ content }, posts] = await Promise.all([
    getBlogGallery(),
    getAllPosts().catch((error: unknown) => {
      console.error("[blog] Failed to load blog posts", error);
      return null;
    }),
  ]);
  const list = posts ?? [];
  const path = routes.blog();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Blog", path },
          ]),
          ...(list.length
            ? [itemListJsonLd(list.map((p) => ({ name: p.title, path: routes.post(p.slug) })))]
            : []),
        ]}
      />
      <BlogGalleryTemplate content={content} posts={list} />
    </>
  );
}
