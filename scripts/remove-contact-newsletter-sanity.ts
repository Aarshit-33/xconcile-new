/**
 * Removes the "Stay Updated" subscribe band from the Contact page in Sanity: unsets the obsolete
 * `showNewsletter` field on `contactPage` and its draft (the field was dropped from the schema and
 * the page no longer renders the band; user request 2026-10-27). Dataset: v2_xconcile only.
 *
 *   SANITY_AUTH_TOKEN=... npx tsx --env-file=.env.local scripts/remove-contact-newsletter-sanity.ts [--dry-run]
 */
import { createClient } from "@sanity/client";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (dataset === "production") throw new Error("Refusing to touch the production dataset.");

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes("--dry-run");

async function main() {
  const docs: { _id: string; showNewsletter?: boolean }[] = await client.fetch(
    `*[_id in ["contactPage", "drafts.contactPage"] && defined(showNewsletter)]{ _id, showNewsletter }`,
  );
  console.log(`Dataset ${dataset}: ${docs.length} document(s) with showNewsletter.`);
  for (const d of docs) {
    console.log(
      `  ${dryRun ? "Would unset" : "Unsetting"} showNewsletter (${d.showNewsletter}) on ${d._id}`,
    );
    if (!dryRun) await client.patch(d._id).unset(["showNewsletter"]).commit();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
