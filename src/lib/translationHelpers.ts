import { translations } from '@/lib/translations';
import { Locale } from '@/types/locale';

import RTL_En from '@/data/languages/en/RTL.json';
import RTL_Bn from '@/data/languages/bn/RTL.json';
import demoEn from '@/data/languages/en/demo.json';
import demoBn from '@/data/languages/bn/demo.json';

type RTLTranslations = typeof RTL_En;
type DemoPageText = typeof demoEn;

type PageTextMap = RTLTranslations & {
  demo: DemoPageText;
};

type PageTranslations = {
  [key: string]: Record<string, unknown>;
};

const commonTranslations: Record<Locale, Record<string, unknown>> = {
  en: RTL_En as Record<string, unknown>,
  bn: RTL_Bn as Record<string, unknown>,
};

const pageSpecificTranslations: Record<Locale, PageTranslations> = {
  en: {
    demo: demoEn,
  },
  bn: {
    demo: demoBn,
  },
};

export type TranslationKey = keyof typeof translations;

export const translationKeys = Object.keys(translations);

export function isValidTranslationKey(key: string): boolean {
  return key in translations;
}

export function getTranslation(
  key: string,
  locale: 'en' | 'bn',
  fallback?: string
): string {
  if (isValidTranslationKey(key)) {
    const translationKey = key as TranslationKey;
    return (
      translations[translationKey][locale] ||
      translations[translationKey].en ||
      fallback ||
      key
    );
  }
  return fallback || key;
}

export function getPageTranslation(
  page: string,
  path: string,
  locale: Locale
): string {
  const pageData = pageSpecificTranslations[locale]?.[page];
  const dataSource = pageData || commonTranslations[locale];

  if (!dataSource) {
    return path;
  }

  const keys = path.split('.');
  let value: unknown = dataSource;

  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }

  return typeof value === 'string' ? value : path;
}

export function createPageTranslator(page: string, locale: Locale) {
  return (path: string): string => getPageTranslation(page, path, locale);
}

export function getPageTranslations<T extends keyof PageTextMap>(
  page: T,
  locale: Locale
): PageTextMap[T];
export function getPageTranslations(
  page: string,
  locale: Locale
): Record<string, unknown>;
export function getPageTranslations(
  page: string,
  locale: Locale
): Record<string, unknown> {
  let pageData = pageSpecificTranslations[locale]?.[page];

  if (!pageData) {
    const commonData = commonTranslations[locale];
    if (commonData && page in commonData) {
      pageData = commonData[page] as Record<string, unknown>;
    }
  }

  if (!pageData) {
    return {};
  }
  return pageData;
}
