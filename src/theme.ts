/**
 * ─────────────────────────────────────────────────────────
 *  GLOBAL THEME CONFIGURATION
 *  Change the values below to re-skin the entire app.
 *
 *  Primary color is expressed in HSL so it's easy to tweak:
 *    hue        0–360  (0 = red, 120 = green, 240 = blue)
 *    saturation 0–100%
 *    lightness  0–100%
 *
 *  Examples:
 *    Red    → hue: 0,   saturation: 80, lightness: 45
 *    Blue   → hue: 217, saturation: 91, lightness: 60
 *    Green  → hue: 142, saturation: 71, lightness: 45
 *    Orange → hue: 25,  saturation: 95, lightness: 50
 *    Purple → hue: 263, saturation: 70, lightness: 55
 * ─────────────────────────────────────────────────────────
 */

export const theme = {
  /** Primary brand color (HSL components) */
  primary: {
    hue: 0,          // ← change this to switch the app color
    saturation: 80,
    lightness: 45,
  },

  /** Border radius base (rem) */
  radius: 0.5,
} as const

// Derived helpers
export const primaryHsl = `${theme.primary.hue} ${theme.primary.saturation}% ${theme.primary.lightness}%`
export const primaryColor = `hsl(${primaryHsl})`

/** Darker shade for hover / active states */
export const primaryDark = `hsl(${theme.primary.hue} ${theme.primary.saturation}% ${theme.primary.lightness - 8}%)`

/**
 * Call this once at app startup (in main.tsx) to inject the theme
 * tokens into the document's CSS custom properties. This means
 * changing values in this file and reloading is all you ever need.
 */
export function applyTheme(): void {
  const root = document.documentElement
  const { hue: h, saturation: s, lightness: l } = theme.primary

  root.style.setProperty('--primary',            `${h} ${s}% ${l}%`)
  root.style.setProperty('--primary-foreground',  '0 0% 100%')
  root.style.setProperty('--ring',                `${h} ${s}% ${l}%`)
  root.style.setProperty('--radius',              `${theme.radius}rem`)

  // Accent mirrors primary at a lighter tint
  root.style.setProperty('--accent',              `${h} ${s}% ${Math.min(l + 40, 95)}%`)
  root.style.setProperty('--accent-foreground',   `${h} ${s}% ${l}%`)
}
