import { PlayIcon } from "@sanity/icons/Play";
import { defineArrayMember, defineField, defineType } from "sanity";

import { anchorIdField, badgeField, subtitleField, titleField } from "../fields";

/**
 * "What Our Clients Say" YouTube testimonials (mirrors `TestimonialsContent`). Videos load
 * behind a click-to-play poster; upload date and duration feed the VideoObject JSON-LD.
 */
export default defineType({
  name: "testimonialsSection",
  title: "Testimonials",
  type: "object",
  icon: PlayIcon,
  fields: [
    anchorIdField("testimonials"),
    badgeField(),
    titleField(),
    subtitleField(),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      description:
        "The first video is the large player; every video (incl. the first) appears as a thumbnail in the slider below it. Drag to reorder.",
      of: [
        defineArrayMember({
          name: "testimonialVideo",
          title: "Video",
          type: "object",
          fields: [
            defineField({
              name: "youtubeId",
              title: "YouTube video ID",
              type: "string",
              description: "The 11 characters after “watch?v=”, e.g. Mu0O-qTK1jo",
              validation: (Rule) =>
                Rule.required().regex(/^[\w-]{11}$/, { name: "YouTube ID", invert: false }),
            }),
            defineField({
              name: "title",
              title: "Video title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "name",
              title: "Client name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "company",
              title: "Company",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "country",
              title: "Country flag",
              type: "string",
              options: { list: [{ title: "United States", value: "us" }] },
              initialValue: "us",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "uploadDate",
              title: "YouTube upload date",
              type: "datetime",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: "ISO 8601, e.g. PT3M9S for 3 min 9 s.",
              validation: (Rule) =>
                Rule.required().regex(/^PT(\d+H)?(\d+M)?(\d+S)?$/, { name: "ISO 8601 duration" }),
            }),
            defineField({
              name: "poster",
              title: "Poster image",
              type: "image",
              description: "Shown before the video is played (16:9).",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "company", media: "poster" },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
});
