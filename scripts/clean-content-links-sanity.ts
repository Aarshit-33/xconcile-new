/**
 * Cleans links in Sanity content (audit 2026-10-27, SEO5 + SEO9). Dataset: v2_xconcile only.
 *  - SEO5: strips `utm_source=chatgpt.com` (copy-paste residue from ChatGPT answers) from every
 *    link. On internal links it created duplicate URLs and credited visits to chatgpt.com.
 *  - SEO9: `http://irs.gov/...` and `http://www.irs.gov/...` → `https://www.irs.gov/...`.
 * Walks every string field named `href` (Portable Text link annotations, CTA links) in published
 * docs and drafts. Prints every change; `--dry-run` writes nothing.
 *
 *   SANITY_AUTH_TOKEN=... npx tsx --env-file=.env.local scripts/clean-content-links-sanity.ts [--dry-run]
 */
import { createClient } from "@sanity/client";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
if (dataset !== "v2_xconcile") throw new Error(`Refusing to run on dataset "${dataset}".`);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset,
  apiVersion: "2025-01-01",
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
  perspective: "raw",
});
const dryRun = process.argv.includes("--dry-run");

export function cleanHref(href: string): string {
  let out = href.trim();
  // SEO9: insecure IRS links (irs.gov serves https only on www).
  out = out.replace(/^http:\/\/(?:www\.)?irs\.gov(?=\/|$)/i, "https://www.irs.gov");
  // SEO5: drop utm_source=chatgpt.com, keep any other query params and the #hash.
  const m = out.match(/^([^?#]*)(\?[^#]*)?(#.*)?$/);
  if (m && m[2]) {
    const params = m[2]
      .slice(1)
      .split("&")
      .filter((p) => p && !/^utm_source=chatgpt\.com$/i.test(p));
    out = `${m[1] || (out.startsWith("?") ? "/" : "")}${params.length ? `?${params.join("&")}` : ""}${m[3] ?? ""}`;
  }
  return out;
}

type Change = { path: string; from: string; to: string };

function walk(node: unknown, path: string, changes: Change[]): void {
  if (Array.isArray(node)) {
    node.forEach((v, i) => {
      const key =
        v && typeof v === "object" && "_key" in v
          ? `[_key=="${(v as { _key: string })._key}"]`
          : `[${i}]`;
      walk(v, `${path}${key}`, changes);
    });
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "href" && typeof v === "string") {
        const to = cleanHref(v);
        if (to !== v) changes.push({ path: `${path}.${k}`.replace(/^\./, ""), from: v, to });
      } else if (!k.startsWith("_")) {
        walk(v, `${path}.${k}`, changes);
      }
    }
  }
}

async function main() {
  const docs: Record<string, unknown>[] = await client.fetch(
    `*[!(_type match "sanity.*") && !(_type match "system.*")]`,
  );

  let total = 0;
  for (const doc of docs) {
    const changes: Change[] = [];
    walk(doc, "", changes);
    if (!changes.length) continue;
    total += changes.length;
    console.log(`\n${doc._type} ${doc._id} (${changes.length})`);
    for (const c of changes) console.log(`  ${c.from}\n    → ${c.to}`);
    if (!dryRun) {
      const set = Object.fromEntries(changes.map((c) => [c.path, c.to]));
      await client
        .patch(doc._id as string)
        .set(set)
        .commit({ autoGenerateArrayKeys: false });
    }
  }
  console.log(`\n${dryRun ? "Would change" : "Changed"} ${total} link(s) in dataset ${dataset}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
