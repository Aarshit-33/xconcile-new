/**
 * Seeds the new-site Home singleton (`_id: "home"`) in Sanity from content/home.ts, uploading
 * every image/logo/poster from public/. Re-runnable: it replaces the Home document (and drops a
 * stale draft so the Studio shows the seeded version). Image uploads are de-duplicated by Sanity.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-home-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { home } from "@/content/home";
// Same resolver as the site, so Studio starts with the ids the page already renders.
import { sectionId } from "../lib/section-ids";
import {
  altImage,
  client,
  dataset,
  imageRef,
  keyed,
  link,
  projectId,
  richText,
  uploads,
} from "./lib/seed-helpers";

/* ---------------------------------------------------------------- document */

async function buildHome() {
  const {
    hero,
    stats,
    intro,
    challenges,
    services,
    caseStudies,
    process: steps,
    industries,
  } = home;
  const { whyChoose, tools, testimonials, blog, faq, inquiry, seo } = home;

  return {
    _id: "home",
    _type: "home",

    hero: {
      _type: "heroSection",
      anchorId: sectionId(home.hero, "hero"),
      badge: hero.badge,
      title: { inline: false, ...hero.title },
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      secondaryCta: link(hero.secondaryCta),
      checks: keyed(
        hero.checks.map((c) => ({
          label: c.label,
          desktopOnly: "desktopOnly" in c ? c.desktopOnly : false,
        })),
        "heroCheck",
      ),
    },

    stats: {
      _type: "statsSection",
      anchorId: sectionId(home.stats, "stats"),
      items: keyed(stats.items, "statItem"),
      rating: stats.rating,
    },

    intro: {
      _type: "introSection",
      anchorId: sectionId(home.intro, "intro"),
      title: intro.title,
      body: richText(intro.body),
      bodyMore: richText(intro.bodyMore),
      bodyMoreLayout: "inline-desktop",
      image: await altImage(intro.image),
      features: keyed(intro.features, "introFeature"),
      checks: intro.checks,
      checksStyle: "pill",
      cta: link(intro.cta),
    },

    challenges: {
      _type: "challengesSection",
      anchorId: sectionId(home.challenges, "challenges"),
      badge: challenges.badge,
      title: challenges.title,
      body: challenges.body,
      cta: link(challenges.cta),
      items: keyed(
        challenges.items.map((c) => ({
          tone: c.tone,
          icon: c.icon,
          title: c.title,
          body: richText(c.body),
        })),
        "challengeCard",
      ),
    },

    services: {
      _type: "servicesSection",
      anchorId: sectionId(home.services, "services"),
      badge: services.badge,
      title: { _type: "headingTitle", ...services.title },
      subtitle: services.subtitle,
      initiallyVisible: services.initiallyVisible,
      items: keyed(
        services.items.map((s) => ({
          icon: s.icon,
          title: s.title,
          description: s.description,
          keyLabel: s.keyLabel,
          keyItems: s.keyItems,
          cta: link(s.cta),
        })),
        "serviceCard",
      ),
    },

    caseStudies: {
      _type: "caseStudiesSection",
      anchorId: sectionId(home.caseStudies, "caseStudies"),
      badge: caseStudies.badge,
      title: caseStudies.title,
      subtitle: caseStudies.subtitle,
      items: keyed(
        await Promise.all(
          caseStudies.items.map(async (c) => ({
            label: c.label,
            id: { _type: "slug", current: c.id },
            title: c.title,
            challenge: c.challenge,
            solution: c.solution,
            result: c.result,
            impact: c.impact,
            image: await altImage(c.image),
            ...(c.image.mobile
              ? { mobileImage: { _type: "image", ...(await imageRef(c.image.mobile.src)) } }
              : {}),
            cta: link(c.cta, "optionalLink"),
          })),
        ),
        "caseStudy",
      ),
    },

    process: {
      _type: "processSection",
      anchorId: sectionId(home.process, "process"),
      badge: steps.badge,
      title: steps.title,
      subtitle: steps.subtitle,
      steps: keyed(steps.steps, "iconCard"),
    },

    industries: {
      _type: "industriesSection",
      anchorId: sectionId(home.industries, "industries"),
      badge: industries.badge,
      title: industries.title,
      subtitle: industries.subtitle,
      cta: link(industries.cta, "optionalLink"),
      items: keyed(
        await Promise.all(
          industries.items.map(async (i) => ({
            title: i.title,
            body: i.body,
            href: i.href,
            image: await altImage(i.image),
          })),
        ),
        "industryCard",
      ),
    },

    whyChoose: {
      _type: "whyChooseSection",
      anchorId: sectionId(home.whyChoose, "whyChoose"),
      badge: whyChoose.badge,
      title: { _type: "headingTitle", ...whyChoose.title },
      subtitle: whyChoose.subtitle,
      features: keyed(whyChoose.features, "iconCard"),
      images: keyed(await Promise.all(whyChoose.images.map(altImage))),
      stats: keyed(whyChoose.stats, "statItem"),
    },

    tools: {
      _type: "toolsSection",
      anchorId: sectionId(home.tools, "tools"),
      badge: tools.badge,
      title: tools.title,
      subtitle: tools.subtitle,
      items: keyed(
        await Promise.all(
          tools.items.map(async (t) => ({
            name: t.name,
            logo: { _type: "image", ...(await imageRef(t.logo)) },
          })),
        ),
        "toolLogo",
      ),
    },

    testimonials: {
      _type: "testimonialsSection",
      anchorId: sectionId(home.testimonials, "testimonials"),
      badge: testimonials.badge,
      title: testimonials.title,
      subtitle: testimonials.subtitle,
      videos: keyed(
        await Promise.all(
          testimonials.videos.map(async (v) => ({
            youtubeId: v.youtubeId,
            title: v.title,
            name: v.name,
            company: v.company,
            country: v.country,
            uploadDate: new Date(v.uploadDate).toISOString(),
            duration: v.duration,
            poster: { _type: "image", ...(await imageRef(v.poster.src)) },
          })),
        ),
        "testimonialVideo",
      ),
    },

    blog: {
      _type: "blogSection",
      anchorId: sectionId(home.blog, "blog"),
      badge: blog.badge,
      title: blog.title,
      subtitle: blog.subtitle,
      cta: link(blog.cta),
    },

    faq: {
      _type: "faqSection",
      anchorId: sectionId(home.faq, "faq"),
      badge: faq.badge,
      title: faq.title,
      intro: faq.intro,
      items: keyed(
        faq.items.map((f) => ({ question: f.q, answer: richText(f.a) })),
        "faqEntry",
      ),
    },

    contact: {
      _type: "contactSection",
      anchorId: sectionId(home.inquiry, "contact"),
      eyebrow: inquiry.eyebrow,
      title: inquiry.title,
      body: inquiry.body,
      trust: keyed(inquiry.trust, "trustSignal"),
      tagline: inquiry.tagline,
      form: {
        title: inquiry.form.title,
        note: inquiry.form.note,
        // Labels/placeholders only: `required` stays in code (lib/inquiry-schema.ts).
        fields: Object.fromEntries(
          Object.entries(inquiry.form.fields).map(([name, f]) => [
            name,
            { label: f.label, ...("placeholder" in f ? { placeholder: f.placeholder } : {}) },
          ]),
        ),
        submit: inquiry.form.submit,
        submitting: inquiry.form.submitting,
        success: inquiry.form.success,
        error: inquiry.form.error,
      },
    },

    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords ?? [] },
  };
}

async function main() {
  console.log(`Seeding Home → ${projectId}/${dataset}`);
  const doc = await buildHome();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete("drafts.home").commit();
  console.log("✔ Home document replaced (published). Refresh /studio.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
