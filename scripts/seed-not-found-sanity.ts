/**
 * Seeds the new-site 404 Page singleton (`_type: "notFoundPage"`, `_id: "notFoundPage"`) from
 * what the site shows today (content/notFound in content/not-found.ts), uploading the
 * illustration from public/. Same approach as scripts/seed-site-settings-sanity.ts.
 * Re-runnable: it replaces the document (and drops a stale draft so the Studio shows the
 * seeded version).
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-not-found-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { notFound } from "@/content/not-found";

import { client, dataset, imageRef, projectId, uploads } from "./lib/seed-helpers";

const docId = "notFoundPage";

async function main() {
  console.log(`Seeding 404 Page → ${projectId}/${dataset}`);
  const doc = {
    _id: docId,
    _type: "notFoundPage",
    illustration: { _type: "image", ...(await imageRef(notFound.illustration.src)) },
    title: notFound.title,
    intro: notFound.body[0],
    detail: notFound.body[1],
    cta: { _type: "ctaLink", label: notFound.cta.label, href: notFound.cta.href },
    seo: { title: notFound.seo.title, description: notFound.seo.description },
  };
  console.log(`  ${uploads.size} image uploaded/reused`);
  await client.transaction().createOrReplace(doc).delete(`drafts.${docId}`).commit();
  console.log(`✔ ${docId} replaced (published). Refresh /studio → 404 Page.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
