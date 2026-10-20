import { BookIcon } from "@sanity/icons/Book";
import { defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/** "Helpful Accounting Insights" header. The post cards come from Blog Post documents. */
export default defineType({
  name: "blogSection",
  title: "Blog Teaser",
  type: "object",
  icon: BookIcon,
  fields: [
    anchorIdField("blog"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
