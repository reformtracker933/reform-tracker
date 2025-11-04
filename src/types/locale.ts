export type Locale = "en" | "bn";

export type {
  RTLTranslations,
  TranslationPages,
  PageKey,
  GetPageTranslation,
} from "./translations.generated";

import type { PageKey, GetPageTranslation } from "./translations.generated";

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  getTranslation: <T extends PageKey>(page: T) => GetPageTranslation<T>;
}

export interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}
