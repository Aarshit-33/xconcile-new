/**
 * Green-highlight markup for headings (client rule 2026-10-24).
 *
 * A heading is ONE string. Wrap the part that should be green in asterisks; write `\*` for a
 * literal asterisk:
 *
 *   "Why Businesses Choose Xconcile for *Outsourced Accounting*"
 *   "Rated 4.9\* by *CPA Firms*"            → "Rated 4.9* by CPA Firms" ("CPA Firms" green)
 *
 * The heading renders as one flowing line of text (no forced breaks), so it wraps naturally on
 * every screen. An unmatched `*` is shown as a literal asterisk.
 *
 * Pure functions, no React: used by components, the Sanity mappers, the Studio schema and the
 * migration script (scripts/migrate-heading-titles.ts, removed 2026-10-30, in git history).
 */

export type HighlightSegment = { text: string; highlight: boolean };

/** Splits a heading into plain / green segments. Empty segments are dropped. */
export function parseHighlight(input: string): HighlightSegment[] {
  const segments: HighlightSegment[] = [];
  let buffer = "";
  let green = false;
  /** Index in `segments` where the currently open green run starts. */
  let openAt = -1;

  const flush = () => {
    if (buffer) segments.push({ text: buffer, highlight: green });
    buffer = "";
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "\\" && input[i + 1] === "*") {
      buffer += "*";
      i++;
      continue;
    }
    if (ch === "*") {
      flush();
      green = !green;
      openAt = green ? segments.length : -1;
      continue;
    }
    buffer += ch;
  }
  flush();

  // Unmatched opening `*`: show it literally and keep the rest plain.
  if (green && openAt >= 0) {
    const tail = segments.splice(openAt).map((s) => s.text).join("");
    const prev = segments[segments.length - 1];
    const text = `*${tail}`;
    if (prev && !prev.highlight) prev.text += text;
    else segments.push({ text, highlight: false });
  }

  return segments;
}

/** The heading as plain text (markers removed, `\*` → `*`): aria-labels, previews, metadata. */
export function plainTitle(input: string): string {
  return parseHighlight(input)
    .map((s) => s.text)
    .join("");
}

/** Number of unescaped `*` in the string (odd = an unmatched marker). */
export function countMarkers(input: string): number {
  return (input.replace(/\\\*/g, "").match(/\*/g) ?? []).length;
}

/** Escapes literal asterisks so they are not read as highlight markers. */
export const escapeMarkers = (text: string) => text.replace(/\*/g, "\\*");

/**
 * Old Sanity shape `{ before, highlight, after }` (hero, contact and `headingTitle` before
 * 2026-10-24) → the single-string form. Returns the input unchanged when it is already a string.
 */
export function toHighlightString(value: unknown): string | undefined {
  if (typeof value === "string") return value.trim() ? value : undefined;
  if (!value || typeof value !== "object") return undefined;
  const { before, highlight, after } = value as { before?: string; highlight?: string; after?: string };
  // Old headings could carry a no-break space (line-break workaround); plain spaces now.
  const clean = (s: string) => escapeMarkers(s.replace(/\u00A0/g, " ").trim());
  const parts = [
    before ? clean(before) : "",
    highlight ? `*${clean(highlight)}*` : "",
    after ? clean(after) : "",
  ].filter(Boolean);
  return parts.length ? parts.join(" ") : undefined;
}
