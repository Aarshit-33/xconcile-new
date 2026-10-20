import { defineField, defineType } from "sanity";

/** Section H2 with one optional green phrase (mirrors `HeadingTitle` in content/types.ts). */
export default defineType({
  name: "headingTitle",
  title: "Heading",
  type: "object",
  description:
    "Rendered as: Before + Highlight (green) + After. Leave Highlight empty for a plain heading.",
  options: { collapsible: false },
  fields: [
    defineField({ name: "before", title: "Before", type: "string" }),
    defineField({ name: "highlight", title: "Highlight (green)", type: "string" }),
    defineField({ name: "after", title: "After", type: "string" }),
  ],
  validation: (Rule) =>
    Rule.custom((value: { before?: string; highlight?: string; after?: string } | undefined) =>
      value?.before || value?.highlight || value?.after ? true : "Enter a heading",
    ),
});
