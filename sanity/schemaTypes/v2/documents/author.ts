import { UserIcon } from "@sanity/icons/User";
import { defineField, defineType } from "sanity";

/**
 * Blog author (name, title, photo), created once and picked on each Blog Post. Shown in the
 * article hero ("Pranav Jani · Founder & CEO").
 */
export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Job title shown under the name, e.g. Founder & CEO.",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      description: "Square headshot, at least 200×200 px, face centred (shown as a 48px circle). Empty = the author's initials.",
      options: { hotspot: true },
    }),
  ],
  preview: { select: { title: "name", subtitle: "title", media: "photo" } },
});
