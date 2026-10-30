import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogTeaser } from "@/components/sections/blog-teaser";
import { CaseStudies } from "@/components/sections/case-studies";
import { Challenges } from "@/components/sections/challenges";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { InquirySection } from "@/components/sections/inquiry-section";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { StatsBar } from "@/components/sections/stats-bar";
import { Testimonials } from "@/components/sections/testimonials";
import { Tools } from "@/components/sections/tools";
import { WhyChoose } from "@/components/sections/why-choose";
import { JsonLd } from "@/components/seo/json-ld";
import { richTextToPlain } from "@/components/shared/rich-text";
import {
  buildMetadata,
  faqJsonLd,
  localBusinessJsonLd,
  stripBrandSuffix,
  videoJsonLd,
} from "@/lib/seo";
import { getHome } from "@/sanity/lib/home";
import { getSiteSettings } from "@/sanity/lib/site-settings";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome();
  return {
    ...buildMetadata({
      title: seo.title,
      description: seo.description,
      seo: { metaKeywords: seo.keywords, metaTags: seo.metaTags },
      path: "/",
    }),
    // The root layout's title template doesn't apply to the root page itself.
    title: { absolute: `${stripBrandSuffix(seo.title)} | Xconcile` },
  };
}

/**
 * Home. Section order follows the desktop design (one DOM for every breakpoint; the mobile
 * design orders a few sections differently). Copy: Sanity `home` singleton (Studio →
 * Home Page), falling back to content/home.ts for anything left empty.
 */
export default async function HomePage() {
  const [home, settings] = await Promise.all([getHome(), getSiteSettings()]);
  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(home.faq.items.map((f) => ({ question: f.q, answer: richTextToPlain(f.a) }))),
          // One VideoObject per distinct video (the slider may list the same video twice).
          ...home.testimonials.videos
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
          ...localBusinessJsonLd(settings),
        ]}
      />

      <Hero data={home.hero} />
      <StatsBar data={home.stats} />
      <Intro data={home.intro} />
      <Challenges data={home.challenges} />
      <Services data={home.services} />
      <CaseStudies data={home.caseStudies} />
      <Process data={home.process} />
      <Industries data={home.industries} />
      <WhyChoose data={home.whyChoose} />
      <Tools data={home.tools} />
      <Testimonials data={home.testimonials} />
      {/* Suspense: the blog posts query (sanity/lib/queries.ts) is a separate cache entry. When it
          is cold (after a deploy/edit) or the query is slow, Next would otherwise block the
          whole route ("uncached data during prerendering", 2026-10-26). Cached = still in the
          prerendered HTML; otherwise it streams in. Below the fold, so no visible placeholder. */}
      <Suspense fallback={null}>
        <BlogTeaser data={home.blog} />
      </Suspense>
      <Faq data={home.faq} />
      {/* Old-site contact section (client request 2026-10-15). */}
      <InquirySection data={home.inquiry} contactEmail={settings.contact.email} />
    </>
  );
}
