import { BookIcon } from "@sanity/icons/Book";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, hiddenField, iconField, sectionPreview, subtitleField } from "../fields";

/**
 * "Our Accounting Professionals Have Expertise In": dark grid of icon + title tiles (mirrors
 * `CardGridContent`, components/sections/card-grid.tsx).
 */
export default defineType({
  name: "cardGridSection",
  title: "Expertise Grid",
  type: "object",
  icon: BookIcon,
  fields: [
    hiddenField(),
    anchorIdField("cardGrid"),
    badgeField(),
    defineField({
      name: "title",
      title: "Heading (H2)",
      type: "headingTitle",
      validation: (Rule) => Rule.required(),
    }),
    subtitleField(),
    defineField({
      name: "items",
      title: "Tiles",
      type: "array",
      of: [
        defineArrayMember({
          name: "gridTile",
          title: "Tile",
          type: "object",
          fields: [
            iconField(),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Short line",
              type: "text",
              rows: 2,
              description: "Optional. Rises in under the title on scroll.",
            }),
          ],
          preview: iconPreview({ title: "title", subtitle: "body" }),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: sectionPreview("Expertise Grid"),
});
