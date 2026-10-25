import { defineType } from "sanity";

import { countMarkers, plainTitle } from "../../../../lib/highlight";

/**
 * Every section heading (H1/H2): ONE line of text. Mirrors `HeadingTitle` in content/types.ts and
 * lib/highlight.ts (client rule 2026-10-24, replaces the old Before / Highlight / After fields).
 * Relative import (not "@/") so the Sanity CLI resolves it too.
 */
export default defineType({
  name: "headingTitle",
  title: "Heading",
  type: "string",
  description:
    "Wrap the green part in asterisks: Why Businesses Choose Xconcile for *Outsourced Accounting*. " +
    "To show an asterisk, type \\* (backslash + asterisk). The heading wraps naturally on every screen.",
  validation: (Rule) =>
    Rule.required().custom((value) => {
      if (typeof value !== "string") return true;
      if (!plainTitle(value).trim()) return "Enter a heading";
      return countMarkers(value) % 2 === 0
        ? true
        : "Unmatched *: wrap the green part in a pair of asterisks, or type \\* for a literal asterisk.";
    }),
});
