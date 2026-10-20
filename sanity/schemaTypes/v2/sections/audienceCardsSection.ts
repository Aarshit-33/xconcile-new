import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

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
});
