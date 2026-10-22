/**
 * Seeds a new-site service page document (`_type: "servicePage"`, `_id: "servicePage-<slug>"`) in
 * Sanity from its code content (content/services/<slug>.ts), uploading every image/logo/poster
 * from public/. Same approach as scripts/seed-home-sanity.ts. Re-runnable: it replaces the
 * document (and drops a stale draft so the Studio shows the seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-service-sanity.ts [slug]
 *
 * `slug` defaults to audit-outsourcing-services; it must be a key of content/services/index.ts.
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { servicePages } from "@/content/services";
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

const slug = process.argv[2] ?? "audit-outsourcing-services";
const page = servicePages[slug];
if (!page) {
  throw new Error(`Unknown service page "${slug}". Known: ${Object.keys(servicePages).join(", ")}`);
}
const docId = `servicePage-${slug}`;

/* ---------------------------------------------------------------- document */

async function buildServicePage() {
  const { hero, stats, intro, challenges, services, caseStudies, process: steps, industries } = page;
  const { whyChoose, tools, testimonials, blog, faq, ctaBand, seo } = page;

  return {
    _id: docId,
    _type: "servicePage",
    name: page.name,
    slug: { _type: "slug", current: page.slug },

    hero: {
      _type: "heroSection",
      anchorId: sectionId(hero, "hero"),
      badge: hero.badge,
      title: { inline: false, ...hero.title },
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      ...(hero.secondaryCta ? { secondaryCta: link(hero.secondaryCta) } : {}),
      checks: keyed(
        hero.checks.map((c) => ({ label: c.label, desktopOnly: c.desktopOnly ?? false })),
        "heroCheck",
      ),
    },

    stats: {
      _type: "statsSection",
      anchorId: sectionId(stats, "stats"),
      items: keyed(stats.items, "statItem"),
      rating: stats.rating,
    },

    intro: {
      _type: "introSection",
      anchorId: sectionId(intro, "intro"),
      title: intro.title,
      body: richText(intro.body),
      ...(intro.bodyMore ? { bodyMore: richText(intro.bodyMore) } : {}),
      bodyMoreLayout: intro.bodyMoreLayout ?? "inline-desktop",
      image: await altImage(intro.image),
      ...(intro.features?.length ? { features: keyed(intro.features, "introFeature") } : {}),
      checks: intro.checks,
      checksStyle: intro.checksStyle ?? "pill",
      cta: link(intro.cta),
    },

    challenges: {
      _type: "challengesSection",
      anchorId: sectionId(challenges, "challenges"),
      badge: challenges.badge,
      title: challenges.title,
      body: challenges.body,
      cta: link(challenges.cta),
      items: keyed(
        challenges.items.map((c) => ({ tone: c.tone, icon: c.icon, title: c.title, body: richText(c.body) })),
        "challengeCard",
      ),
    },

    services: {
      _type: "servicesSection",
      anchorId: sectionId(services, "services"),
      badge: services.badge,
      title: { _type: "headingTitle", ...services.title },
      subtitle: services.subtitle,
      initiallyVisible: services.initiallyVisible,
      items: keyed(
        services.items.map((s) => ({
          icon: s.icon,
          title: s.title,
          description: s.description,
          ...(s.keyLabel ? { keyLabel: s.keyLabel } : {}),
          ...(s.keyItems?.length ? { keyItems: s.keyItems } : {}),
          ...(s.groups?.length ? { groups: keyed(s.groups, "serviceGroup") } : {}),
          ...(s.cta ? { cta: link(s.cta) } : {}),
        })),
        "serviceCard",
      ),
    },

    caseStudies: {
      _type: "caseStudiesSection",
      anchorId: sectionId(caseStudies, "caseStudies"),
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
            ...(c.impact ? { impact: c.impact } : {}),
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
      anchorId: sectionId(steps, "process"),
      badge: steps.badge,
      title: steps.title,
      subtitle: steps.subtitle,
      steps: keyed(steps.steps, "iconCard"),
    },

    industries: {
      _type: "industriesSection",
      anchorId: sectionId(industries, "industries"),
      badge: industries.badge,
      title: industries.title,
      subtitle: industries.subtitle,
      cta: link(industries.cta, "optionalLink"),
      items: keyed(
        await Promise.all(
          industries.items.map(async (i) => ({
            title: i.title,
            body: i.body,
            ...(i.href ? { href: i.href } : {}),
            image: await altImage(i.image),
          })),
        ),
        "industryCard",
      ),
    },

    whyChoose: {
      _type: "whyChooseSection",
      anchorId: sectionId(whyChoose, "whyChoose"),
      badge: whyChoose.badge,
      // A plain heading is stored as "Before" only (the site renders it as plain text).
      title: {
        _type: "headingTitle",
        ...(typeof whyChoose.title === "string" ? { before: whyChoose.title } : whyChoose.title),
      },
      subtitle: whyChoose.subtitle,
      features: keyed(whyChoose.features, "iconCard"),
      images: keyed(await Promise.all(whyChoose.images.map(altImage))),
      stats: keyed(whyChoose.stats, "statItem"),
    },

    ...(tools
      ? {
          tools: {
            _type: "toolTabsSection",
            anchorId: sectionId(tools, "tools"),
            badge: tools.badge,
            title: tools.title,
            subtitle: tools.subtitle,
            categories: keyed(
              await Promise.all(
                tools.categories.map(async (c) => ({
                  label: c.label,
                  id: { _type: "slug", current: c.id },
                  icon: c.icon,
                  tools: keyed(
                    await Promise.all(
                      c.tools.map(async (t) => ({
                        name: t.name,
                        ...(t.logo ? { logo: { _type: "image", ...(await imageRef(t.logo)) } } : {}),
                      })),
                    ),
                    "toolChip",
                  ),
                })),
              ),
              "toolCategory",
            ),
          },
        }
      : {}),

    testimonials: {
      _type: "testimonialsSection",
      anchorId: sectionId(testimonials, "testimonials"),
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
      anchorId: sectionId(blog, "blog"),
      badge: blog.badge,
      title: blog.title,
      subtitle: blog.subtitle,
      cta: link(blog.cta),
    },

    faq: {
      _type: "faqSection",
      anchorId: sectionId(faq, "faq"),
      badge: faq.badge,
      title: faq.title,
      intro: typeof faq.intro === "string" ? [faq.intro] : faq.intro,
      items: keyed(
        faq.items.map((f) => ({ question: f.q, answer: richText(f.a) })),
        "faqEntry",
      ),
    },

    ctaBand: {
      _type: "ctaBandSection",
      anchorId: sectionId(ctaBand, "ctaBand"),
      title: ctaBand.title,
      body: ctaBand.body,
      cta: link(ctaBand.cta),
      image: { _type: "image", ...(await imageRef(ctaBand.image.src)) },
    },

    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords ?? [] },
  };
}

async function main() {
  console.log(`Seeding service page "${slug}" → ${projectId}/${dataset}`);
  const doc = await buildServicePage();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Service Pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
