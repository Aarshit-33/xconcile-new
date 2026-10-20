import type { Metadata } from "next";
import { connection } from "next/server";
import { metadata as studioMetadata } from "next-sanity/studio";
import { Suspense } from "react";

import { Studio } from "./Studio";

// Note: `export const dynamic = 'force-static'` from the Sanity docs is omitted on purpose;
// route segment configs are not allowed when `cacheComponents` is enabled.
export { viewport } from "next-sanity/studio";

// next-sanity defaults (noindex, same-origin referrer) + the old site's Studio title/description.
// `absolute` skips the site's "%s | Xconcile" title template.
export const metadata: Metadata = {
  ...studioMetadata,
  title: { absolute: "Sanity Studio" },
  description: "Content Management System",
};

export default function StudioPage() {
  // Dynamic marker so /studio can partially prerender under Cache Components. The root layout
  // used to get this from <SpeedInsights />, which now only renders on the public site.
  return (
    <Suspense>
      <DynamicStudio />
    </Suspense>
  );
}

async function DynamicStudio() {
  await connection();
  return <Studio />;
}
