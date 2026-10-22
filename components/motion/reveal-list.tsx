"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { motionPresets } from "@/lib/motion";

/**
 * List of cards that RISE INTO PLACE as each one reaches the viewport: the whole card (border,
 * photo, copy) moves, not just its text (client request 2026-10-22; from 2026-10-14 until then
 * only the content marked `data-reveal` moved and the cards stayed still). Every direct child of
 * the list is a card. `data-reveal-y="80"` on a card overrides its travel distance.
 *
 * ScrollTrigger.batch: cards entering together (e.g. one desktop row) follow each other by a
 * short stagger. Plays once. Content stays in the server HTML (SEO) and is only hidden right
 * before it scrolls into view (useLazyGsap runs the setup one viewport ahead). Only
 * transform/opacity are animated, so layout never shifts; the transform is cleared when the
 * tween ends so CSS hover lifts on the cards keep working. Skipped for prefers-reduced-motion.
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
    if (!cards.length) return;

    gsap.set(cards, {
      opacity: cardReveal.from.opacity,
      y: (_i: number, card: HTMLElement) => Number(card.dataset.revealY) || cardReveal.from.y,
    });
    ScrollTrigger.batch(cards, {
      start: cardReveal.start,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
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
