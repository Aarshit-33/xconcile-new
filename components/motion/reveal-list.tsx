"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { motionPresets } from "@/lib/motion";

/**
 * List of cards whose CONTENT rises into place when each card reaches the viewport. The cards
 * themselves never move (client feedback 2026-10-14): inside each direct child, the elements
 * marked `data-reveal` are animated, or all of the card's own children when none are marked.
 * Give the card `overflow-hidden` to make the content appear from its bottom edge.
 *
 * ScrollTrigger.batch: cards entering together (e.g. one desktop row) follow each other by a
 * short stagger. Plays once. Content stays in the server HTML (SEO) and is only hidden right
 * before it scrolls into view (useLazyGsap runs the setup one viewport ahead). Only
 * transform/opacity are animated, so layout never shifts. Skipped for prefers-reduced-motion.
 */
export function RevealList({
  as: Comp = "ul",
  className,
  children,
  "aria-label": ariaLabel,
}: {
  as?: "ul" | "ol" | "div";
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useLazyGsap(ref, ({ gsap, ScrollTrigger }, el) => {
    const { cardReveal } = motionPresets;
    const cards = Array.from(el.children) as HTMLElement[];
    const targetsOf = (card: Element) => {
      const marked = card.querySelectorAll<HTMLElement>("[data-reveal]");
      return marked.length ? Array.from(marked) : (Array.from(card.children) as HTMLElement[]);
    };
    const all = cards.flatMap(targetsOf);
    if (!all.length) return;

    // `data-reveal-y="80"` overrides the travel distance for one element.
    gsap.set(all, {
      opacity: cardReveal.from.opacity,
      y: (_i: number, t: HTMLElement) => Number(t.dataset.revealY) || cardReveal.from.y,
    });
    ScrollTrigger.batch(cards, {
      start: cardReveal.start,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch.flatMap(targetsOf), {
          y: 0,
          opacity: 1,
          duration: cardReveal.duration,
          stagger: cardReveal.stagger,
          ease: cardReveal.ease,
          overwrite: true,
          clearProps: "transform",
        }),
    });
  });

  return (
    // The union ref type is safe: every allowed tag is an HTMLElement.
    <Comp ref={ref as React.RefObject<never>} className={className} aria-label={ariaLabel}>
      {children}
    </Comp>
  );
}
