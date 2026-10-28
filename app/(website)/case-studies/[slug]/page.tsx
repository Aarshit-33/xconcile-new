import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/json-ld";
import { CaseStudyTemplate } from "@/components/templates/case-study";
import { routes } from "@/lib/routes";
import { breadcrumbJsonLd, buildMetadata, caseStudyJsonLd } from "@/lib/seo";
import {
  getAllCaseStudySlugs,
  getCaseStudiesGallery,
  getCaseStudy,
  getRelatedCaseStudies,
} from "@/sanity/lib/case-studies";

/**
 * Case study at `/case-studies/<slug>` (design pages/case study/page.svg). ONE route for every
 * case study: one published in Studio → Case Studies appears here and on /case-studies without
 * any code change. Unknown slugs are a real 404 (same setup as /blog/<slug>).
 */
export async function generateStaticParams() {
  const slugs = await getAllCaseStudySlugs();
  // Cache Components needs at least one param at build time; an unknown slug just 404s.
  return slugs.length ? slugs.map(({ slug }) => ({ slug })) : [{ slug: "__none__" }];
}

/** Real 404 status for unknown slugs under Partial Prefetching (see app/(website)/[slug]). */
export const ensureStatic = "navigation";

/** The slug must be resolved before streaming so `notFound()` can send a 404 (see [slug]). */
export const instant = false;

async function load(slug: string) {
  const { content } = await getCaseStudiesGallery();
  const study = await getCaseStudy(slug, content.ctaBand);
  return { content, study };
}

export async function generateMetadata({
  params,
}: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { study } = await load(slug);
  if (!study) return {};
  const meta = buildMetadata({
    title: study.seo.title || study.title,
    description: study.seo.description || study.excerpt || undefined,
    seo: {
      metaKeywords: study.seo.keywords,
      openGraphImage: study.seo.ogImage || study.image?.src,
      metaTags: study.seo.metaTags,
    },
    path: routes.caseStudy(slug),
  });
  return { ...meta, openGraph: { ...meta.openGraph, type: "article" } };
}

export default async function CaseStudyRoute({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const { content, study } = await load(slug);
  if (!study) notFound();

  const related = await getRelatedCaseStudies(study);
  const path = routes.caseStudy(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: routes.home() },
            { name: "Case Studies", path: routes.caseStudies() },
            { name: study.title, path },
          ]),
          caseStudyJsonLd({
            title: study.title,
            description: study.seo.description || study.excerpt,
            path,
            image: study.image?.src,
            datePublished: study.publishedAt,
            dateModified: study.updatedAt,
          }),
        ]}
      />
      <CaseStudyTemplate study={study} related={related} settings={content.detail} />
    </>
  );
}
