import { Locale } from '@/types/locale';

/**
 * Utility function to get Tailwind class for locale-specific font
 * Use this when you need to override the global font for specific elements
 *
 * @example
 * ```tsx
 * const { locale } = useLocale();
 * <p className={getLocaleFontClass(locale)}>Text</p>
 * ```
 */
export function getLocaleFontClass(locale: Locale): string {
  return locale === 'bn' ? 'font-noto-bangla' : 'font-sans';
}

/**
 * Custom CSS class that you can use on specific elements
 * that need to respect locale font switching
 *
 * Add this to your globals.css:
 * ```css
 * .locale-font {
 *   font-family: var(--font-noto-bangla, Arial, Helvetica, sans-serif);
 * }
 *
 * .locale-en .locale-font {
 *   font-family: var(--font-sans, Arial, Helvetica, sans-serif);
 * }
 * ```
 *
 * Then use it like:
 * ```tsx
 * <p className="locale-font">This text will change based on locale</p>
 * ```
 */
export const LOCALE_FONT_CLASS = 'locale-font';
