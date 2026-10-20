import { HomeIcon } from "@sanity/icons/Home";
import { defineField, defineType } from "sanity";

/**
 * Sections in the same order as app/(website)/page.tsx. Each one is a field (with its own
 * Studio tab) whose type lives in ../sections and mirrors the matching `home.*` block in
 * content/home.ts.
 */
const sections: { name: string; title: string; type: string; required?: boolean }[] = [
  { name: "hero", title: "Hero", type: "heroSection", required: true },
  { name: "stats", title: "Stats", type: "statsSection" },
  { name: "intro", title: "Intro", type: "introSection" },
  { name: "challenges", title: "Challenges", type: "challengesSection" },
  { name: "services", title: "Services", type: "servicesSection" },
  { name: "caseStudies", title: "Case Studies", type: "caseStudiesSection" },
  { name: "process", title: "Process", type: "processSection" },
  { name: "industries", title: "Industries", type: "industriesSection" },
  { name: "whyChoose", title: "Why Choose", type: "whyChooseSection" },
  { name: "tools", title: "Tools", type: "toolsSection" },
  { name: "testimonials", title: "Testimonials", type: "testimonialsSection" },
  { name: "blog", title: "Blog", type: "blogSection" },
  { name: "faq", title: "FAQ", type: "faqSection" },
  { name: "contact", title: "Contact Form", type: "contactSection" },
];

/**
 * New-site Home page (singleton, _id "home"). One field + one Studio tab per page section.
 * Named `home` (not `homePage`) so it never clashes with the legacy `homePage` type that is
 * still registered in this Studio.
 */
export default defineType({
  name: "home",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    ...sections.map((s, i) => ({ name: s.name, title: s.title, default: i === 0 })),
    { name: "seo", title: "SEO" },
  ],
  fields: [
    ...sections.map((s) =>
      defineField({
        name: s.name,
        title: s.title,
        type: s.type,
        group: s.name,
        validation: s.required ? (Rule) => Rule.required() : undefined,
      }),
    ),
    defineField({ name: "seo", title: "SEO", type: "seoMeta", group: "seo" }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
