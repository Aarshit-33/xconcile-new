import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a Sanity CDN URL (respects hotspot/crop). Use with next/image. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
