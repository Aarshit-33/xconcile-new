/**
 * One-off migration (2026-10-29): Privacy Policy / Terms of Use moved from a "Sections" list
 * (heading + simple text per section) to one blog-style "Content" field (`body`, the blog
 * editor). For each document (published and draft) that still has `sections` and no `body`:
 *   body = for every section: an empty line (except before the first), a Heading 2
 *          "N. Heading", then the section's own text blocks as they are (links kept)
 * and `sections` is removed. Content edited in Studio is carried over, not replaced.
 * Re-runnable: documents that already have `body` are skipped.
 *
 *   SANITY_AUTH_TOKEN=<token> npx -y tsx --env-file=.env.local scripts/migrate-legal-sections-to-body-sanity.ts
 */
import { client, dataset, key, projectId } from "./lib/seed-helpers";

type Block = { _type: string; _key?: string; [k: string]: unknown };
type Section = { title?: string; body?: Block[] };
type Doc = { _id: string; sections?: Section[]; body?: unknown };

const IDS = ["privacyPolicyPage", "termsOfUsePage"];

const textBlock = (style: "normal" | "h2", text: string): Block => ({
  _type: "block",
  _key: key(style),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: key("s"), text, marks: [] }],
});

function toBody(sections: Section[]): Block[] {
  return sections.flatMap((s, i) => [
    ...(i > 0 ? [textBlock("normal", "")] : []),
    textBlock("h2", `${i + 1}. ${(s.title ?? "").trim()}`),
    // Fresh keys so blocks from different sections can never collide.
    ...(s.body ?? []).map((b) => ({ ...b, _key: key("b") })),
  ]);
}

async function main() {
  console.log(`Migrating legal pages → ${projectId}/${dataset}`);
  const ids = IDS.flatMap((id) => [id, `drafts.${id}`]);
  const docs = await client.fetch<Doc[]>(
    `*[_id in $ids]{ _id, sections, body }`,
    { ids },
    { perspective: "raw" },
  );
  const tx = client.transaction();
  let n = 0;
  for (const doc of docs) {
    if (doc.body || !doc.sections?.length) {
      console.log(`  – ${doc._id}: skipped (${doc.body ? "already has Content" : "no sections"})`);
      continue;
    }
    const body = toBody(doc.sections);
    tx.patch(doc._id, (p) => p.set({ body }).unset(["sections"]));
    console.log(`  ✓ ${doc._id}: ${doc.sections.length} sections → ${body.length} blocks`);
    n++;
  }
  if (n) await tx.commit();
  console.log(n ? `✔ ${n} document(s) migrated.` : "Nothing to migrate.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
