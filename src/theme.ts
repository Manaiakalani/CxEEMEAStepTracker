/**
 * Theme tokens are CSS custom properties so light/dark mode can be swapped
 * by toggling `data-theme` on the root element. The named exports below
 * keep their original API — they just resolve to `var(--...)` strings —
 * which means every existing consumer (inline `style={{ color: INK }}`,
 * SVG `fill={BAYERN}`, etc.) automatically picks up the active theme.
 */
export const BAYERN = "var(--color-bayern)";
export const BAYERN_DEEP = "var(--color-bayern-deep)";
export const BAYERN_SOFT = "var(--color-bayern-soft)";
export const INK = "var(--color-ink)";
export const MUTED = "var(--color-muted)";
export const HAIRLINE = "var(--color-hairline)";
export const SUCCESS = "var(--color-success)";
export const WARN = "var(--color-warn)";

export const SURFACE = "var(--surface)";
export const SURFACE_RAISED = "var(--surface-raised)";
export const BAR_REST = "var(--color-bar-rest)";
