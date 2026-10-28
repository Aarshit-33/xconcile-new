import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { BlogArticleTemplate } from "@/components/templates/blog-article";
import { routes } from "@/lib/routes";
import { blogPostingJsonLd, breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { getBlogGallery } from "@/sanity/lib/blog-gallery";
import { getBlogArticle } from "@/sanity/lib/blog-post";
import { getAllPostSlugs, getRelatedPosts } from "@/sanity/lib/queries";

/**
 * Blog article at `/blog/<slug>` (design pages/blog/page.svg). ONE route for every post: a post
 * published in Studio → Blog Posts appears here (and on /blog and Home) without any code change.
 * The old site's posts were copied in as Blog Posts with the same URLs (sanity/lib/blog-post.ts).
 * Unknown slugs are a real 404.
 */
export async function generateStaticParams() {
  return (await getAllPostSlugs()).map(({ slug }) => ({ slug }));
}

/** Real 404 status for unknown slugs under Partial Prefetching (see app/(website)/[slug]). */
export const ensureStatic = "navigation";

/** The slug must be resolved before streaming so `notFound()` can send a 404 (see [slug]). */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogArticle(slug);
  if (!article) return {};
  const path = routes.post(slug);
  const meta = buildMetadata({
    title: article.seo.title || article.title,
    description: article.seo.description || article.excerpt || undefined,
    seo: {
      metaKeywords: article.seo.keywords,
      openGraphImage: article.seo.ogImage || article.cover?.src,
      metaTags: article.seo.metaTags,
    },
    path,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      ...(article.publishedAt ? { publishedTime: article.publishedAt } : {}),
      ...(article.author ? { authors: [article.author.name] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const article = await getBlogArticle(slug);
  if (!article) notFound();

  const [related, { content }] = await Promise.all([
    getRelatedPosts(article.relatedSlugs, slug),
    getBlogGallery(),
  ]);
  const path = routes.post(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Blog", path: routes.blog() },
            { name: article.title, path },
          ]),
          blogPostingJsonLd({
            title: article.title,
            description: article.seo.description || article.excerpt,
            path,
            image: article.cover?.src,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            authorName: article.author?.name,
          }),
          ...(article.faqs.length ? [faqJsonLd(article.faqs)] : []),
        ]}
      />
      <BlogArticleTemplate article={article} related={related} settings={content.article} />
    </>
  );
}
