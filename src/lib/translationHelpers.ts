import { translations } from "@/lib/translations";
import type {
  Locale,
  PageKey,
  GetPageTranslation,
  RTLTranslations,
} from "@/types/locale";

import RTL_En from "@/data/languages/en/RTL.json";
import RTL_Bn from "@/data/languages/bn/RTL.json";
import demoEn from "@/data/languages/en/demo.json";
import demoBn from "@/data/languages/bn/demo.json";

const RTL_TRANSLATIONS: Record<Locale, RTLTranslations> = {
  en: RTL_En,
  bn: RTL_Bn,
} as const;

const PAGE_SPECIFIC_TRANSLATIONS = {
  en: {
    demo: demoEn,
  },
  bn: {
    demo: demoBn,
  },
} as const;

export type TranslationKey = keyof typeof translations;

export const translationKeys = Object.keys(translations);

export function isValidTranslationKey(key: string): boolean {
  return key in translations;
}

export function getTranslation(
  key: string,
  locale: "en" | "bn",
  fallback?: string,
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

export function getPageTranslations<T extends PageKey>(
  page: T,
  locale: Locale,
): GetPageTranslation<T> {
  if (page === "demo") {
    return PAGE_SPECIFIC_TRANSLATIONS[locale]["demo"] as GetPageTranslation<T>;
  }

  const rtlData = RTL_TRANSLATIONS[locale];

  if (page in rtlData) {
    return rtlData[page as keyof RTLTranslations] as GetPageTranslation<T>;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(
      `Translation not found for page: ${page} in locale: ${locale}`,
    );
  }

  return {} as GetPageTranslation<T>;
}
