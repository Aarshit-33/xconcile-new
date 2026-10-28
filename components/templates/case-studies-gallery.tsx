import { CaseStudiesList } from "@/components/case-studies/case-studies-list";
import { CtaBand } from "@/components/sections/cta-band";
import { Hero } from "@/components/sections/hero";
import type { CaseStudiesGalleryContent } from "@/content/case-studies";
import type { CaseStudyCard } from "@/sanity/lib/case-studies";

/**
 * Case Studies gallery (`/case-studies`, design pages/Case study gallary/page.svg), mobile first,
 * one DOM for every breakpoint: centred hero (badge, H1, subtitle, one button), the case study
 * grid, CTA band. Same hero spacing as the Blog gallery (built from the same design).
 */
export function CaseStudiesGalleryTemplate({
  content,
  items,
}: {
  content: CaseStudiesGalleryContent;
  items: CaseStudyCard[];
}) {
  return (
    <>
      <Hero
        data={content.hero}
        variant="inner"
        align="center"
        className="lg:pt-[193px] lg:pb-[87px]"
      />
      <CaseStudiesList data={content.list} items={items} />
      <CtaBand data={content.ctaBand} />
    </>
  );
}
