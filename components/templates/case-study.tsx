import { CaseStudyContent } from "@/components/case-studies/case-study-content";
import { CaseStudyHero, CaseStudyOverview } from "@/components/case-studies/case-study-header";
import { RelatedCaseStudies } from "@/components/case-studies/related-case-studies";
import { CtaBand } from "@/components/sections/cta-band";
import type { CaseStudyPageSettings } from "@/content/case-studies";
import type { CaseStudyCard, CaseStudyPage } from "@/sanity/lib/case-studies";

/**
 * Case study page (`/case-studies/<slug>`, design pages/case study/page.svg), mobile first:
 * hero → photo + Client/Service/Goal card → content (text in the photo's column, results band
 * full width) → Related Case Studies → CTA band (the case study's own, else the gallery's).
 */
export function CaseStudyTemplate({
  study,
  related,
  settings,
}: {
  study: CaseStudyPage;
  related: CaseStudyCard[];
  settings: CaseStudyPageSettings;
}) {
  return (
    <>
      <CaseStudyHero title={study.title} badge={settings.badge} />
      <article
        aria-labelledby="case-study-title"
        className="bg-white pt-6 pb-12 md:pt-8 md:pb-16 lg:pb-10"
      >
        <div className="container-site flex flex-col gap-10 lg:gap-[88px]">
          <CaseStudyOverview study={study} />
          <CaseStudyContent body={study.body} />
        </div>
      </article>
      <RelatedCaseStudies data={settings.related} items={related} />
      <CtaBand data={study.ctaBand} />
    </>
  );
}
