import { ArrowOutwardIcon } from "@/components/icons/material-symbols";
import { cn } from "@/lib/utils";

/**
 * Pill CTA styles from the design (Figma "Component 19 / 31"), applied on the shadcn Button.
 *
 *  solid        green pill + white circle with arrow_outward (h48, padding 10 8 10 16)
 *  outline      1px green border, green text (h48, padding 10 24)
 *  outline-dark same on dark sections
 *
 * `mobileSolid`: drawn as `outline` on desktop but as a full-width solid arrow pill in the
 * mobile design (e.g. "Know more about us", "View Case Study").
 */
export type CtaVariant = "solid" | "outline" | "outline-dark";

// `no-underline!`: pills sit inside containers that underline every <a> (shadcn AccordionContent
// `[&_a]:underline`, rich text); a descendant selector would otherwise win over a plain class.
const base =
  "h-12 gap-2.5 rounded-pill text-b1 font-medium whitespace-nowrap no-underline! transition-colors active:not-aria-[haspopup]:translate-y-0 [&_svg]:shrink-0";

// Each variant pins its hover text + background (incl. `dark:hover:*`) so the ghost Button's
// `hover:text-foreground` and `dark:hover:bg-muted/50` never apply (tailwind-merge drops them).
// Outline hover = brand-100 (#E7F6E2): a visibly darker tint than brand-50 (client request
// 2026-10-14: "Know more about us" / "Explore all blogs" should highlight on hover).
const variants: Record<CtaVariant, string> = {
  solid: "border-transparent bg-brand pr-2 pl-4 text-white hover:bg-brand/90 hover:text-white dark:hover:bg-brand/90",
  outline: "border-brand bg-transparent px-6 text-brand hover:bg-brand-100 hover:text-brand dark:hover:bg-brand-100",
  "outline-dark":
    "border-brand bg-transparent px-6 text-brand hover:bg-white/10 hover:text-brand dark:hover:bg-white/10",
};

// md:w-auto: tablets get a label-sized pill instead of a 700px bar (audit L4, 2026-10-18);
// phones keep the full-width pill from the mobile design.
const mobileSolidCls =
  "w-full justify-between border-transparent bg-brand pr-2 pl-4 text-white hover:bg-brand/90 hover:text-white dark:hover:bg-brand/90 md:w-auto lg:justify-center lg:border-brand lg:bg-transparent lg:px-6 lg:text-brand lg:hover:bg-brand-100 lg:hover:text-brand lg:dark:hover:bg-brand-100";

// Full-width pills: on very narrow phones (320px) a long label wraps (left-aligned, arrow kept
// right) instead of overflowing. At the 390 design width labels fit on one line -> drawn 48px pill.
const wrapNarrow = "h-auto min-h-12 py-2 text-left whitespace-normal";
const wrapNarrowMobile = "max-lg:h-auto max-lg:min-h-12 max-lg:py-2 max-lg:text-left max-lg:whitespace-normal";

export function ctaClassName({
  variant = "solid",
  block = false,
  mobileSolid = false,
  swap = false,
  className,
}: {
  variant?: CtaVariant;
  /** full width on phones (true; label-sized from md) or always ("always") */
  block?: boolean | "always";
  mobileSolid?: boolean;
  /** hover swap (solid arrow pills); pair with `<CtaContent swap>` */
  swap?: boolean;
  className?: string;
}) {
  return cn(
    base,
    mobileSolid ? mobileSolidCls : variants[variant],
    (mobileSolid || block === true) && wrapNarrowMobile,
    block === true && "w-full justify-between md:w-auto lg:justify-center",
    block === "always" && cn("w-full justify-between", wrapNarrow),
    swap && swapButton,
    className,
  );
}

/*
 * Hover swap for the solid arrow pill (client request 2026-10-14): on hover/focus the white
 * arrow circle slides from the right edge to the left edge, the label slides right by the same
 * amount, and the colours invert: pill #FFFFFF + green label, circle green + white arrow.
 * Hover-out reverses it back to the drawn state.
 * Geometry: pl-16 | label | gap-10 + circle-32 + pr-8 = 50px right padding; the circle ends at
 * left 8, so the label shifts 50 - 16 = 34px (the end state is an exact mirror of the start).
 */
const swapEase = "duration-400 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none";

const swapButton = cn(
  "relative overflow-hidden pr-[50px] transition-colors hover:border-brand hover:bg-[#FFFFFF] hover:text-brand focus-visible:bg-[#FFFFFF] focus-visible:text-brand",
  // solid #FFFFFF (no transparency): replaces the ghost Button's `dark:hover:bg-muted/50`
  "dark:hover:bg-[#FFFFFF] dark:hover:text-brand",
  swapEase,
);

const swapLabel = cn(
  "transition-[transform,color] group-hover/button:translate-x-[34px] group-focus-visible/button:translate-x-[34px]",
  swapEase,
);

/**
 * Label colour set on the label <span> itself (not inherited from the <a>/<button>), for every
 * state. Containers often restyle descendant links (`[&_a]:hover:text-white` in the dark
 * services accordion, `[&_a]:hover:text-foreground` in shadcn AccordionContent); those
 * selectors out-rank the pill's own classes, and inherited colour would follow them (white label
 * on the white hover pill). The span's own colour always wins over inheritance.
 */
export function ctaLabelTone({
  variant = "solid",
  mobileSolid = false,
  swap = false,
}: {
  variant?: CtaVariant;
  mobileSolid?: boolean;
  swap?: boolean;
}) {
  if (mobileSolid) return "text-white lg:text-brand";
  if (variant !== "solid") return "text-brand";
  return swap
    ? cn("text-white group-hover/button:text-brand group-focus-visible/button:text-brand", swapEase)
    : "text-white";
}

const swapCircle = cn(
  "absolute top-1/2 right-2 -translate-y-1/2 text-ink transition-[right,background-color,color]",
  "group-hover/button:right-[calc(100%-2.5rem)] group-hover/button:bg-brand group-hover/button:text-white",
  "group-focus-visible/button:right-[calc(100%-2.5rem)] group-focus-visible/button:bg-brand group-focus-visible/button:text-white",
  swapEase,
);

export function CtaArrow({ className, swap = false }: { className?: string; swap?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full bg-white",
        swap && swapCircle,
        className,
      )}
    >
      <ArrowOutwardIcon
        className={cn(
          "size-4",
          !swap &&
            "text-ink transition-transform duration-300 group-hover/button:translate-x-px group-hover/button:-translate-y-px",
        )}
      />
    </span>
  );
}

/**
 * Label + arrow circle for a pill CTA. `swap` must match `ctaClassName({ swap })`.
 * Prefer `<CtaPill>` (components/shared/cta-pill.tsx), which wires all of this up.
 */
export function CtaContent({
  children,
  arrow = true,
  swap = false,
  arrowClassName,
  labelClassName,
}: {
  children: React.ReactNode;
  arrow?: boolean;
  swap?: boolean;
  arrowClassName?: string;
  /** usually `ctaLabelTone(...)` */
  labelClassName?: string;
}) {
  return (
    <>
      <span className={cn(swap && swapLabel, labelClassName)}>{children}</span>
      {arrow ? <CtaArrow swap={swap} className={arrowClassName} /> : null}
    </>
  );
}
