import { BlogTeaser } from "@/components/sections/blog-teaser";
import { CaseStudies } from "@/components/sections/case-studies";
import { Challenges } from "@/components/sections/challenges";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { StatsBar } from "@/components/sections/stats-bar";
import { Testimonials } from "@/components/sections/testimonials";
import { ToolTabs } from "@/components/sections/tool-tabs";
import { WhyChoose } from "@/components/sections/why-choose";
import type { ServicePageContent } from "@/content/services/types";

/**
 * Service page template (design reference: audit-outsourcing-services; spec §(1) section
 * order). Same blocks as Home, one DOM for every breakpoint. There is no mobile design for
 * inner pages, so each block's mobile layout follows the Home mobile design (report §3.5).
 */
export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  return (
    <>
      <Hero data={content.hero} variant="inner" />
      <StatsBar data={content.stats} />
      <Intro data={content.intro} />
      <Challenges data={content.challenges} />
      <Services data={content.services} />
      <CaseStudies data={content.caseStudies} />
      <Process data={content.process} subtitleClassName="md:max-w-[666px]" />
      <Industries data={content.industries} headingAlign="center" />
      <WhyChoose data={content.whyChoose} tile="light" />
      {content.tools ? <ToolTabs data={content.tools} /> : null}
      <Testimonials data={content.testimonials} />
      <BlogTeaser data={content.blog} />
      <Faq data={content.faq} firstOpen={false} />
      {/* Spec: ~117px white band between the FAQ and the CTA band on desktop. */}
      <CtaBand data={content.ctaBand} className="lg:mt-[117px]" />
    </>
  );
}
