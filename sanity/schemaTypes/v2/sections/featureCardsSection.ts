import { ThLargeIcon } from "@sanity/icons/ThLarge";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, hiddenField, sectionPreview, titleField } from "../fields";

/**
 * Industries gallery "Industries We Serve" feature cards: badge + heading + subtitle over a row of
 * white icon cards (mirrors `FeatureCardsContent`, components/sections/feature-cards.tsx).
 */
export default defineType({
  name: "featureCardsSection",
  title: "Feature Cards",
  type: "object",
  icon: ThLargeIcon,
  fields: [
    hiddenField(),
    anchorIdField("featureCards"),
    // Badge and subtitle are optional: About "Our Core Values" draws only the heading.
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Small pill above the heading. Optional.",
      validation: (Rule) => Rule.max(40),
    }),
    titleField(),
    defineField({ name: "subtitle", title: "Subtitle", type: "text", rows: 3, description: "Optional." }),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      description: "Four cards fill one row on desktop; three cards make a three-column row.",
      of: [defineArrayMember({ type: "iconCard" })],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("Feature Cards"),
});
