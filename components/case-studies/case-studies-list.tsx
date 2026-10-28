import { SectionHeading } from "@/components/shared/section-heading";
import type { CaseStudiesListContent } from "@/content/case-studies";
import { sectionId } from "@/lib/section-ids";
import type { CaseStudyCard as CaseStudyCardData } from "@/sanity/lib/case-studies";

import { CaseStudyCard } from "./case-study-card";
import { CaseStudyGrid } from "./case-study-grid";

/**
 * Gallery grid (design pages/Case study gallary/page.svg): centred eyebrow + H2 + subtitle,
 * then the filter tabs (NOT IN DESIGN, user request 2026-10-27; tabs = the case studies'
 * industries, most used first) and the photo cards: 1 column on phones, 2 on tablets, 3 on
 * desktop, 24px gaps. First `perPage` cards (6 = two desktop rows), then "Show more".
 */
export function CaseStudiesList({
  data,
  items,
}: {
  data: CaseStudiesListContent;
  items: CaseStudyCardData[];
}) {
  const id = sectionId(data, "caseStudies");
  const titleId = `${id}-title`;

  // Tabs: each industry once, the most common first (ties keep the newest-first order).
  const counts = new Map<string, number>();
  for (const i of items) if (i.industry) counts.set(i.industry, (counts.get(i.industry) ?? 0) + 1);
  const industries = [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)!);

  return (
    <section id={id} aria-labelledby={titleId} className="bg-white section-y">
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          subtitle={data.subtitle}
          className="mx-auto max-w-[776px]"
        />
        {items.length ? (
          <CaseStudyGrid
            listId={`${id}-list`}
            perPage={Math.max(1, data.perPage)}
            allLabel={data.allLabel}
            loadMoreLabel={data.loadMoreLabel}
            industries={industries}
            items={items.map((item) => ({
              id: item.id,
              industry: item.industry,
              card: <CaseStudyCard item={item} linkLabel={data.cardLinkLabel} />,
            }))}
          />
        ) : (
          <p className="text-center text-b1 text-body lg:text-b3">{data.emptyText}</p>
        )}
      </div>
    </section>
  );
}
