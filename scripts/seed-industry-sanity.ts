/**
 * Seeds a new-site industry page document (`_type: "industryPage"`, `_id: "industryPage-<slug>"`)
 * in Sanity from its code content (content/industries/<slug>.ts), uploading every image from
 * public/. Same approach as scripts/seed-hire-sanity.ts. Re-runnable: it replaces the document
 * (and drops a stale draft so the Studio shows the seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-industry-sanity.ts [slug]
 *
 * `slug` defaults to real-estate-construction; it must be a key of content/industries/index.ts.
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { industryPages } from "@/content/industries";
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

const slug = process.argv[2] ?? "real-estate-construction";
const page = industryPages[slug];
if (!page) {
  throw new Error(`Unknown industry page "${slug}". Known: ${Object.keys(industryPages).join(", ")}`);
}
const docId = `industryPage-${slug}`;

/* ---------------------------------------------------------------- document */

async function buildIndustryPage() {
  const { hero, features, intro, challenges, services, subIndustries, whyChoose, faq, ctaBand, seo } = page;

  return {
    _id: docId,
    _type: "industryPage",
    name: page.name,
    slug: { _type: "slug", current: page.slug },

    hero: {
      _type: "heroSection",
      anchorId: sectionId(hero, "hero"),
      badge: hero.badge,
      title: hero.title,
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      ...(hero.secondaryCta ? { secondaryCta: link(hero.secondaryCta) } : {}),
      checks: keyed(
        hero.checks.map((c) => ({ label: c.label, desktopOnly: c.desktopOnly ?? false })),
        "heroCheck",
      ),
    },

    features: {
      _type: "featureStripSection",
      anchorId: sectionId(features, "featureStrip"),
      label: features.label,
      items: keyed(features.items, "iconCard"),
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
      ...(intro.cta ? { cta: link(intro.cta) } : {}),
    },

    challenges: {
      _type: "challengesSection",
      anchorId: sectionId(challenges, "challenges"),
      badge: challenges.badge,
      title: challenges.title,
      body: challenges.body,
      ...(challenges.cta ? { cta: link(challenges.cta) } : {}),
      items: keyed(
        challenges.items.map((c) => ({ tone: c.tone, icon: c.icon, title: c.title, body: richText(c.body) })),
        "challengeCard",
      ),
    },

    services: {
      _type: "cardGridSection",
      anchorId: sectionId(services, "cardGrid"),
      badge: services.badge,
      title: services.title,
      subtitle: services.subtitle,
      items: keyed(
        services.items.map((x) => ({ icon: x.icon, title: x.title, ...(x.body ? { body: x.body } : {}) })),
        "gridTile",
      ),
    },

    subIndustries: {
      _type: "subIndustriesSection",
      anchorId: sectionId(subIndustries, "subIndustries"),
      badge: subIndustries.badge,
      title: subIndustries.title,
      subtitle: subIndustries.subtitle,
      items: keyed(
        subIndustries.items.map((x) => ({
          icon: x.icon,
          title: x.title,
          body: x.body,
          ...(x.groups?.length ? { groups: keyed(x.groups, "detailGroup") } : {}),
        })),
        "subIndustry",
      ),
    },

    whyChoose: {
      _type: "whyChooseSection",
      anchorId: sectionId(whyChoose, "whyChoose"),
      badge: whyChoose.badge,
      title: whyChoose.title,
      subtitle: whyChoose.subtitle,
      features: keyed(whyChoose.features, "iconCard"),
      images: keyed(await Promise.all(whyChoose.images.map(altImage))),
      stats: keyed(whyChoose.stats, "statItem"),
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
  console.log(`Seeding industry page "${slug}" → ${projectId}/${dataset}`);
  const doc = await buildIndustryPage();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Industry Pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
