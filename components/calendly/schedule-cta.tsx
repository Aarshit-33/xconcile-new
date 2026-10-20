"use client";

import { CtaPill } from "@/components/shared/cta-pill";
import type { CtaVariant } from "@/components/shared/cta-styles";

import { useCalendly } from "./calendly-provider";

/**
 * A content CTA whose href is `SCHEDULE_HREF`: the same `<CtaPill>` as `CtaLink` (all variants),
 * but it opens the Calendly popup. Used on pages without a contact section (client rule:
 * scheduling opens in a popup, never a new page).
 */
export function ScheduleCta({
  children,
  variant = "solid",
  block,
  mobileSolid,
  arrow,
  className,
}: {
  children: React.ReactNode;
  variant?: CtaVariant;
  block?: boolean | "always";
  mobileSolid?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const { openScheduler } = useCalendly();
  return (
    <CtaPill
      variant={variant}
      block={block}
      mobileSolid={mobileSolid}
      arrow={arrow}
      className={className}
      aria-haspopup="dialog"
      onClick={openScheduler}
    >
      {children}
    </CtaPill>
  );
}
