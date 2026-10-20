"use client";

import { useRef } from "react";

import { useLazyGsap } from "@/components/motion/use-lazy-gsap";
import { motionPresets } from "@/lib/motion";

const MULTIPLIERS: Record<string, number> = { K: 1_000, M: 1_000_000 };

/**
 * Splits a stat like "10+", "1K+", "98%", "$2.5M" into prefix / number / suffix. "K"/"M" right
 * after the number are expanded (1K -> 1000) so the count runs through real values.
 */
function parse(value: string) {
  const m = value.match(/^(\D*?)(\d+(?:\.\d+)?)([KM]?)(.*)$/);
  if (!m) return null;
  const [, prefix, num, unit, rest] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return { prefix, target: Number(num) * (MULTIPLIERS[unit] ?? 1), decimals: unit ? 0 : decimals, rest };
}

/**
 * Number that counts up from 0 to `value` when it scrolls into view (GSAP, loaded on demand).
 * The server HTML contains the real value (SEO, no-JS, reduced motion keep it). Before counting,
 * the element's width is locked to the final value so neighbours never shift. Intermediate
 * frames show the expanded number ("640+"), the last frame restores the exact `value` ("1K+").
 * Values without a number are left untouched.
 */
export function CountUp({ value, index = 0 }: { value: string; index?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLazyGsap(ref, ({ gsap }, el) => {
    const parsed = parse(value);
    // React's own text node: updating its nodeValue (not textContent) keeps React's DOM reference.
    const text = el.firstChild;
    if (!parsed || !text || text.nodeType !== Node.TEXT_NODE) return;
    const { countUp } = motionPresets;
    const format = (n: number) => `${parsed.prefix}${n.toFixed(parsed.decimals)}${parsed.rest}`;

    el.style.minWidth = `${el.getBoundingClientRect().width}px`;
    const counter = { n: 0 };
    text.nodeValue = format(0);
    gsap.to(counter, {
      n: parsed.target,
      duration: countUp.duration,
      delay: index * countUp.stagger,
      ease: countUp.ease,
      scrollTrigger: { trigger: el, start: countUp.start, once: true },
      onUpdate: () => {
        text.nodeValue = format(counter.n);
      },
      onComplete: () => {
        text.nodeValue = value;
      },
    });
  });

  return (
    <span ref={ref} className="inline-block whitespace-nowrap">
      {value}
    </span>
  );
}
