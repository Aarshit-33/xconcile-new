/**
 * Shared helpers for the Sanity seed scripts (scripts/seed-*-sanity.ts): client, array keys,
 * image uploads from public/, rich text and links in the v2 schema shapes.
 */
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

import { createClient } from "@sanity/client";

import type { RichText } from "@/content/types";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_AUTH_TOKEN ?? process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  throw new Error(
    "Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_AUTH_TOKEN.",
  );
}
if (dataset === "production") {
  throw new Error("Refusing to seed the production dataset (the live old site reads it).");
}

export const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2025-02-19",
  useCdn: false,
});

let keyCounter = 0;
export const key = (hint = "k") =>
  `${hint.replace(/[^a-z0-9]/gi, "").slice(0, 12) || "k"}${(keyCounter++).toString(36)}`;

/** Adds `_key` (+ optional `_type`) to each object in an array. */
export const keyed = <T extends object>(items: readonly T[], type?: string) =>
  items.map((item) => ({ _key: key(type), ...(type ? { _type: type } : {}), ...item }));

export const uploads = new Map<string, Promise<string>>();
/** Uploads public/<src> once and returns the asset id (Sanity de-duplicates identical files). */
export function uploadImage(src: string): Promise<string> {
  if (!uploads.has(src)) {
    const file = path.join(process.cwd(), "public", src);
    if (!existsSync(file)) throw new Error(`Image not found: ${file}`);
    uploads.set(
      src,
      client.assets
        .upload("image", createReadStream(file), { filename: path.basename(file) })
        .then((a) => {
          console.log(`  ↑ ${src}`);
          return a._id;
        }),
    );
  }
  return uploads.get(src)!;
}

export const imageRef = async (src: string) => ({
  asset: { _type: "reference", _ref: await uploadImage(src) },
});
export const altImage = async (img: { src: string; alt: string }) => ({
  _type: "altImage",
  ...(await imageRef(img.src)),
  alt: img.alt,
});

/** `(string | { text, href })[]` → one Portable Text paragraph with link annotations. */
export function richText(parts: RichText) {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = parts.map((part) => {
    if (typeof part === "string") return { _type: "span", _key: key("s"), text: part, marks: [] };
    const markKey = key("l");
    markDefs.push({ _key: markKey, _type: "link", href: part.href });
    return { _type: "span", _key: key("s"), text: part.text, marks: [markKey] };
  });
  return [{ _type: "block", _key: key("b"), style: "normal", markDefs, children }];
}

export const link = (
  l: { label: string; href?: string },
  type: "ctaLink" | "optionalLink" = "ctaLink",
) => ({
  _type: type,
  label: l.label,
  ...(l.href ? { href: l.href } : {}),
});

/** Sanity `_id` of a service/hire/industry page: renamed pages keep their original ID. */
export const pageDocId = (type: string, page: { slug: string; sanityId?: string }) =>
  page.sanityId ?? `${type}-${page.slug}`;

/**
 * URL fields for a re-seeded page document: the existing document's slug and old URLs (a slug
 * changed in Studio survives a reseed), else the code default slug.
 */
export async function pageUrlFields(id: string, slug: string) {
  const d = await client.fetch<{ slug?: { current?: string }; oldSlugs?: string[] } | null>(
    `*[_id == $id][0]{ slug, oldSlugs }`,
    { id },
  );
  return {
    slug: { _type: "slug", current: d?.slug?.current || slug },
    ...(d?.oldSlugs?.length ? { oldSlugs: d.oldSlugs } : {}),
  };
}
