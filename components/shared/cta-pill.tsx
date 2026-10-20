import Link from "next/link";

import { Button } from "@/components/ui/button";

import { CtaContent, ctaClassName, ctaLabelTone, type CtaVariant } from "./cta-styles";

type PillOptions = {
  children: React.ReactNode;
  /** solid = green arrow pill (navbar "Schedule a Meeting" style); outline / outline-dark */
  variant?: CtaVariant;
  /** full width on mobile (true) or always ("always") */
  block?: boolean | "always";
  /** solid arrow pill on mobile, outline on desktop */
  mobileSolid?: boolean;
  /** defaults to true for solid / mobileSolid */
  arrow?: boolean;
  className?: string;
};

type PillAsLink = PillOptions & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type PillAsButton = PillOptions & { href?: undefined } & Omit<
    React.ComponentProps<"button">,
    "className" | "children"
  >;

/**
 * The site's pill CTA, one component for every pill (reference: the navbar "Schedule a Meeting").
 *
 * - `href` -> a Next <Link>; no `href` -> a <button> (pass `onClick`, e.g. the Calendly popup).
 * - Solid + arrow pills get the hover swap: the arrow circle slides to the left, the label slides
 *   right, the pill turns #FFFFFF with a green label and the circle turns green.
 * - The label colour is set on the label itself for every state, so containers that restyle
 *   descendant links (accordions, rich text) can't hide it (e.g. white label on the white pill).
 *
 * Content links whose href may be `SCHEDULE_HREF` should use `CtaLink` (it routes those to the
 * Calendly popup); `CtaLink`, `ScheduleCta` and `ScheduleMeetingButton` all render this.
 */
export function CtaPill(props: PillAsLink | PillAsButton) {
  const { children, variant = "solid", block, mobileSolid = false, arrow, className, ...rest } = props;
  const showArrow = arrow ?? (variant === "solid" || mobileSolid);
  const swap = variant === "solid" && !mobileSolid && showArrow;
  const cls = ctaClassName({ variant, block, mobileSolid, swap, className });
  const content = (
    <CtaContent
      arrow={showArrow}
      swap={swap}
      arrowClassName={mobileSolid ? "lg:hidden" : undefined}
      labelClassName={ctaLabelTone({ variant, mobileSolid, swap })}
    >
      {children}
    </CtaContent>
  );

  if (rest.href !== undefined) {
    const linkProps = rest as Omit<PillAsLink, keyof PillOptions>;
    return (
      <Button asChild variant="ghost" className={cls}>
        <Link {...linkProps}>{content}</Link>
      </Button>
    );
  }

  const { href: _href, ...buttonProps } = rest as Omit<PillAsButton, keyof PillOptions>;
  void _href;
  return (
    <Button type="button" variant="ghost" className={cls} {...buttonProps}>
      {content}
    </Button>
  );
}
