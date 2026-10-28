import { ThListIcon } from "@sanity/icons/ThList";
import { defineArrayMember, defineField, defineType } from "sanity";

import { iconPreview } from "../../../components/icon-picker-input";
import { anchorIdField, badgeField, iconField, subtitleField, titleField } from "../fields";

/**
 * Industry "Sub-Industries": numbered full-width rows; rows with detail groups open like an
 * accordion (mirrors `SubIndustriesContent`, components/sections/sub-industries.tsx).
 */
export default defineType({
  name: "subIndustriesSection",
  title: "Sub-Industries",
  type: "object",
  icon: ThListIcon,
  fields: [
    anchorIdField("subIndustries"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "items",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "subIndustry",
          title: "Sub-industry",
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
              title: "Focus line",
              type: "string",
              description: "Short line under the title, e.g. “Job Costing and Progress Billing”.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "groups",
              title: "Details (accordion panel)",
              type: "array",
              description: "Shown when the row's “+” is opened. Leave empty for a static row without “+”.",
              of: [
                defineArrayMember({
                  name: "detailGroup",
                  title: "Group",
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Group title",
                      type: "string",
                      description: "e.g. Bookkeeping, Accounting, Payroll, Tax Preparation, Software Stack",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "items",
                      title: "Points",
                      type: "array",
                      of: [defineArrayMember({ type: "string" })],
                      validation: (Rule) => Rule.required().min(1),
                    }),
                  ],
                  preview: {
                    select: { title: "title", items: "items" },
                    prepare: ({ title, items }) => ({ title, subtitle: `${items?.length ?? 0} points` }),
                  },
                }),
              ],
            }),
          ],
          preview: iconPreview({ title: "title", subtitle: "body" }),
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
