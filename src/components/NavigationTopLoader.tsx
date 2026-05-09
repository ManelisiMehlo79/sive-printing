"use client";

import NextTopLoader from "nextjs-toploader";

/** Thin route transition bar (App Router). Hash-only jumps stay quiet via `showForHashAnchor`. */
export function NavigationTopLoader() {
  return (
    <NextTopLoader
      color="#826633"
      height={2}
      showSpinner={false}
      crawlSpeed={120}
      speed={180}
      easing="cubic-bezier(0.33, 1, 0.68, 1)"
      shadow="0 0 10px rgb(130 102 51 / 0.45)"
      zIndex={99999}
      showForHashAnchor={false}
    />
  );
}
