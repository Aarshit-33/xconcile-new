import { NotFoundContent, generateNotFoundMetadata } from "@/components/sections/not-found-content";

export const generateMetadata = generateNotFoundMetadata;

/**
 * 404 for `notFound()` thrown by `app/(website)` pages (e.g. an unknown `/[slug]`). Next renders
 * it INSIDE `app/(website)/layout.tsx`, which already provides <SiteShell />, so it renders only
 * the page body. Unmatched URLs outside any route use `app/not-found.tsx` instead.
 */
export default function WebsiteNotFound() {
  return <NotFoundContent />;
}
