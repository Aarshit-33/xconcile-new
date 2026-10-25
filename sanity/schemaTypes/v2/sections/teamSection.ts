import { UsersIcon } from "@sanity/icons/Users";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, hiddenField, sectionPreview } from "../fields";

/** About "Meet Our Team" (mirrors `TeamContent`, components/sections/team-members.tsx). */
export default defineType({
  name: "teamSection",
  title: "Team",
  type: "object",
  icon: UsersIcon,
  fields: [
    hiddenField(),
    anchorIdField("team"),
    defineField({ name: "title", title: "Heading (H2)", type: "headingTitle", validation: (Rule) => Rule.required() }),
    defineField({
      name: "members",
      title: "Team members",
      type: "array",
      description: "Two cards per row on desktop.",
      of: [defineArrayMember({ type: "personProfile" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "certificationsLabel",
      title: "Certifications label",
      type: "string",
      description: 'Grey label at the start of each certifications pill, e.g. "Certifications".',
    }),
  ],
  preview: sectionPreview("Team"),
});
