import { cn } from "@/lib/utils";

import { Eyebrow, type EyebrowTone } from "./eyebrow";
import { FadeUp } from "@/components/motion/fade-up";
import { RevealText } from "@/components/motion/reveal-text";

type Title = string | { before?: string; highlight: string; after?: string };

/**
 * Eyebrow + H2 (optional green highlight word) + subtitle.
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
  highlightOnNewLine = false,
  className,
  titleClassName,
  subtitleClassName,
}: {
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  title: Title;
  titleId?: string;
  subtitle?: React.ReactNode;
  align?: "center" | "left" | "responsive";
  tone?: "light" | "dark";
  /** Why-choose heading puts the highlight on its own line (desktop). */
  highlightOnNewLine?: boolean;
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
        className={cn("text-h2-m lg:text-h2", tone === "dark" ? "text-white" : "text-heading", titleClassName)}
      >
        {typeof title === "string" ? (
          title
        ) : (
          <>
            {title.before ? `${title.before} ` : null}
            {highlightOnNewLine ? <br className="hidden lg:block" /> : null}
            <span className="text-brand">{title.highlight}</span>
            {title.after ? ` ${title.after}` : null}
          </>
        )}
      </RevealText>
      {subtitle ? (
        <FadeUp
          as="p"
          delay={0.12}
          className={cn(
            "max-w-[776px] text-b1 font-normal lg:text-b3",
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
