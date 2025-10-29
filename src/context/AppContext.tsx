'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  const value: AppContextType = {
    isSidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    isSearchOpen,
    toggleSearch,
    setSearchOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
