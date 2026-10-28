import { LockIcon } from "@sanity/icons/Lock";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, hiddenField, iconField, sectionPreview, subtitleField, titleField } from "../fields";

/**
 * Hire "Security & Data Protection" (2026-10-17 design): badge + subtitle, a rose banner with
 * the shield illustration and the H2, then control groups with icon rows (mirrors
 * `SecurityControlsContent`, components/sections/security-controls.tsx).
 */
export default defineType({
  name: "securityControlsSection",
  title: "Security Controls",
  type: "object",
  icon: LockIcon,
  fields: [
    hiddenField(),
    anchorIdField("security"),
    badgeField(),
    titleField("Heading (H2, in the banner)"),
    subtitleField(),
    defineField({
      name: "shield",
      title: "Banner illustration",
      type: "image",
      description: "Decorative shield beside the heading (SVG or PNG), shown 112px wide on desktop.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "groups",
      title: "Control groups",
      type: "array",
      of: [
        defineArrayMember({
          name: "securityGroup",
          title: "Group",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "e.g. Information Security",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "items",
              title: "Rows",
              type: "array",
              of: [
                defineArrayMember({
                  name: "securityControl",
                  title: "Row",
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
                      title: "Sub-line",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: iconPreview({ title: "title", subtitle: "body" }),
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare: ({ title, items }) => ({ title, subtitle: `${items?.length ?? 0} rows` }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
  preview: sectionPreview("Security Controls"),
});
