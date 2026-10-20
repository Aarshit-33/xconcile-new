import { defineField, defineType } from "sanity";

import { iconField } from "../fields";

/** Icon + title + short text card (process steps, Why Choose features). */
export default defineType({
  name: "iconCard",
  title: "Icon Card",
  type: "object",
  fields: [
    iconField(),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: "title", subtitle: "body" } },
});
