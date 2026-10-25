import { parseHighlight } from "@/lib/highlight";

/**
 * Renders a heading string with `*green*` parts (see lib/highlight.ts). One flowing line of
 * text: no forced breaks, no nowrap, so it wraps naturally on every screen size.
 * Server-safe (no hooks); works inside RevealText (SplitText splits nested spans per line).
 */
export function HighlightText({
  text,
  highlightClassName = "text-brand",
}: {
  text: string;
  /** Classes for the green parts, e.g. `lg:text-brand` when the green is desktop-only. */
  highlightClassName?: string;
}) {
  return (
    <>
      {parseHighlight(text).map((s, i) =>
        s.highlight ? (
          <span key={i} className={highlightClassName}>
            {s.text}
          </span>
        ) : (
          s.text
        ),
      )}
    </>
  );
}
