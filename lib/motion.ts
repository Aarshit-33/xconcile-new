/**
 * Motion presets for the two effects requested for this site:
 *   1. Text "coming in" reveal (headings, hero copy)  -> GSAP SplitText + ScrollTrigger
 *   2. Subtle parallax (hero watermark, section images) -> GSAP ScrollTrigger scrub
 * Framer Motion (`motion` package) is available for simple enter/exit + layout
 * animations (accordions, menus, modals) where a React-first API is easier.
 *
 * Rules:
 * - Keep it subtle (finance/YMYL brand). No effect may change layout or hide content
 *   from crawlers: text must be in the HTML; animate only transform/opacity.
 * - Always honour prefers-reduced-motion (see prefersReducedMotion() in lib/gsap.ts).
 * - Never animate the LCP element's opacity from 0 on first paint (hurts LCP).
 * - Timing (client request 2026-10-16): every entrance animation runs 0.5s longer than the
 *   original build (durations below, gsap.defaults in lib/gsap.ts and the hero keyframes in
 *   app/globals.css). Staggers are unchanged. Hover/UI transitions are not affected.
 */
export const motionPresets = {
  textReveal: {
    split: "lines,words" as const,
    from: { yPercent: 100, opacity: 0 },
    to: { yPercent: 0, opacity: 1 },
    duration: 1.3,
    stagger: 0.06,
    ease: "power3.out",
    scrollTrigger: { start: "top 85%", once: true },
  },
  fadeUp: {
    from: { y: 24, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 1.1,
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: { start: "top 85%", once: true },
  },
  /** Whole cards rising into place as each reaches the viewport (RevealList; client request 2026-10-22). */
  cardReveal: {
    from: { y: 40, opacity: 0 },
    duration: 1.2,
    /** Blocks entering together (same card / same row) follow each other by this much. */
    stagger: 0.08,
    ease: "power3.out",
    /** Same start as textReveal, so a section's heading and its cards begin together. */
    start: "top 85%",
  },
  /**
   * Stats counting from 0 to their value (CountUp; client request 2026-10-17). 1.5s base
   * + the 0.5s timing rule. Neighbouring numbers start `stagger` apart.
   */
  countUp: {
    duration: 2,
    stagger: 0.15,
    ease: "power2.out",
    start: "top 90%",
  },
  parallax: {
    /** px travelled across the trigger's scroll range; keep <= 80 */
    distance: 60,
    ease: "none",
    scrollTrigger: { start: "top bottom", end: "bottom top", scrub: true },
  },
} as const;
