'use client';

import { useLocale } from './LocaleContext';
import { useApp } from './AppContext';

export function useGlobalContext() {
  const locale = useLocale();
  const app = useApp();

  return {
    locale: locale.locale,
    setLocale: locale.setLocale,
    toggleLocale: locale.toggleLocale,
    t: locale.t,

    isSidebarOpen: app.isSidebarOpen,
    toggleSidebar: app.toggleSidebar,
    setSidebarOpen: app.setSidebarOpen,
    isSearchOpen: app.isSearchOpen,
    toggleSearch: app.toggleSearch,
    setSearchOpen: app.setSearchOpen,
  };
}
