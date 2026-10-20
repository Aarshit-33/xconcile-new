"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { motionPresets } from "@/lib/motion";

type Tag = "div" | "p";

/**
 * Small fade-up entrance for the text around a section heading (eyebrow badge, subtitle;
 * user request 2026-10-18), so they come in together with the RevealText H2 instead of
 * already sitting there. Uses `motionPresets.fadeUp` (24px, 1.1s). Same trigger as the H2.
 * Content stays in the server HTML and visible without JS; skipped for prefers-reduced-motion.
 * Only transform/opacity are animated, so layout never shifts.
 */
export function FadeUp({
  as: Comp = "div",
  className,
  children,
  delay = 0,
  id,
}: {
  as?: Tag;
  className?: string;
  children: React.ReactNode;
  /** Seconds after the element's trigger (e.g. subtitle slightly after the eyebrow). */
  delay?: number;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useLazyGsap(ref, ({ gsap }, el) => {
    const { fadeUp } = motionPresets;
    gsap.from(el, {
      ...fadeUp.from,
      duration: fadeUp.duration,
      ease: fadeUp.ease,
      delay,
      scrollTrigger: { trigger: el, ...fadeUp.scrollTrigger },
    });
  });

  return (
    // The union ref type is safe: every allowed tag is an HTMLElement.
    <Comp ref={ref as React.RefObject<never>} id={id} className={className}>
      {children}
    </Comp>
  );
}
