'use client';

import { useLocale } from '@/context/LocaleContext';
import { ReactNode } from 'react';

export function LocaleWrapper({ children }: { children: ReactNode }) {
  const { locale } = useLocale();

  return (
    <div className={locale === 'bn' ? 'font-noto-bangla' : 'font-sans'}>
      {children}
    </div>
  );
}
