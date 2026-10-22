import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import type { ServicesContent } from "@/content/types";

import { ServicesAccordionList } from "./services-accordion-list";
import { sectionId } from "@/lib/section-ids";

/** Services section: white (mobile design) → dark gradient (desktop design). Anchor: #services. */
export function Services({ data }: { data: ServicesContent }) {
  return (
    <section id={sectionId(data, "services")} aria-labelledby="services-title" className="bg-white section-y lg:bg-dark-gradient">
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="mx-auto flex max-w-[776px] flex-col items-center gap-4 text-center">
          {/* Badge + subtitle fade up like every section heading (2026-10-18). */}
          <FadeUp
            as="p"
            className="inline-flex h-9 items-center rounded-pill border border-brand-border bg-brand-50 px-6 text-eyebrow font-medium text-brand lg:border-dark-border lg:bg-dark-card lg:text-white"
          >
            {data.badge}
          </FadeUp>
          <RevealText as="h2" id="services-title" className="text-h2-m text-heading lg:text-h2 lg:text-white">
            {data.title.before ? `${data.title.before} ` : null}
            <span className="lg:text-brand">{data.title.highlight}</span>
            {data.title.after ? ` ${data.title.after}` : null}
          </RevealText>
          <FadeUp as="p" delay={0.12} className="text-b3 font-normal text-body lg:text-on-dark">
            {data.subtitle}
          </FadeUp>
        </div>
        <ServicesAccordionList data={data} />
      </div>
    </section>
  );
}
