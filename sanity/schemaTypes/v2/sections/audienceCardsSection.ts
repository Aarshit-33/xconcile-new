import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  anchorIdField,
  badgeField,
  hiddenField,
  sectionPreview,
  subtitleField,
  titleField,
} from "../fields";

/**
 * "Businesses We Work With": photo cards with a button (mirrors `AudienceCardsContent`,
 * components/sections/audience-cards.tsx).
 */
export default defineType({
  name: "audienceCardsSection",
  title: "Audience Cards",
  type: "object",
  icon: UserIcon,
  fields: [
    hiddenField(),
    anchorIdField("audienceCards"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "items",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          name: "audienceCard",
          title: "Card",
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
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "image",
              title: "Photo",
              type: "altImage",
              description: "Upload: 1200×800 px (3:2), JPG. Cropped from the centre.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "ctaLink",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "title", subtitle: "body", media: "image" } },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("Audience Cards"),
});
