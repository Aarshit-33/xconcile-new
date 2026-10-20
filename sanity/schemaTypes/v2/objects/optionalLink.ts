import { defineField, defineType } from "sanity";

import { hrefRule } from "../fields";

/**
 * Button whose target page may not exist yet (mirrors `OptionalLink`): the site hides the
 * button while Link is empty (e.g. "View Case Study", industries "Explore More").
 */
export default defineType({
  name: "optionalLink",
  title: "Optional Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Leave empty to hide the button until the page exists.",
      validation: (Rule) => Rule.custom(hrefRule),
    }),
  ],
  preview: {
    select: { title: "label", href: "href" },
    prepare: ({ title, href }) => ({ title, subtitle: href || "Hidden (no link)" }),
  },
});
