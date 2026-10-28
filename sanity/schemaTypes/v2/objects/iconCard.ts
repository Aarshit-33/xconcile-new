import { defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
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
  preview: iconPreview({ title: "title", subtitle: "body" }),
});
