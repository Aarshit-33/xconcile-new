import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundContent, generateNotFoundMetadata } from "@/components/sections/not-found-content";
import "./globals.css";

export const generateMetadata = generateNotFoundMetadata;

/**
 * 404 for URLs that match no route at all (e.g. `/a/b/c`). These render directly under the root
 * layout, outside `app/(website)/layout.tsx`, so this file adds <SiteShell /> and globals.css
 * itself. `notFound()` from website pages uses `app/(website)/not-found.tsx` (no extra shell).
 */
export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
