import { BlogTeaser } from "@/components/sections/blog-teaser";
import { CaseStudies } from "@/components/sections/case-studies";
import { Challenges } from "@/components/sections/challenges";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { Intro } from "@/components/sections/intro";
import { Process } from "@/components/sections/process";
import { SecurityControls } from "@/components/sections/security-controls";
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
 *
 * Every page uses this one template (UI of the audit page, user request 2026-10-25); a section
 * renders only when the page's content has it, so the RCM layout (feature grid, extra services
 * and security instead of the accordion, case studies, process, industries, tools, testimonials
 * and blog) uses the same template. See content/services/types.ts for both layouts.
 */
export function ServicePageTemplate({ content }: { content: ServicePageContent }) {
  return (
    <>
      <Hero data={content.hero} variant="inner" />
      <StatsBar data={content.stats} />
      <Intro data={content.intro} />
      <Challenges data={content.challenges} />
      {/* RCM "Medical Billing Services": this page's services block, so it takes the #services
          anchor (hero links) unless Studio sets another; both grids would otherwise be #overview. */}
      {content.featureGrid ? (
        <FeatureCards data={{ ...content.featureGrid, anchorId: content.featureGrid.anchorId || "services" }} />
      ) : null}
      {content.services ? <Services data={content.services} /> : null}
      {content.caseStudies ? <CaseStudies data={content.caseStudies} /> : null}
      {content.process ? <Process data={content.process} subtitleClassName="md:max-w-[666px]" /> : null}
      {content.industries ? <Industries data={content.industries} headingAlign="center" /> : null}
      <WhyChoose data={content.whyChoose} />
      {content.extraServices ? (
        <FeatureCards
          data={{ ...content.extraServices, anchorId: content.extraServices.anchorId || "additional-services" }}
        />
      ) : null}
      {/* White after the white extra-services grid: no second top padding (80px rhythm). */}
      {content.security ? (
        <SecurityControls data={content.security} className={content.extraServices ? "pt-0 lg:pt-0" : undefined} />
      ) : null}
      {content.tools ? <ToolTabs data={content.tools} /> : null}
      {content.testimonials ? <Testimonials data={content.testimonials} /> : null}
      {content.blog ? <BlogTeaser data={content.blog} /> : null}
      {/* FAQ is white; right after the white security block it drops its top padding. */}
      <Faq data={content.faq} className={content.security ? "pt-0 lg:pt-0" : undefined} />
      {/* Spec: ~117px white band between the FAQ and the CTA band on desktop. */}
      <CtaBand data={content.ctaBand} className="" />
    </>
  );
}
