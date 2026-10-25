import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

import { anchorIdField, hiddenField } from "../fields";

/** About "Founder & CEO" block (mirrors `FounderContent`, components/sections/founder-profile.tsx). */
export default defineType({
  name: "founderSection",
  title: "Founder",
  type: "object",
  icon: UserIcon,
  fields: [
    hiddenField(),
    anchorIdField("founder"),
    defineField({ name: "person", title: "Founder", type: "personProfile", validation: (Rule) => Rule.required() }),
    defineField({
      name: "certificationsLabel",
      title: "Certifications label",
      type: "string",
      description: 'Grey label at the start of the certifications pill, e.g. "Certifications".',
    }),
  ],
  preview: {
    select: { title: "person.name", subtitle: "person.role", media: "person.image" },
    prepare: ({ title, subtitle, media }) => ({ title: title || "Founder", subtitle, media }),
  },
});
