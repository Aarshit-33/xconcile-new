import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import { HirePageTemplate } from "@/components/templates/hire-page";
import { ServicePageTemplate } from "@/components/templates/service-page";
import { hirePages } from "@/content/hire";
import { servicePages } from "@/content/services";
import type { FaqItem } from "@/content/types";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd, videoJsonLd } from "@/lib/seo";
import { getHirePage } from "@/sanity/lib/hire-page";
import { getServicePage } from "@/sanity/lib/service-page";

/**
 * Root-level slugs, matching the live URL structure (lib/routes.ts): service pages and hire
 * pages. Only slugs in the two registries are prerendered; anything else is a 404.
 */
export function generateStaticParams() {
  return [...Object.keys(servicePages), ...Object.keys(hirePages)].map((slug) => ({ slug }));
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
  if (!entry) return {};
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
  if (!entry) notFound();

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
