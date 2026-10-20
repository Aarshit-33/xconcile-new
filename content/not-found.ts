/**
 * 404 copy. Source: `../pages svg, css & png/404/page.svg` (desktop design). There is no
 * mobile 404 design, so the mobile layout is adapted from the desktop design with the mobile
 * type tokens.
 */
export const notFound = {
  seo: {
    title: "Page Not Found",
    description: "The page you are looking for doesn't exist. Head back to the Xconcile home page.",
  },
  illustration: {
    src: "/images/404/illustration.svg",
    width: 563,
    height: 285,
  },
  title: "404 — Page Not Found",
  /** Two lines on desktop (break after the first sentence), natural wrap on mobile. */
  body: [
    "The page you are looking for doesn’t exist.",
    "It might have been moved, deleted, or you entered the wrong address. Let’s get you back on track.",
  ],
  cta: { label: "Back to Home", href: "/" },
} as const;
