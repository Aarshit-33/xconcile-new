import Link from "next/link";
import { Fragment } from "react";

import type { RichText as RichTextValue } from "@/content/types";

/** Text with its line breaks: each "\n" (new paragraph / empty line in Studio) → `<br>`. */
function Lines({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Renders copy with inline links (content/home.ts `RichText`). Line breaks typed in Studio are
 * kept as `<br>`s, with no extra spacing (sanity/lib/sections.ts `richText`, user request
 * 2026-10-29).
 */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          // Plain text, no wrapper: the parent <p> holds it (was a <span> per text run).
          <Lines key={i} text={part} />
        ) : (
          <Link key={i} href={part.href} className="link-inline">
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}

/** Plain-text version (JSON-LD, meta): line breaks become spaces. */
export function richTextToPlain(value: RichTextValue) {
  return value
    .map((p) => (typeof p === "string" ? p : p.text))
    .join("")
    .replace(/\s*\n+\s*/g, " ");
}
