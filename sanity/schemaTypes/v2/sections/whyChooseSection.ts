import { StarIcon } from "@sanity/icons/Star";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField } from "../fields";

/** "Why Businesses Choose Xconcile" features + photo collage + stats (mirrors `WhyChooseContent`). */
export default defineType({
  name: "whyChooseSection",
  title: "Why Choose Us",
  type: "object",
  icon: StarIcon,
  fields: [
    anchorIdField("whyChoose"),
    badgeField(),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      validation: (Rule) => Rule.required(),
    }),
    subtitleField(),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [defineArrayMember({ type: "iconCard" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "images",
      title: "Photo collage",
      type: "array",
      description: "Exactly 4 photos, in collage order.",
      of: [defineArrayMember({ type: "altImage" })],
      options: { layout: "grid" },
      validation: (Rule) => Rule.required().length(4),
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "statItem" })],
      validation: (Rule) => Rule.max(4),
    }),
  ],
});
