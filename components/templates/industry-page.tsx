import { CardGrid } from "@/components/sections/card-grid";
import { Challenges } from "@/components/sections/challenges";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { FeatureStrip } from "@/components/sections/feature-strip";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { SubIndustries } from "@/components/sections/sub-industries";
import { WhyChoose } from "@/components/sections/why-choose";
import type { IndustryPageContent } from "@/content/industries/types";

/**
 * Industry page template (design reference: real-estate-accounting-services; spec §(3) order:
 * Hero, Feature strip, Intro, Key Challenges, dark Services 3×2, Sub-Industries, Why Choose,
 * Security removed (user request 2026-10-18), FAQ, CTA band). One DOM for every breakpoint; no mobile design,
 * so blocks use the Home mobile patterns (report §3.5).
 *
 * Rhythm mirrors the Figma auto-layout (80px between sections). The ~700px blank band the
 * design leaves above the CTA is a placeholder (spec): normal section spacing is used.
 */
export function IndustryPageTemplate({ content }: { content: IndustryPageContent }) {
  return (
    <>
      <Hero
        data={content.hero}
        variant="inner"
        className="lg:pt-[232px] lg:pb-[91px]"
        subtitleClassName="lg:max-w-[631px]"
      />
      <FeatureStrip data={content.features} />
      {/* Design: 47px from the strip to the intro on desktop. */}
      <Intro data={content.intro} className="lg:pt-[47px]" imageClassName="lg:min-h-[585px]" />
      <Challenges data={content.challenges} />
      {/* No white band above Expertise on desktop (client request 2026-10-18); mobile keeps it. */}
      <CardGrid data={content.services} className="mt-12 lg:mt-0" />
      <SubIndustries data={content.subIndustries} />
      <WhyChoose data={content.whyChoose} />
      {/* FAQ is white on this page. */}
      <Faq data={content.faq} className="bg-white" introClassName="lg:max-w-[416px]" />
      <CtaBand data={content.ctaBand} titleClassName="max-w-[657px]" />
    </>
  );
}
