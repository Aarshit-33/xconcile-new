"use client";

import { useLayoutEffect } from "react";

/**
 * Scrolls the window to the top when it mounts. Used by the 404 body: Next's App Router keeps
 * the previous page's scroll position when a client navigation ends in a not-found boundary
 * (e.g. a menu link to a page that isn't built yet), which left the 404's top under the fixed
 * header or off-screen. Layout effect = before paint, so there is no visible jump; `instant`
 * bypasses the global `scroll-behavior: smooth`.
 */
export function ResetScroll() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}
