import { SectionHeading } from "@/components/shared/section-heading";
import type { FaqContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

import { FaqAccordion } from "./faq-accordion";

/**
 * B19 FAQ. Mobile: white, centred heading, accordion below. Desktop: #FAFAFA, heading + intro
 * left (416px), accordion right (747px). FAQPage JSON-LD is emitted by the page.
 */
export function Faq({
  data,
  className,
  introClassName,
}: {
  data: FaqContent;
  className?: string;
  /** e.g. `lg:max-w-[416px]` where the design's intro box is wider than Home's 368px. */
  introClassName?: string;
}) {
  const id = sectionId(data, "faq");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    // pb-20: 80px before the contact section (mobile design); desktop keeps 80/80.
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("bg-surface-soft pt-12 pb-20 lg:py-20", className)}
    >
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,416fr)_minmax(0,747fr)] lg:justify-between lg:gap-16 xl:gap-[133px]">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          titleId={titleId}
          align="responsive"
          // Sticky left panel like Challenges (client request 2026-10-17): stays below the fixed
          // navbar while the questions scroll. self-start keeps it from stretching to the row.
          className="lg:sticky lg:top-header-offset lg:self-start"
          titleClassName="text-heading-alt lg:mb-3"
          subtitle={
            typeof data.intro === "string"
              ? data.intro
              : data.intro.map((line, i) => (
                  <span key={line}>
                    {i > 0 ? <br /> : null}
                    {line}
                  </span>
                ))
          }
          subtitleClassName={cn("max-w-[368px] text-b1 text-body-alt lg:text-b3", introClassName)}
        />

        <FaqAccordion items={data.items} />
      </div>
    </section>
  );
}
