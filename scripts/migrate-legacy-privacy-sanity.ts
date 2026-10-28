/**
 * Copies the old site's Privacy Policy (`privacyPolicy` in the old `production` dataset) into
 * this dataset's `privacyPage` singleton (Studio → Privacy Policy), so the old dataset can be
 * deleted. Nothing in the old dataset is changed.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/migrate-legacy-privacy-sanity.ts [--dry-run]
 *
 * Re-running replaces the content with the old site's again (overwrites Studio edits), so run
 * it once. The body is plain Portable Text (paragraphs, H2–H4, bullet lists), which the
 * `articleBody` editor accepts as is; old H1s become H2s so the page keeps a single H1.
 */
import { createClient } from "@sanity/client";

import { client, dataset, projectId } from "./lib/seed-helpers";

const OLD_DATASET = "production";
const DOC_ID = "privacyPage";
const dryRun = process.argv.includes("--dry-run");
const token = process.env.SANITY_AUTH_TOKEN ?? process.env.SANITY_API_TOKEN;
const oldClient = createClient({ projectId, dataset: OLD_DATASET, token, apiVersion: "2025-02-19", useCdn: false });

type Block = { _type: string; _key: string; style?: string; [key: string]: unknown };

async function main() {
  if (dataset === OLD_DATASET) throw new Error("Target dataset is the old dataset; check NEXT_PUBLIC_SANITY_DATASET.");
  console.log(`${dryRun ? "[dry run] " : ""}Privacy Policy ${projectId}/${OLD_DATASET} → ${projectId}/${dataset}`);

  const old = await oldClient.fetch<{ title?: string; lastUpdated?: string; content?: Block[]; seo?: Record<string, unknown> } | null>(
    `*[_type == "privacyPolicy" && !(_id in path("drafts.**"))][0]{ title, lastUpdated, content, seo }`,
  );
  if (!old?.content?.length) throw new Error("No privacyPolicy document with content in the old dataset.");

  const body = old.content.map((b) => (b._type === "block" && b.style === "h1" ? { ...b, style: "h2" } : b));
  const seo = old.seo as { metaTitle?: string; metaDescription?: string; metaKeywords?: string[] } | undefined;
  const doc = {
    _id: DOC_ID,
    _type: "privacyPage",
    title: old.title || "Privacy Policy",
    ...(old.lastUpdated ? { lastUpdated: old.lastUpdated.slice(0, 10) } : {}),
    body,
    ...(seo?.metaTitle || seo?.metaDescription || seo?.metaKeywords?.length
      ? {
          seo: {
            _type: "seoMeta",
            ...(seo.metaTitle ? { title: seo.metaTitle } : {}),
            ...(seo.metaDescription ? { description: seo.metaDescription } : {}),
            ...(seo.metaKeywords?.length ? { keywords: seo.metaKeywords } : {}),
          },
        }
      : {}),
  };

  console.log(`  "${doc.title}", ${body.length} blocks, last updated ${old.lastUpdated ?? "—"}`);
  if (dryRun) return;
  await client.createOrReplace(doc);
  console.log("Done → Studio → Privacy Policy");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
