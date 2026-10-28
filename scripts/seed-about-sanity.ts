/**
 * Seeds the About page singleton (`_type`/`_id: "aboutPage"`) in Sanity from content/about.ts,
 * uploading every image from public/. Same approach as the other seed scripts. Re-runnable: it
 * replaces the document (and drops a stale draft so the Studio shows the seeded version), which
 * overwrites Studio edits.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-about-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { about } from "@/content/about";
import type { PersonProfile } from "@/content/types";
// Same resolver as the site, so Studio starts with the ids the page already renders.
import { sectionId } from "../lib/section-ids";
import { altImage, client, dataset, imageRef, keyed, link, projectId, richText, uploads } from "./lib/seed-helpers";

const DOC_ID = "aboutPage";
const image = async (src: string) => ({ _type: "image", ...(await imageRef(src)) });

const person = async (p: PersonProfile) => ({
  _type: "personProfile",
  name: p.name,
  role: p.role,
  image: await altImage(p.image),
  bio: p.bio,
  certifications: p.certifications,
  ...(p.linkedin ? { linkedin: p.linkedin } : {}),
});

async function buildAboutPage() {
  const { hero, stats, intro, audiences, founder, team, values, security, expertise, contact, seo } = about;

  return {
    _id: DOC_ID,
    _type: "aboutPage",

    hero: {
      _type: "heroSection",
      anchorId: sectionId(hero, "hero"),
      badge: hero.badge,
      title: hero.title,
      subtitle: hero.subtitle,
      primaryCta: link(hero.primaryCta),
      ...(hero.secondaryCta ? { secondaryCta: link(hero.secondaryCta) } : {}),
      checks: keyed(
        hero.checks.map((c) => ({ label: c.label, show: true })),
        "heroCheck",
      ),
    },

    stats: {
      _type: "statsSection",
      anchorId: sectionId(stats, "stats"),
      items: keyed(
        await Promise.all(
          stats.items.map(async (s) => ({
            value: s.value,
            label: s.label,
            ...(s.image ? { image: await image(s.image.src) } : {}),
          })),
        ),
        "statItem",
      ),
      rating: stats.rating,
    },

    intro: {
      _type: "introSection",
      anchorId: sectionId(intro, "intro"),
      title: intro.title,
      body: richText(intro.body),
      ...(intro.bodyMore ? { bodyMore: richText(intro.bodyMore) } : {}),
      bodyMoreLayout: intro.bodyMoreLayout ?? "inline-desktop",
      ...(intro.bodyExtra ? { bodyExtra: richText(intro.bodyExtra) } : {}),
      image: await altImage(intro.image),
      checks: intro.checks,
      checksStyle: intro.checksStyle ?? "pill",
      ...(intro.cta ? { cta: link(intro.cta) } : {}),
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

    founder: {
      _type: "founderSection",
      anchorId: sectionId(founder, "founder"),
      person: await person(founder.person),
      certificationsLabel: founder.certificationsLabel,
    },

    team: {
      _type: "teamSection",
      anchorId: sectionId(team, "team"),
      title: team.title,
      members: keyed(await Promise.all(team.members.map(person))),
      certificationsLabel: team.certificationsLabel,
    },

    values: {
      _type: "featureCardsSection",
      anchorId: sectionId(values, "featureCards"),
      ...(values.badge ? { badge: values.badge } : {}),
      title: values.title,
      ...(values.subtitle ? { subtitle: values.subtitle } : {}),
      items: keyed(values.items, "iconCard"),
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

    expertise: {
      _type: "cardGridSection",
      anchorId: sectionId(expertise, "cardGrid"),
      badge: expertise.badge,
      title: expertise.title,
      subtitle: expertise.subtitle,
      items: keyed(
        expertise.items.map((x) => ({ icon: x.icon, title: x.title, ...(x.body ? { body: x.body } : {}) })),
        "gridTile",
      ),
    },

    contact: {
      _type: "leadContactSection",
      anchorId: sectionId(contact, "contact"),
      title: contact.title,
      body: contact.body,
      checks: contact.checks,
      form: {
        fields: Object.fromEntries(
          (["name", "email", "company", "service", "message"] as const).map((k) => [
            k,
            { label: contact.form.fields[k].label, placeholder: contact.form.fields[k].placeholder },
          ]),
        ),
        submit: contact.form.submit,
        submitting: contact.form.submitting,
        success: contact.form.success,
        error: contact.form.error,
      },
    },

    seo: { _type: "seoMeta", title: seo.title, description: seo.description, keywords: seo.keywords ?? [] },
  };
}

async function main() {
  console.log(`Seeding About page → ${projectId}/${dataset}`);
  const doc = await buildAboutPage();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${DOC_ID}`).commit();
  console.log(`✔ ${DOC_ID} replaced (published). Refresh /studio → About Page.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
