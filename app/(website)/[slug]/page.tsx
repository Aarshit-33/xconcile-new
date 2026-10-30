import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { HirePageTemplate } from "@/components/templates/hire-page";
import { SeoArticleTemplate } from "@/components/templates/seo-article";
import { ServicePageTemplate } from "@/components/templates/service-page";
import type { FaqItem } from "@/content/types";
import { routes } from "@/lib/routes";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  serviceJsonLd,
  videoJsonLd,
} from "@/lib/seo";
import { getSeoArticle } from "@/sanity/lib/blog-post";
import { getHirePage } from "@/sanity/lib/hire-page";
import { getPageUrls } from "@/sanity/lib/page-urls";
import { getAllSeoArticleSlugs, getRelatedSeoArticles } from "@/sanity/lib/queries";
import { getServicePage } from "@/sanity/lib/service-page";

/**
 * Root-level slugs, matching the live URL structure (lib/routes.ts): service pages, hire pages
 * and SEO articles (Studio → Articles, user request 2026-10-27; the Studio slug checks keep
 * their slugs from clashing with the others). Service/hire slugs are their live URLs
 * (sanity/lib/page-urls.ts: Studio's "URL slug", else the code default) and win over articles;
 * a page's old slug 301s to its live URL. Anything else is a 404. Articles and old slugs render
 * on first request.
 */
export async function generateStaticParams() {
  const [urls, articles] = await Promise.all([getPageUrls(), getAllSeoArticleSlugs()]);
  const slugs = new Set([
    ...urls.pages.filter((p) => p.kind !== "industry").map((p) => p.slug),
    ...articles.map((a) => a.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
}

/** The service or hire page live at `/<slug>`. An old URL of one 301s to its live URL. */
async function rootPage(slug: string) {
  const urls = await getPageUrls();
  const page = urls.byPath(routes.service(slug));
  if (page && page.kind !== "industry") return page;
  const to = urls.redirectFor(routes.service(slug));
  if (to) permanentRedirect(to);
  return undefined;
}

/**
 * Require complete static output. Without it, Partial Prefetching streams the app shell for an
 * unlisted slug before `notFound()` runs, so unknown URLs answered 200 (soft 404). With
 * 'navigation', Next renders the full page first, so `notFound()` sets a real 404 status.
 * (`dynamicParams = false` is not available with Cache Components.)
 */
export const ensureStatic = "navigation";

/**
 * Opt out of Next's instant-navigation check (dev "instant-shell-url-data" insight). Its other
 * fix, reading `params` inside `<Suspense>`, streams the shell before `notFound()` runs, so
 * unknown slugs answered 200 (soft 404; tested 2026-10-18). The slug has to be resolved first.
 * Cost is small: every slug is prerendered (`ensureStatic`), so a click waits only for static
 * output. To make these navigations instant later, give the links to them `prefetch={true}`.
 */
export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await rootPage(slug);

  if (page?.kind === "hire") {
    const { content, ogImage, metaTags } = await getHirePage(page);
    return buildMetadata({
      title: content.seo.title,
      description: content.seo.description,
      seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
      path: page.path,
    });
  }

  if (!page) {
    const article = await getSeoArticle(slug);
    if (!article) return {};
    const meta = buildMetadata({
      title: article.seo.title || article.title,
      description: article.seo.description || article.excerpt || undefined,
      seo: {
        metaKeywords: article.seo.keywords,
        openGraphImage: article.seo.ogImage || article.cover?.src,
        metaTags: article.seo.metaTags,
      },
      path: `/${slug}`,
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
  const { content, ogImage, metaTags } = await getServicePage(page);
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage, metaTags },
    path: page.path,
  });
}

const faqLd = (items: FaqItem[]) =>
  faqJsonLd(items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) })));

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = await rootPage(slug);

  if (page?.kind === "hire") {
    const { content } = await getHirePage(page);
    const path = page.path;
    return (
      <>
        <JsonLd
          data={[
            serviceJsonLd({ name: content.name, description: content.seo.description, path }),
            breadcrumbJsonLd([
              { name: "Home", path: routes.home() },
              { name: content.name, path },
            ]),
            faqLd(content.faq.items),
          ]}
        />
        <HirePageTemplate content={content} />
      </>
    );
  }

  if (!page) return renderSeoArticle(slug);

  const { content } = await getServicePage(page);
  const path = page.path;

  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: content.name, description: content.seo.description, path }),
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: content.name, path },
          ]),
          faqLd(content.faq.items),
          // One VideoObject per distinct video (audit N-SEO7: the slider may repeat a video).
          ...(content.testimonials?.videos ?? [])
            .filter((v, i, all) => all.findIndex((o) => o.youtubeId === v.youtubeId) === i)
            .map((v) =>
              videoJsonLd({
                youtubeId: v.youtubeId,
                title: v.title,
                description: `${v.name}, ${v.company}, on working with Xconcile.`,
                thumbnail: v.poster.src,
                uploadDate: v.uploadDate,
                duration: v.duration,
              }),
            ),
        ]}
      />
      <ServicePageTemplate content={content} />
    </>
  );
}

/**
 * SEO article (Studio → Articles) at `/<slug>`. A plain function called from the page (not a
 * child component), so `notFound()` runs before anything streams and unknown slugs answer 404.
 */
async function renderSeoArticle(slug: string) {
  const article = await getSeoArticle(slug);
  if (!article) notFound();

  const related = await getRelatedSeoArticles(article.relatedIds, article.id);
  const path = `/${slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
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
      <SeoArticleTemplate article={article} related={related} conclusion={article.conclusion} />
    </>
  );
}
