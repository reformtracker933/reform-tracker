/**
 * Maps color names from Sanity CMS to CSS color variables
 */
const colorMap: Record<string, string> = {
  primary: "var(--color-primary-400)",
  purple: "var(--color-purple)",
  success: "var(--color-success)",
  danger: "var(--color-danger)",
  warning: "var(--color-warning)",
  info: "var(--color-info)",
};

const defaultColors = [
  "var(--color-primary-400)",
  "var(--color-purple)",
  "var(--color-success)",
  "#FF6B6B",
];

/**
 * Converts a color name from Sanity to a CSS color value
 * @param color - Color name from Sanity (e.g., "primary", "purple")
 * @returns CSS color value (e.g., "var(--color-primary-400)")
 */
export function getColorValue(color: string | undefined): string {
  if (!color) return "";

  if (color.startsWith("var(") || color.startsWith("rgb")) {
    return color;
  }

  return colorMap[color.toLowerCase()] || "";
}

/**
 * Gets a color value with fallback support
 * @param primaryColor - Primary color to use
 * @param fallbackColor - Fallback color if primary is not available
 * @param index - Index for cycling through default colors
 * @returns CSS color value
 */
export function getColorWithFallback(
  primaryColor: string | undefined,
  fallbackColor: string | undefined,
  index: number = 0,
): string {
  const primary = getColorValue(primaryColor);
  if (primary) return primary;

  const fallback = getColorValue(fallbackColor);
  if (fallback) return fallback;

  return defaultColors[index % defaultColors.length];
}
