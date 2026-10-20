import type Link from "next/link";

import { ScheduleCta } from "@/components/calendly/schedule-cta";
import { SCHEDULE_HREF } from "@/content/types";

import { CtaPill } from "./cta-pill";
import { type CtaVariant } from "./cta-styles";

export { CtaPill } from "./cta-pill";
export { CtaArrow, CtaContent, ctaClassName, ctaLabelTone, type CtaVariant } from "./cta-styles";

/**
 * Content CTA (pill link), rendered by `<CtaPill>`. `href === SCHEDULE_HREF` renders the same
 * pill as a button that opens the Calendly popup (pages without a contact section).
 */
export function CtaLink({
  href,
  children,
  variant = "solid",
  block,
  mobileSolid,
  arrow,
  className,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: CtaVariant;
  block?: boolean | "always";
  mobileSolid?: boolean;
  /** defaults to true for solid / mobileSolid */
  arrow?: boolean;
  className?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  if (href === SCHEDULE_HREF) {
    return (
      <ScheduleCta variant={variant} block={block} mobileSolid={mobileSolid} arrow={arrow} className={className}>
        {children}
      </ScheduleCta>
    );
  }

  return (
    <CtaPill
      href={href}
      variant={variant}
      block={block}
      mobileSolid={mobileSolid}
      arrow={arrow}
      className={className}
      {...rest}
    >
      {children}
    </CtaPill>
  );
}
