"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { motionPresets } from "@/lib/motion";

type Tag = "h1" | "h2" | "h3" | "p";

/**
 * "Text coming in" effect: splits the heading into masked lines and slides them up when the
 * heading scrolls into view. Text stays in the server HTML (SEO); SplitText adds aria-label
 * to keep screen-reader output intact. Skipped for prefers-reduced-motion.
 * GSAP loads on demand after hydration (see useLazyGsap).
 * Do not use on the LCP heading (hero uses a CSS entrance instead).
 */
export function RevealText({
  as: Comp = "h2",
  children,
  className,
  id,
}: {
  as?: Tag;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useLazyGsap(ref, ({ gsap, SplitText }, el) => {
    const { textReveal } = motionPresets;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: textReveal.from.yPercent,
          opacity: textReveal.from.opacity,
          duration: textReveal.duration,
          stagger: textReveal.stagger,
          ease: textReveal.ease,
          scrollTrigger: { trigger: el, ...textReveal.scrollTrigger },
        }),
    });
  });

  return (
    <Comp ref={ref} id={id} className={className}>
      {children}
    </Comp>
  );
}
