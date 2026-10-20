import { OlistIcon } from "@sanity/icons/Olist";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/**
 * "Hire your Dedicated Accounting Team in 5 Steps": numbered timeline, two photos with a flag
 * chip, a proof card (avatars + “50+ Accounting Experts”) and trust checks (mirrors
 * `HiringStepsContent`, components/sections/hiring-steps.tsx).
 */
export default defineType({
  name: "hiringStepsSection",
  title: "Hiring Steps",
  type: "object",
  icon: OlistIcon,
  fields: [
    anchorIdField("hiringSteps"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        defineArrayMember({
          name: "hiringStep",
          title: "Step",
          type: "object",
          fields: [
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
          preview: { select: { title: "title", subtitle: "body" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      description: "Exactly two photos, shown side by side.",
      of: [defineArrayMember({ type: "altImage" })],
      validation: (Rule) => Rule.required().length(2),
    }),
    defineField({
      name: "photoBadge",
      title: "Chip on the first photo",
      type: "object",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "flag",
          title: "Flag",
          type: "image",
          description: "Decorative round flag before the label.",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "proof",
      title: "Proof card",
      type: "object",
      options: { collapsible: false },
      fields: [
        defineField({
          name: "value",
          title: "Number",
          type: "string",
          description: "e.g. 50+",
          validation: (Rule) => Rule.required().max(10),
        }),
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "avatars",
          title: "Avatars",
          type: "array",
          description: "Decorative faces before the number (the text carries the meaning).",
          of: [defineArrayMember({ type: "image" })],
          validation: (Rule) => Rule.max(5),
        }),
        defineField({
          name: "badge",
          title: "Badge",
          type: "string",
          description: "e.g. Avg match 48h",
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trust",
      title: "Trust checks",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.max(4),
    }),
  ],
});
