/**
 * Seeds the Industries gallery singleton (`_type` and `_id`: "industriesPage", `/industries`) in
 * Sanity from its code content (content/industries/gallery.ts), uploading every image from
 * public/. Same approach as scripts/seed-industry-sanity.ts. Re-runnable: it replaces the document
 * (and drops a stale draft so the Studio shows the seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-industries-gallery-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { industriesGallery as page } from "@/content/industries/gallery";
// Same resolver as the site, so Studio starts with the ids the page already renders.
import { sectionId } from "../lib/section-ids";
import { altImage, client, dataset, imageRef, keyed, link, projectId, richText, uploads } from "./lib/seed-helpers";

const docId = "industriesPage";

async function buildIndustriesPage() {
  const { hero, features, industries, faq, ctaBand, seo } = page;

  return {
    _id: docId,
    _type: "industriesPage",

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
      _type: "featureCardsSection",
      anchorId: sectionId(features, "featureCards"),
      badge: features.badge,
      title: features.title,
      subtitle: features.subtitle,
      items: keyed(features.items, "iconCard"),
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
  console.log(`Seeding the Industries gallery → ${projectId}/${dataset}`);
  const doc = await buildIndustriesPage();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Industries Gallery.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
