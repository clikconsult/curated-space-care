import type { CSSProperties } from "react";

/** Inline style that staggers a [data-reveal] element: item 0 shows first, later items follow by `step` ms. */
export function stagger(index: number, step = 90, base = 0, max = 5): CSSProperties {
  return { "--d": `${base + Math.min(index, max) * step}ms` } as CSSProperties;
}
