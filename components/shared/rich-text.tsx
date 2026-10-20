import Link from "next/link";

import type { RichText as RichTextValue } from "@/content/types";

/** Renders copy with inline links (content/home.ts `RichText`). */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, i) =>
        typeof part === "string" ? (
          <span key={i}>{part}</span>
        ) : (
          <Link key={i} href={part.href} className="link-inline">
            {part.text}
          </Link>
        ),
      )}
    </>
  );
}

/** Plain-text version (JSON-LD, meta). */
export function richTextToPlain(value: RichTextValue) {
  return value.map((p) => (typeof p === "string" ? p : p.text)).join("");
}
