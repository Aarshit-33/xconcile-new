import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, hiddenField, sectionPreview, subtitleField, titleField } from "../fields";

/**
 * "Choose the Right Accounting Professional for Your Needs": Junior / Mid / Senior role cards
 * (mirrors `ExperienceLevelsContent`, components/sections/experience-levels.tsx).
 */
export default defineType({
  name: "experienceLevelsSection",
  title: "Experience Levels",
  type: "object",
  icon: UsersIcon,
  fields: [
    hiddenField(),
    anchorIdField("experienceLevels"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "listLabel",
      title: "List heading",
      type: "string",
      description: "Small heading above each card's list, e.g. “Core Responsibilities”.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredLabel",
      title: "Featured pill label",
      type: "string",
      description: "e.g. Most Popular",
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: "items",
      title: "Levels",
      type: "array",
      of: [
        defineArrayMember({
          name: "experienceLevel",
          title: "Level",
          type: "object",
          fields: [
            defineField({
              name: "level",
              title: "Level pill",
              type: "string",
              description: "e.g. Junior Level",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Role",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "experience",
              title: "Experience",
              type: "string",
              description: "e.g. 2 – 5 years",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "responsibilities",
              title: "Responsibilities",
              type: "array",
              of: [
                defineArrayMember({
                  name: "responsibility",
                  title: "Responsibility",
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label (bold)",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "text",
                      title: "Text",
                      type: "text",
                      rows: 2,
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: { select: { title: "label", subtitle: "text" } },
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
            defineField({
              name: "cta",
              title: "Button",
              type: "ctaLink",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "featured",
              title: "Featured (dark card)",
              type: "boolean",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "title", level: "level", featured: "featured" },
            prepare: ({ title, level, featured }) => ({
              title,
              subtitle: [level, featured ? "Featured" : null].filter(Boolean).join(" · "),
            }),
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(3),
    }),
  ],
  preview: sectionPreview("Experience Levels"),
});
