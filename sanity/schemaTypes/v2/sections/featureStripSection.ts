import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, hiddenField, sectionPreview } from "../fields";

/**
 * Hire/Industry "Feature strip": four icon cards directly under the hero, with no visible
 * heading (mirrors `FeatureStripContent`, components/sections/feature-strip.tsx).
 */
export default defineType({
  name: "featureStripSection",
  title: "Feature Strip",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    hiddenField(),
    anchorIdField("featureStrip"),
    defineField({
      name: "label",
      title: "Accessible name",
      type: "string",
      description: "Not shown on the page: read out by screen readers for this strip, e.g. “Why work with Xconcile”.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [defineArrayMember({ type: "iconCard" })],
      validation: (Rule) => Rule.required().min(1).max(4),
    }),
  ],
  preview: sectionPreview("Feature Strip", { title: "label" }),
});
