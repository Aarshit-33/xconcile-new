"use client";

import { useEffect, useState } from "react";

import { ArrowUpwardIcon } from "@/components/icons/material-symbols";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Back-to-top arrow (client rule "slide arrow, e.g. back to top"). Not drawn in the design:
 * brand-green circle, sits above the Zoho SalesIQ chat bubble (bottom-right).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      type="button"
      size="icon"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className={cn(
        "fixed right-5 bottom-24 z-40 size-12 rounded-full bg-brand text-white shadow-lg transition-all duration-300 hover:bg-brand/90",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ArrowUpwardIcon className="size-6" />
    </Button>
  );
}
