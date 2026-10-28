import { ArticleBody } from "@/components/blog/article-body";
import { ArticleCover } from "@/components/blog/article-cover";
import { ArticleFaqs } from "@/components/blog/article-faqs";
import { ArticleHero } from "@/components/blog/article-hero";
import { ArticleToc } from "@/components/blog/article-toc";
import { NewsletterBand } from "@/components/blog/newsletter-band";
import { RelatedPosts } from "@/components/blog/related-posts";
import type { BlogArticleSettings } from "@/content/blog-gallery";
import type { BlogArticle } from "@/sanity/lib/blog-post";
import type { PostCard } from "@/sanity/lib/queries";

const ARTICLE_ID = "article";

/**
 * Blog article template (`/blog/<slug>`, design pages/blog/page.svg), mobile first:
 * hero → [Table of Contents | cover image + article + FAQs] → Related Blog → Stay Updated.
 * Desktop: 341px sticky TOC column + 856px article column (97px apart, as drawn). Phones and
 * tablets: one column, the TOC as a collapsible box above the cover. One template for every
 * post; the content decides how long each part is.
 */
export function BlogArticleTemplate({
  article,
  related,
  settings,
}: {
  article: BlogArticle;
  related: PostCard[];
  settings: BlogArticleSettings;
}) {
  return (
    <>
      <ArticleHero article={article} />

      {/* No overflow-hidden here: it would stop the TOC from sticking. */}
      <div className="bg-white py-8 md:py-12 lg:pt-9 lg:pb-20">
        <div className="container-site grid gap-6 lg:grid-cols-[minmax(0,341px)_minmax(0,1fr)] lg:gap-x-12 xl:gap-x-[97px]">
          <aside className="lg:row-span-1">
            <ArticleToc items={article.toc} articleId={ARTICLE_ID} />
          </aside>

          <article id={ARTICLE_ID} className="min-w-0 lg:pt-[18px]">
            <ArticleCover article={article} />
            <ArticleBody body={article.body} headingIds={article.headingIds} />
            <ArticleFaqs title={article.faqTitle} faqs={article.faqs} />
          </article>
        </div>
      </div>

      <RelatedPosts data={settings.related} posts={related} />
      <NewsletterBand data={settings.newsletter} />
    </>
  );
}
