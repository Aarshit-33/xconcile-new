import { WarningOutlineIcon } from "@sanity/icons/WarningOutline";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, hiddenField, iconField, sectionPreview } from "../fields";

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
    hiddenField(),
    anchorIdField("challenges"),
    badgeField(),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
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
      description: "Optional: leave empty for no button (e.g. the virtual CFO page).",
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
          preview: iconPreview({ title: "title", subtitle: "tone" }),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("Challenges"),
});
