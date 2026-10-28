import { ArticleBody } from "@/components/blog/article-body";
import { ArticleCover } from "@/components/blog/article-cover";
import { ArticleFaqs } from "@/components/blog/article-faqs";
import { ArticleHero } from "@/components/blog/article-hero";
import { BlogCard, blogCardItemClassName } from "@/components/shared/blog-card";
import type { BlogArticle } from "@/sanity/lib/blog-post";
import type { PostCard } from "@/sanity/lib/queries";

/**
 * SEO article (`/<slug>`, design pages/article/page.svg), mobile first. Same parts as a blog
 * article, laid out as drawn: hero with the breadcrumb Home / title (no pill), then the article
 * column (cover, text, FAQs; 856px) with a 416px "Related Posts" column on its right (desktop).
 * Phones and tablets: one column, Related Posts after the article (2 cards per row on tablets).
 * No CTA band / newsletter at the end (not drawn).
 */
export function SeoArticleTemplate({
  article,
  related,
  conclusion,
}: {
  article: BlogArticle;
  related: PostCard[];
  /** "Closing section" (Studio): shown after the FAQs, as drawn ("Final Thoughts"). */
  conclusion: BlogArticle["body"];
}) {
  return (
    <>
      <ArticleHero article={article} crumbs={[]} badge={null} />

      <div className="bg-white py-8 md:py-12 lg:pt-[46px] lg:pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,856fr)_minmax(0,416fr)] lg:gap-6">
          <article className="min-w-0">
            <ArticleCover article={article} />
            <ArticleBody body={article.body} headingIds={article.headingIds} tableTone="light" />
            <ArticleFaqs title={article.faqTitle} faqs={article.faqs} />
            {conclusion.length ? (
              <div className="mt-10 lg:mt-16">
                <ArticleBody body={conclusion} headingIds={{}} tableTone="light" />
              </div>
            ) : null}
          </article>

          {related.length ? (
            <aside aria-labelledby="related-posts-title" className="min-w-0">
              {/* Not sticky: three cards are taller than most screens, so the last one would only
                  appear at the end of the article. */}
              <div className="flex flex-col gap-6">
                <h2
                  id="related-posts-title"
                  className="border-b border-line/60 pb-3 text-h3 font-medium text-heading"
                >
                  Related Posts
                </h2>
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
                  {related.map((post) => (
                    <li key={post.id} className={blogCardItemClassName}>
                      <BlogCard
                        post={post}
                        sizes="(min-width: 1440px) 416px, (min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </>
  );
}
