/**
 * Seeds the Privacy Policy and Terms of Use singletons (`_id`/`_type` "privacyPolicyPage" and
 * "termsOfUsePage") from the design copy in content/legal.ts, so Studio opens with the text the
 * site shows today. Same approach as scripts/seed-not-found-sanity.ts.
 * Re-runnable: it replaces both documents (and drops stale drafts so the Studio shows the seeded
 * version), so it overwrites edits made in Studio. Run it once, then edit in Studio.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/seed-legal-pages-sanity.ts
 *
 * Token: an Editor API token, or your CLI login token (`npx sanity login`).
 * Refuses to write to the `production` dataset (the live old site reads it).
 */
import { legalPages, type LegalPageKind } from "@/content/legal";

import { client, dataset, projectId, richText } from "./lib/seed-helpers";

const ids: Record<LegalPageKind, string> = {
  privacy: "privacyPolicyPage",
  terms: "termsOfUsePage",
};

async function main() {
  console.log(`Seeding legal pages → ${projectId}/${dataset}`);
  const tx = client.transaction();
  for (const kind of Object.keys(ids) as LegalPageKind[]) {
    const page = legalPages[kind];
    const id = ids[kind];
    tx.createOrReplace({
      _id: id,
      _type: id,
      title: page.title,
      lastUpdated: page.lastUpdated,
      intro: richText(page.intro),
      body: page.body,
      seo: { title: page.seo.title, description: page.seo.description },
    }).delete(`drafts.${id}`);
  }
  await tx.commit();
  console.log("✔ privacyPolicyPage + termsOfUsePage replaced (published). Refresh /studio.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
