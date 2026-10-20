import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, iconField } from "../fields";

const tones = [
  { title: "Rose", value: "rose" },
  { title: "Amber", value: "amber" },
  { title: "Blue", value: "blue" },
  { title: "Purple", value: "purple" },
  { title: "Green", value: "green" },
  { title: "White", value: "white" },
];

/** "Common Accounting Challenges Businesses Face" cards (mirrors `ChallengesContent`). */
export default defineType({
  name: "challengesSection",
  title: "Challenges",
  type: "object",
  icon: WarningOutlineIcon,
  fields: [
    anchorIdField("challenges"),
    badgeField(),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "ctaLink",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Challenge cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "challengeCard",
          title: "Challenge",
          type: "object",
          fields: [
            defineField({
              name: "tone",
              title: "Card colour",
              type: "string",
              options: { list: tones },
              validation: (Rule) => Rule.required(),
            }),
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
              type: "richText",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "tone" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
