import { defineField, defineType } from "sanity";

/** Number + label pair (stats bar, Why Choose stats). */
export default defineType({
  name: "statItem",
  title: "Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description: "e.g. 10+, 1K+, 98%",
      validation: (Rule) => Rule.required().max(10),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});
