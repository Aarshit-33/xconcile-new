import { getImageProps } from "next/image";

import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { HighlightText } from "@/components/shared/highlight-text";
import { CtaLink } from "@/components/shared/cta";
import type { CtaBandContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B18 CTA band, `image-overlay` variant (audit design "Scale your Audit Capacity…"):
 * full-bleed photo under a 90% navy overlay, centred H2 40/48 white, 18/28 copy at 80% white,
 * solid arrow pill. Desktop 463px tall; mobile (no design) uses the mobile section rhythm.
 * The photo is a CSS background (decorative) served through the next/image optimizer.
 * Optional `secondaryCta`: outline button beside the solid one (RCM design "Get Started"), same
 * style as the hero's secondary button; the pair stacks full-width on phones.
 * Either button can be switched off in Studio ("Show main button" / "Show second button"), so
 * the band may show both, one, or no button.
 */
export function CtaBand({
  data,
  className,
  titleClassName,
}: {
  data: CtaBandContent;
  className?: string;
  /** e.g. `max-w-[657px]` where the design draws a narrower two-line heading (Hire). */
  titleClassName?: string;
}) {
  const {
    props: { src },
  } = getImageProps({ src: data.image.src, alt: "", width: 1440, height: 960, quality: 70 });

  const id = sectionId(data, "ctaBand");
  // Heading id from the section id, so a section type can appear twice on a page.
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`bg-cta-overlay py-16 lg:flex lg:min-h-[463px] lg:items-center lg:py-20 ${className ?? ""}`}
      style={{ "--cta-image": `url(${src})` } as React.CSSProperties}
    >
      <div className="container-site flex flex-col items-center gap-8 text-center lg:gap-10">
        {/* 927px content column (design width; was 1020px briefly on 2026-10-26). Tablets
            (768–1023px): 600px so heading and text don't run edge to edge (user request 2026-10-26). */}
        <div className="flex max-w-[927px] flex-col items-center gap-4 md:max-w-[600px] lg:max-w-[927px] lg:gap-8">
          <RevealText
            as="h2"
            id={titleId}
            className={cn("text-h2-m text-white lg:text-h2", titleClassName)}
          >
            <HighlightText text={data.title} />
          </RevealText>
          {/* Fills the 927px column (user request 2026-10-26; was max-w-[725px]). */}
          <FadeUp as="p" delay={0.12} className="text-b1 font-medium text-on-dark lg:text-b3">
            {data.body}
          </FadeUp>
        </div>
        {data.cta && data.secondaryCta ? (
          <div className="flex w-full flex-col items-stretch gap-4 md:w-auto md:flex-row md:items-center md:justify-center">
            <CtaLink href={data.cta.href} className="w-full justify-center md:w-auto">
              {data.cta.label}
            </CtaLink>
            <CtaLink
              href={data.secondaryCta.href}
              variant="outline-dark"
              className="w-full justify-center hover:bg-[#FFFFFF] hover:text-brand md:w-auto dark:hover:bg-[#FFFFFF] dark:hover:text-brand"
            >
              {data.secondaryCta.label}
            </CtaLink>
          </div>
        ) : data.cta ? (
          <CtaLink href={data.cta.href}>{data.cta.label}</CtaLink>
        ) : data.secondaryCta ? (
          // Second button alone (main one switched off in Studio): keeps its outline style.
          <CtaLink
            href={data.secondaryCta.href}
            variant="outline-dark"
            className="hover:bg-[#FFFFFF] hover:text-brand dark:hover:bg-[#FFFFFF] dark:hover:text-brand"
          >
            {data.secondaryCta.label}
          </CtaLink>
        ) : null}
      </div>
    </section>
  );
}
