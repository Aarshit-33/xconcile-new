import { UserIcon } from "@sanity/icons/User";
import { defineArrayMember, defineField, defineType } from "sanity";

import { contextualDescription } from "../../../components/contextual-description";

/**
 * One person on the About page (founder or team member): cut-out portrait, name, role, bio
 * paragraphs, certifications and an optional LinkedIn URL. Mirrors `PersonProfile`
 * (content/types.ts).
 */
export default defineType({
  name: "personProfile",
  title: "Person",
  type: "object",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Portrait",
      type: "altImage",
      description:
        "Cut-out photo on a transparent background (PNG); it is drawn on a green shape. Shown whole (not cropped), sitting at the bottom right.",
      // Founder and team members share this type: show only the size for where it's used.
      components: {
        field: contextualDescription(({ path }) =>
          path[0] === "founder"
            ? "Upload: transparent cut-out PNG ≈ 900×1036 px (≈7:8). Shown whole, 518px tall on desktop, at the bottom right of a green block."
            : path[0] === "team"
              ? "Upload: transparent cut-out PNG ≈ 560×750 px (≈3:4 portrait). Shown whole, about 375px tall on desktop, at the bottom right of the card."
              : undefined,
        ),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 3 })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn profile URL",
      type: "url",
      description: "Optional. The LinkedIn icon shows only when this is filled.",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});
