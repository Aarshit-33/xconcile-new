import { defineArrayMember, defineField, defineType } from "sanity";

import { hrefRule } from "../fields";

/**
 * Plain paragraphs with inline links only (mirrors `RichText` in content/types.ts:
 * `(string | { text, href })[]`). No headings, lists or bold, so the design stays intact.
 */
export default defineType({
  name: "richText",
  title: "Rich Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "Link",
                type: "string",
                description: "e.g. /services/tax-preparation, #contact or https://…",
                validation: (Rule) => Rule.required().custom(hrefRule),
              }),
            ],
          }),
        ],
      },
    }),
  ],
});
