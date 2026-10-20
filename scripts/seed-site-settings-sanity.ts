/**
 * Seeds the new-site Site Settings singleton (`_type: "siteSettings"`, `_id: "siteSettings"`)
 * from what the site shows today: header menus + promo card (content/navigation.ts), footer
 * columns, blurb, badges, contact details, offices, social profiles and the Calendly link
 * (lib/site-config.ts). Badge images are uploaded from public/. Same approach as
 * scripts/seed-home-sanity.ts. Re-runnable: it replaces the document (and drops a stale draft
 * so the Studio shows the seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-site-settings-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it). The legacy
 * `settings` document of the old site is NOT used: its blurb and social order differ from
 * what the new site shows.
 */
import { footerNav, headerMenuPromo, headerNav } from "@/content/navigation";
import { siteConfig } from "@/lib/site-config";

import { altImage, client, dataset, keyed, projectId, uploads } from "./lib/seed-helpers";

const docId = "siteSettings";

async function buildSiteSettings() {
  return {
    _id: docId,
    _type: "siteSettings",

    header: {
      ctaLabel: "Schedule a Meeting", // ScheduleMeetingButton's label
      menus: keyed(
        headerNav.map((m) => ({
          label: m.label,
          showPromo: m.promo,
          items: keyed(
            m.items.map((l) => ({ label: l.label, href: l.href, icon: l.icon, description: l.description })),
            "navMenuLink",
          ),
        })),
        "navMenu",
      ),
      promo: {
        badge: headerMenuPromo.badge,
        title: headerMenuPromo.title,
        body: headerMenuPromo.body,
        buttonLabel: headerMenuPromo.cta,
      },
    },

    footer: {
      description: siteConfig.footerBlurb,
      columns: keyed(
        footerNav.map((c) => ({
          title: c.title,
          links: keyed(
            c.links.map((l) => ({ label: l.label, href: l.href })),
            "footerLink",
          ),
        })),
        "footerColumn",
      ),
      badges: keyed(
        await Promise.all(
          siteConfig.footerBadges.map(async (b) => ({ image: await altImage(b), size: b.size })),
        ),
        "footerBadge",
      ),
      copyrightName: siteConfig.legalName,
    },

    contact: {
      email: siteConfig.contact.email,
      phones: keyed(
        siteConfig.contact.phones.map((p) => ({ ...p })),
        "contactPhone",
      ),
      offices: keyed(
        siteConfig.offices.map((o) => ({ ...o })),
        "officeAddress",
      ),
    },

    // Profiles without a URL (Pinterest) are left out: the footer hides them anyway.
    social: keyed(
      siteConfig.social.filter((s) => s.url).map((s) => ({ platform: s.platform, url: s.url })),
      "socialLink",
    ),

    booking: { calendlyUrl: siteConfig.calendlyUrl },
  };
}

async function main() {
  console.log(`Seeding Site Settings → ${projectId}/${dataset}`);
  const doc = await buildSiteSettings();
  console.log(`  ${uploads.size} images uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → Site Settings.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
