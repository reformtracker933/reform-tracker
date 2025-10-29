import { Locale } from '@/types/locale';

export function formatDate(date: Date, locale: Locale): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat(
    locale === 'bn' ? 'bn-BD' : 'en-US',
    options
  ).format(date);
}

export function formatNumber(num: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'bn' ? 'bn-BD' : 'en-US').format(num);
}

export function getLocaleDisplayName(locale: Locale): string {
  const names = {
    en: 'English',
    bn: 'বাংলা',
  };
  return names[locale];
}

export function getTextDirection(): 'ltr' | 'rtl' {
  return 'ltr';
}
