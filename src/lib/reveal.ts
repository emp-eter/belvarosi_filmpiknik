import type { CSSProperties } from "react";

/** Inline stílus a `.reveal` osztály késleltetéséhez, ms-ban. */
export function reveal(delayMs: number): CSSProperties {
  return { "--reveal-delay": `${delayMs}ms` } as CSSProperties;
}
