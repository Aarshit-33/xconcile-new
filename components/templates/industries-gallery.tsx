import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { FeatureCards } from "@/components/sections/feature-cards";
import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import type { IndustriesGalleryContent } from "@/content/industries/types";

/**
 * Industries gallery template (`/industries`, design: pages/industry/Industry.svg): Hero (one
 * button), feature cards, every industry card, FAQ, CTA band. Hero, FAQ and CTA band are set up
 * exactly like the industry pages (components/templates/industry-page.tsx); the card grid is
 * Home's Industries block with its heading centred and no button, as drawn. One DOM for every
 * breakpoint; no mobile design, so blocks keep their Home mobile patterns.
 */
export function IndustriesGalleryTemplate({ content }: { content: IndustriesGalleryContent }) {
  return (
    <>
      <Hero
        data={content.hero}
        variant="inner"
        className="lg:pt-[232px] lg:pb-[91px]"
        subtitleClassName="lg:max-w-[631px]"
      />
      <FeatureCards data={content.features} />
      {/* Second white section in a row: no extra top padding (one 80px gap, as drawn). */}
      <Industries data={content.industries} headingAlign="center" className="pt-0 lg:pt-0" />
      {/* FAQ is white in this design, like the industry pages. */}
      <Faq data={content.faq} className="bg-white" introClassName="lg:max-w-[416px]" />
      <CtaBand data={content.ctaBand} />
    </>
  );
}
