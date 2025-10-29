'use client';

import { ReactNode } from 'react';
import { LocaleProvider } from '@/context/LocaleContext';
import { AppProvider } from '@/context/AppContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      <AppProvider>{children}</AppProvider>
    </LocaleProvider>
  );
}
