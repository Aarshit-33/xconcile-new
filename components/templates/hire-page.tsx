import { AudienceCards } from "@/components/sections/audience-cards";
import { CardGrid } from "@/components/sections/card-grid";
import { Challenges } from "@/components/sections/challenges";
import { CtaBand } from "@/components/sections/cta-band";
import { EngagementModels } from "@/components/sections/engagement-models";
import { ExperienceLevels } from "@/components/sections/experience-levels";
import { Faq } from "@/components/sections/faq";
import { FeatureStrip } from "@/components/sections/feature-strip";
import { Hero } from "@/components/sections/hero";
import { HiringSteps } from "@/components/sections/hiring-steps";
import { Intro } from "@/components/sections/intro";
import { SecurityControls } from "@/components/sections/security-controls";
import { ToolTabs } from "@/components/sections/tool-tabs";
import { WhyChoose } from "@/components/sections/why-choose";
import type { HirePageContent } from "@/content/hire/types";

/** Two tinted sections in a row are separated by a white band (80px desktop, 48px mobile). */
const band = "mt-12 lg:mt-20";

/**
 * Hire page template (design reference: hire-dedicated-accounting-professionals; spec §(2)
 * section order, 5-Steps right after Hiring Models). One DOM for every breakpoint; there is
 * no mobile design for Hire pages, so blocks use the Home mobile patterns (report §3.5).
 *
 * Vertical rhythm mirrors the Figma auto-layout (80px between sections): white sections that
 * follow another white section drop their top padding; tinted sections that follow another
 * tinted section get the white `band` above them.
 */
export function HirePageTemplate({ content }: { content: HirePageContent }) {
  return (
    <>
      <Hero data={content.hero} variant="inner" wide />
      <FeatureStrip data={content.features} />
      {/* Design: 43px from the strip to the intro on desktop. */}
      <Intro data={content.intro} className="lg:pt-[43px]" imageClassName="lg:aspect-[636/657]" />
      <Challenges data={content.benefits} />
      {/* No white band above Expertise on desktop (client request 2026-10-18); mobile keeps it. */}
      <CardGrid data={content.expertise} className="mt-12 lg:mt-0" />
      <EngagementModels data={content.models} className={band} />
      <HiringSteps data={content.steps} />
      <ExperienceLevels data={content.levels} className="pt-0 lg:pt-0" />
      <AudienceCards data={content.audiences} />
      <WhyChoose data={content.whyChoose} tile="light" className={band} />
      {/* Security is white since the 2026-10-17 redesign: no band after the dark Why Choose, and
          the white Tools section below drops its top padding (80px rhythm). */}
      <SecurityControls data={content.security} />
      {/* Tools and FAQ are white on this page (grey on service pages). */}
      {content.tools ? <ToolTabs data={content.tools} className="pt-0 lg:bg-white lg:pt-0" /> : null}
      <Faq data={content.faq} className="pt-0 lg:bg-white lg:pt-0" />
      {/* Spec: don't copy the design's overlap of the CTA band onto the last FAQ rows. */}
      <CtaBand data={content.ctaBand} titleClassName="max-w-[657px]" />
    </>
  );
}
