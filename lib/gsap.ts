"use client";

/**
 * Single GSAP entry point. Plugins are registered here exactly once.
 *
 * Don't import this module (or "gsap") statically from components: that puts GSAP in the
 * initial bundle. Use the lazy hook, which dynamic-imports this file after hydration:
 *   const ref = useRef<HTMLDivElement>(null);
 *   useLazyGsap(ref, ({ gsap, ScrollTrigger, SplitText }, el) => { ... }); // auto-cleanup
 * (components/motion/use-lazy-gsap.ts)
 *
 * GSAP >= 3.13 ships every plugin (incl. SplitText) for free under the standard license.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  // Default tween length = textReveal preset (+0.5s rule, see lib/motion.ts).
  gsap.defaults({ ease: "power3.out", duration: 1.3 });
}

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
