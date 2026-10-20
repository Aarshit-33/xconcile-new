"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll parallax. Moves its content by ±`amount` (% of its own height) while the
 * element crosses the viewport. For images, wrap an oversized inner box inside an
 * overflow-hidden frame (see `ParallaxImageFrame`) so no gaps appear.
 * GSAP loads on demand after hydration (see useLazyGsap); `amount` is read once per mount.
 */
export function Parallax({
  children,
  className,
  amount = 8,
}: {
  children: React.ReactNode;
  className?: string;
  /** yPercent travel in each direction. Keep it small (finance brand). */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLazyGsap(ref, ({ gsap }, el) => {
    gsap.fromTo(
      el,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

/** Overflow-hidden frame whose (10% taller) content drifts with scroll. */
export function ParallaxImageFrame({
  children,
  className,
  amount = 4,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Parallax amount={amount} className="absolute inset-x-0 -top-[6%] h-[112%]">
        {children}
      </Parallax>
    </div>
  );
}
