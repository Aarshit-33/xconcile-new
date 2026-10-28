import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { HirePageTemplate } from "@/components/templates/hire-page";
import { SeoArticleTemplate } from "@/components/templates/seo-article";
import { ServicePageTemplate } from "@/components/templates/service-page";
import { hirePages } from "@/content/hire";
import { servicePages } from "@/content/services";
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
import { getAllSeoArticleSlugs, getRelatedSeoArticles } from "@/sanity/lib/queries";
import { getServicePage } from "@/sanity/lib/service-page";

/**
 * Root-level slugs, matching the live URL structure (lib/routes.ts): service pages, hire pages
 * and SEO articles (Studio → Articles, user request 2026-10-27; the Studio slug check keeps
 * their slugs from clashing with the others). Service/hire pages win if a slug ever matched both.
 * Anything else is a 404. Articles published after a build render on first request.
 */
export async function generateStaticParams() {
  const articles = await getAllSeoArticleSlugs();
  const slugs = new Set([
    ...Object.keys(servicePages),
    ...Object.keys(hirePages),
    ...articles.map((a) => a.slug),
  ]);
  return [...slugs].map((slug) => ({ slug }));
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

  const hire = hirePages[slug];
  if (hire) {
    const { content, ogImage } = await getHirePage(hire);
    return buildMetadata({
      title: content.seo.title,
      description: content.seo.description,
      seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage },
      path: routes.hireStaff(slug),
    });
  }

  const entry = servicePages[slug];
  if (!entry) {
    const article = await getSeoArticle(slug);
    if (!article) return {};
    const meta = buildMetadata({
      title: article.seo.title || article.title,
      description: article.seo.description || article.excerpt || undefined,
      seo: {
        metaKeywords: article.seo.keywords,
        openGraphImage: article.seo.ogImage || article.cover?.src,
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
  const { content, ogImage } = await getServicePage(entry);
  return buildMetadata({
    title: content.seo.title,
    description: content.seo.description,
    seo: { metaKeywords: content.seo.keywords, openGraphImage: ogImage },
    path: routes.service(slug),
  });
}

const faqLd = (items: FaqItem[]) =>
  faqJsonLd(items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) })));

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;

  const hire = hirePages[slug];
  if (hire) {
    const { content } = await getHirePage(hire);
    const path = routes.hireStaff(slug);
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

  const entry = servicePages[slug];
  if (!entry) return renderSeoArticle(slug);

  const { content } = await getServicePage(entry);
  const path = routes.service(slug);

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
          ...(content.testimonials?.videos ?? []).map((v) =>
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
