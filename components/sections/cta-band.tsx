import { getImageProps } from "next/image";

import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";
import { CtaLink } from "@/components/shared/cta";
import type { CtaBandContent } from "@/content/types";
import { cn } from "@/lib/utils";
import { sectionId } from "@/lib/section-ids";

/**
 * B18 CTA band, `image-overlay` variant (audit design "Scale your Audit Capacity…"):
 * full-bleed photo under a 90% navy overlay, centred H2 40/48 white, 18/28 copy at 80% white,
 * solid arrow pill. Desktop 463px tall; mobile (no design) uses the mobile section rhythm.
 * The photo is a CSS background (decorative) served through the next/image optimizer.
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

  return (
    <section id={sectionId(data, "ctaBand")}
      aria-labelledby="cta-band-title"
      className={`bg-cta-overlay py-16 lg:flex lg:min-h-[463px] lg:items-center lg:py-20 ${className ?? ""}`}
      style={{ "--cta-image": `url(${src})` } as React.CSSProperties}
    >
      <div className="container-site flex flex-col items-center gap-8 text-center lg:gap-10">
        <div className="flex max-w-[927px] flex-col items-center gap-4 lg:gap-8">
          <RevealText
            as="h2"
            id="cta-band-title"
            className={cn("text-h2-m text-white lg:text-h2", titleClassName)}
          >
            {data.title}
          </RevealText>
          <FadeUp as="p" delay={0.12} className="max-w-[725px] text-b1 font-normal text-on-dark lg:text-b3">
            {data.body}
          </FadeUp>
        </div>
        <CtaLink href={data.cta.href}>{data.cta.label}</CtaLink>
      </div>
    </section>
  );
}
