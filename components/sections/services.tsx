import { siteIconPath } from "@/components/icons/registry";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { HighlightText } from "@/components/shared/highlight-text";
import type { ServicesContent } from "@/content/types";

import { ServicesAccordionList } from "./services-accordion-list";
import { sectionId } from "@/lib/section-ids";

/**
 * Services section: dark gradient on every screen (user request 2026-10-24: mobile matches the
 * desktop design; the mobile design drew it white). Anchor: #services.
 */
export function Services({ data }: { data: ServicesContent }) {
  return (
    <section
      id={sectionId(data, "services")}
      aria-labelledby="services-title"
      className="bg-dark-gradient section-y"
    >
      <div className="container-site flex flex-col gap-8 lg:gap-12">
        <div className="mx-auto flex max-w-[776px] flex-col items-center gap-4 text-center">
          {/* Badge + subtitle fade up like every section heading (2026-10-18). */}
          <FadeUp
            as="p"
            className="inline-flex h-9 items-center rounded-pill border border-dark-border bg-dark-card px-6 text-eyebrow font-medium text-white"
          >
            {data.badge}
          </FadeUp>
          <RevealText as="h2" id="services-title" className="text-h2-m text-white lg:text-h2">
            <HighlightText text={data.title} />
          </RevealText>
          <FadeUp as="p" delay={0.12} className="text-b3 font-normal text-on-dark">
            {data.subtitle}
          </FadeUp>
        </div>
        {/* Icon paths resolved here (server) so the client list doesn't bundle every icon. */}
        <ServicesAccordionList
          data={data}
          iconPaths={data.items.map((item) => siteIconPath(item.icon))}
        />
      </div>
    </section>
  );
}
