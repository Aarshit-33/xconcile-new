import { cn } from "@/lib/utils";

import { Eyebrow, type EyebrowTone } from "./eyebrow";
import { HighlightText } from "./highlight-text";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";

/**
 * Eyebrow + H2 + subtitle. The title is one string; `*text*` is green, `\*` is a literal
 * asterisk (lib/highlight.ts). It flows as one line of text and wraps naturally.
 * align: "center" | "left" | "responsive" (centered on mobile, left from lg, as drawn for
 * Industries / Tools / Blog / FAQ).
 */
export function SectionHeading({
  eyebrow,
  eyebrowTone = "light",
  title,
  titleId,
  subtitle,
  align = "center",
  tone = "light",
  className,
  titleClassName,
  subtitleClassName,
}: {
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  titleId?: string;
  subtitle?: React.ReactNode;
  align?: "center" | "left" | "responsive";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}) {
  const alignCls = {
    center: "items-center text-center",
    left: "items-start text-left",
    responsive: "items-center text-center lg:items-start lg:text-left",
  }[align];

  return (
    <div className={cn("flex flex-col gap-4", alignCls, className)}>
      {/* Eyebrow + subtitle fade up with the H2 (user request 2026-10-18). `flex` keeps the
          wrapper exactly the pill's height (no inline line box). */}
      {eyebrow ? (
        <FadeUp className="flex">
          <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>
        </FadeUp>
      ) : null}
      <RevealText
        as="h2"
        id={titleId}
        className={cn(
          "text-h2-m lg:text-h2",
          tone === "dark" ? "text-white" : "text-heading",
          titleClassName,
        )}
      >
        <HighlightText text={title} />
      </RevealText>
      {subtitle ? (
        <FadeUp
          as="p"
          delay={0.12}
          className={cn(
            "max-w-[776px] text-b1 font-medium lg:text-b3",
            tone === "dark" ? "text-on-dark" : "text-body",
            subtitleClassName,
          )}
        >
          {subtitle}
        </FadeUp>
      ) : null}
    </div>
  );
}
