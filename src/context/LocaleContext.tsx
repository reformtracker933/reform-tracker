'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { Locale, LocaleContextType } from '@/types/locale';
import { translations } from '@/lib/translations';
import { getPageTranslations } from '@/lib/translationHelpers';

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'reform-tracker-locale';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function getInitialLocale(): Locale {
  if (typeof window !== 'undefined') {
    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
    if (savedLocale && (savedLocale === 'en' || savedLocale === 'bn')) {
      return savedLocale;
    }
  }
  return 'bn';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const currentLocale = locale;
      document.documentElement.lang = currentLocale === 'bn' ? 'bn' : 'en';
      if (currentLocale === 'bn') {
        document.documentElement.classList.add('locale-bn');
        document.documentElement.classList.remove('locale-en');
      } else {
        document.documentElement.classList.add('locale-en');
        document.documentElement.classList.remove('locale-bn');
      }
    }
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale === 'bn' ? 'bn' : 'en';
    if (newLocale === 'bn') {
      document.documentElement.classList.remove('locale-en');
      document.documentElement.classList.add('locale-bn');
    } else {
      document.documentElement.classList.remove('locale-bn');
      document.documentElement.classList.add('locale-en');
    }
  };

  const toggleLocale = () => {
    const newLocale = locale === 'en' ? 'bn' : 'en';
    setLocale(newLocale);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      return key;
    }
    return translation[locale] || translation.en || key;
  };

  const getTranslation: LocaleContextType['getTranslation'] = (page) => {
    return getPageTranslations(page, locale);
  };

  if (!mounted) {
    return null;
  }

  const value: LocaleContextType = {
    locale,
    setLocale,
    toggleLocale,
    t,
    getTranslation,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
