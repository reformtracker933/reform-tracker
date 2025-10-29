export type Locale = 'en' | 'bn';

import type RTL_En from '@/data/languages/en/RTL.json';
import type demoEn from '@/data/languages/en/demo.json';

type RTLTranslations = typeof RTL_En;
type DemoPageText = typeof demoEn;

type PageTextMap = {
  homePage: RTLTranslations['homePage'];
  aboutPage: RTLTranslations['aboutPage'];
  demo: DemoPageText;
};

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
  getTranslation: <T extends keyof PageTextMap>(page: T) => PageTextMap[T];
}

export interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}
