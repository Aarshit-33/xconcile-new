"use client";

import { CtaPill } from "@/components/shared/cta-pill";

import { useCalendly } from "./calendly-provider";

/**
 * "Schedule a Meeting" CTA (navbar, mobile menu): opens the Calendly popup. The reference look
 * for `<CtaPill>`: solid arrow pill with the hover swap (see `cta-styles.tsx`).
 */
export function ScheduleMeetingButton({
  children = "Schedule a Meeting",
  block,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  block?: boolean | "always";
  className?: string;
  onClick?: () => void;
}) {
  const { openScheduler, warmProps } = useCalendly();
  return (
    <CtaPill
      block={block}
      className={className}
      aria-haspopup="dialog"
      {...warmProps}
      onClick={() => {
        onClick?.();
        openScheduler();
      }}
    >
      {children}
    </CtaPill>
  );
}
