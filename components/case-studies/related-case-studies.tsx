import { RevealList } from "@/components/motion/reveal-list";
import { CtaLink } from "@/components/shared/cta";
import { SectionHeading } from "@/components/shared/section-heading";
import type { CaseStudyPageSettings } from "@/content/case-studies";
import { routes } from "@/lib/routes";
import type { CaseStudyCard as CaseStudyCardData } from "@/sanity/lib/case-studies";

import { CaseStudyCard } from "./case-study-card";

/**
 * "Related Case Studies" (design pages/case study/page.svg): heading left + "Explore More Case
 * Studies" on the right, 3 photo cards; the button moves under the cards below lg (same layout
 * as the blog's Related Blog). Cards: the case study's picks, else same industry, else newest.
 */
export function RelatedCaseStudies({
  data,
  items,
}: {
  data: CaseStudyPageSettings["related"];
  items: CaseStudyCardData[];
}) {
  if (!items.length) return null;
  return (
    <section
      id="related-case-studies"
      aria-labelledby="related-case-studies-title"
      className="bg-white section-y"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <SectionHeading
            eyebrow={data.badge}
            title={data.title}
            titleId="related-case-studies-title"
            subtitle={data.subtitle}
            align="responsive"
            className="lg:max-w-[776px]"
            subtitleClassName="text-b1 lg:text-b3"
          />
          <CtaLink
            href={routes.caseStudies()}
            variant="outline"
            className="hidden shrink-0 lg:mb-1 lg:inline-flex"
          >
            {data.ctaLabel}
          </CtaLink>
        </div>
        <RevealList className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="md:max-lg:last:odd:col-span-2 md:max-lg:last:odd:mx-auto md:max-lg:last:odd:w-[calc(50%-12px)]"
            >
              <CaseStudyCard item={item} linkLabel={data.cardLinkLabel} />
            </li>
          ))}
        </RevealList>
        <div className="flex justify-center lg:hidden">
          <CtaLink href={routes.caseStudies()} variant="outline" className="w-full md:w-auto">
            {data.ctaLabel}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
