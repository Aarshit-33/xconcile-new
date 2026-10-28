import { BookIcon } from "@sanity/icons/Book";
import { defineField, defineType } from "sanity";

import { anchorIdField, badgeField, sectionPreview, subtitleField, titleField } from "../fields";

/**
 * Blog gallery post grid (`/blog`): centred heading over every blog post card, shown a page at a
 * time with "Load more" (mirrors `BlogPostsContent`, content/blog-gallery.ts). The cards
 * themselves come from the Blog Post documents, newest first.
 */
export default defineType({
  name: "blogPostsSection",
  title: "Blog Posts",
  type: "object",
  icon: BookIcon,
  fields: [
    anchorIdField("blog"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "perPage",
      title: "Cards shown at first",
      type: "number",
      description:
        "Cards shown before the button, and added by each click. 6 = two rows on desktop. Multiples of 3 fill whole desktop rows.",
      initialValue: 6,
      validation: (Rule) => Rule.integer().min(3).max(60),
    }),
    defineField({
      name: "loadMoreLabel",
      title: "Button label",
      type: "string",
      initialValue: "Show more articles",
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: "emptyText",
      title: "Text when there are no posts",
      type: "string",
    }),
  ],
  preview: sectionPreview("Blog Posts"),
});
