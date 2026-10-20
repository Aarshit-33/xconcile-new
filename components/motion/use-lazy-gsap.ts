"use client";

import { useEffect, useEffectEvent, type RefObject } from "react";

export type GsapModule = typeof import("@/lib/gsap");

/**
 * Runs a GSAP setup for `scope`, loading GSAP (+ ScrollTrigger, SplitText) on demand via a
 * dynamic import of `@/lib/gsap`. This keeps the animation library out of the initial JS, which
 * is on the LCP critical path in Lighthouse's mobile simulation.
 *
 * The setup runs when the element comes within one viewport of the fold (IntersectionObserver),
 * so SplitText/ScrollTrigger work is spread over the scroll instead of one long task after
 * hydration, and "from" states are still applied before the element becomes visible.
 *
 * Everything created in `setup` is collected in a `gsap.context` scoped to `scope` and reverted
 * on unmount (same cleanup guarantees as `useGSAP`). Skipped for prefers-reduced-motion.
 * `setup` runs once per mount; it always sees the latest props.
 */
export function useLazyGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (gsapModule: GsapModule, el: HTMLElement) => void,
) {
  const runSetup = useEffectEvent(setup);

  useEffect(() => {
    const el = scope.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let ctx: ReturnType<GsapModule["gsap"]["context"]> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        import("@/lib/gsap").then((mod) => {
          if (cancelled) return;
          ctx = mod.gsap.context(() => runSetup(mod, el), el);
        });
      },
      { rootMargin: "0px 0px 100% 0px" },
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
      ctx?.revert();
    };
  }, [scope]);
}
