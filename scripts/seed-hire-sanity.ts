/**
 * Seeds a new-site hire page document (`_type: "hirePage"`, `_id: "hirePage-<slug>"`) in Sanity
 * from its code content (content/hire/<slug>.ts), uploading every image/flag/avatar/logo from
 * public/. Same approach as scripts/seed-service-sanity.ts. Re-runnable: it replaces the
 * document (and drops a stale draft so the Studio shows the seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-hire-sanity.ts [slug]
 *
 * `slug` defaults to hire-bookkeeper-accountant; it must be a key of content/hire/index.ts.
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { hirePages } from "@/content/hire";
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

const slug = process.argv[2] ?? "hire-bookkeeper-accountant";
const page = hirePages[slug];
if (!page) {
  throw new Error(`Unknown hire page "${slug}". Known: ${Object.keys(hirePages).join(", ")}`);
}
const docId = `hirePage-${slug}`;

const image = async (src: string) => ({ _type: "image", ...(await imageRef(src)) });
/** A plain heading is stored as "Before" only (the site renders it as plain text). */
const headingTitle = (t: string | { before?: string; highlight: string; after?: string }) => ({
  _type: "headingTitle",
  ...(typeof t === "string" ? { before: t } : t),
});

/* ---------------------------------------------------------------- document */

async function buildHirePage() {
  const { hero, features, intro, benefits, expertise, models, steps, levels } = page;
  const { audiences, whyChoose, security, tools, faq, ctaBand, seo } = page;

  return {
    _id: docId,
    _type: "hirePage",
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
      cta: link(intro.cta),
    },

    benefits: {
      _type: "challengesSection",
      anchorId: sectionId(benefits, "challenges"),
      badge: benefits.badge,
      title: benefits.title,
      body: benefits.body,
      cta: link(benefits.cta),
      items: keyed(
        benefits.items.map((c) => ({ tone: c.tone, icon: c.icon, title: c.title, body: richText(c.body) })),
        "challengeCard",
      ),
    },

    expertise: {
      _type: "cardGridSection",
      anchorId: sectionId(expertise, "cardGrid"),
      badge: expertise.badge,
      title: headingTitle(expertise.title),
      subtitle: expertise.subtitle,
      items: keyed(
        expertise.items.map((x) => ({ icon: x.icon, title: x.title, ...(x.body ? { body: x.body } : {}) })),
        "gridTile",
      ),
    },

    models: {
      _type: "engagementModelsSection",
      anchorId: sectionId(models, "engagementModels"),
      badge: models.badge,
      title: models.title,
      subtitle: models.subtitle,
      featuredLabel: models.featuredLabel,
      items: keyed(
        models.items.map((m) => ({
          number: m.number,
          ...(m.icon ? { icon: m.icon } : {}),
          title: m.title,
          tagline: m.tagline,
          body: m.body,
          features: m.features,
          cta: link(m.cta),
          featured: m.featured ?? false,
        })),
        "engagementModel",
      ),
    },

    steps: {
      _type: "hiringStepsSection",
      anchorId: sectionId(steps, "hiringSteps"),
      badge: steps.badge,
      title: steps.title,
      subtitle: steps.subtitle,
      steps: keyed(steps.steps, "hiringStep"),
      photos: keyed(await Promise.all(steps.photos.map(altImage))),
      photoBadge: { label: steps.photoBadge.label, flag: await image(steps.photoBadge.flag.src) },
      proof: {
        value: steps.proof.value,
        label: steps.proof.label,
        avatars: keyed(await Promise.all(steps.proof.avatars.map((a) => image(a.src)))),
        badge: steps.proof.badge,
      },
      trust: steps.trust,
    },

    levels: {
      _type: "experienceLevelsSection",
      anchorId: sectionId(levels, "experienceLevels"),
      badge: levels.badge,
      title: levels.title,
      subtitle: levels.subtitle,
      listLabel: levels.listLabel,
      featuredLabel: levels.featuredLabel,
      items: keyed(
        levels.items.map((l) => ({
          level: l.level,
          title: l.title,
          experience: l.experience,
          responsibilities: keyed(l.responsibilities, "responsibility"),
          cta: link(l.cta),
          featured: l.featured ?? false,
        })),
        "experienceLevel",
      ),
    },

    audiences: {
      _type: "audienceCardsSection",
      anchorId: sectionId(audiences, "audienceCards"),
      badge: audiences.badge,
      title: audiences.title,
      subtitle: audiences.subtitle,
      items: keyed(
        await Promise.all(
          audiences.items.map(async (a) => ({
            title: a.title,
            body: a.body,
            image: await altImage(a.image),
            cta: link(a.cta),
          })),
        ),
        "audienceCard",
      ),
    },

    whyChoose: {
      _type: "whyChooseSection",
      anchorId: sectionId(whyChoose, "whyChoose"),
      badge: whyChoose.badge,
      title: headingTitle(whyChoose.title),
      subtitle: whyChoose.subtitle,
      features: keyed(whyChoose.features, "iconCard"),
      images: keyed(await Promise.all(whyChoose.images.map(altImage))),
      stats: keyed(whyChoose.stats, "statItem"),
    },

    security: {
      _type: "securityControlsSection",
      anchorId: sectionId(security, "security"),
      badge: security.badge,
      title: security.title,
      subtitle: security.subtitle,
      shield: await image(security.shield.src),
      groups: keyed(
        security.groups.map((g) => ({ title: g.title, items: keyed(g.items, "securityControl") })),
        "securityGroup",
      ),
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
                        ...(t.logo ? { logo: await image(t.logo) } : {}),
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
      image: await image(ctaBand.image.src),
    },

    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords ?? [] },
  };
}

async function main() {
  console.log(`Seeding hire page "${slug}" → ${projectId}/${dataset}`);
  const doc = await buildHirePage();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Hire Pages.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
