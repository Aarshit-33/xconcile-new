import { SectionHeading } from "@/components/shared/section-heading";
import type { SubIndustriesContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

import { SubIndustriesAccordion } from "./sub-industries-accordion";

/**
 * Industry "Sub-Industries" (real-estate design "Accounting Expertise Across Real Estate"):
 * white section, centred heading (824px), then full-width rows (1298px) between hairlines,
 * padding 24/0: green "01" number, 46px, green 24px icon, 56px, 20/28 title over a 14/20 line,
 * round "+" on the right.
 *
 * The rows are an accordion (user request 2026-10-18): the "+" opens the row's grouped details
 * (content `groups`, see SubIndustriesAccordion). No mobile design: the number and icon stay,
 * gaps tighten.
 */
export function SubIndustries({ data, className }: { data: SubIndustriesContent; className?: string }) {
  return (
    <section id={sectionId(data, "subIndustries")} aria-labelledby="sub-industries-title" className={cn("section-y", className)}>
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId="sub-industries-title"
          subtitle={data.subtitle}
          subtitleClassName="max-w-[824px]"
        />

        <SubIndustriesAccordion items={data.items} />
      </div>
    </section>
  );
}
