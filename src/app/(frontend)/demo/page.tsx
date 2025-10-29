'use client';

import { useLocale } from '@/context/LocaleContext';
import { useApp } from '@/context/AppContext';
import { LanguageToggle } from '@/components/utils';
import { formatDate, formatNumber } from '@/lib/utils/locale';
import Link from 'next/link';

export default function DemoPage() {
  const { locale, t, getTranslation } = useLocale();
  const pageText = getTranslation('demo'); // demo page translations
  const { isSidebarOpen, toggleSidebar, isSearchOpen, toggleSearch } = useApp();

  // Color palette from globals.css
  const colors = {
    primary: [
      { name: 'Primary', var: 'primary', hex: '#e83231' },
      { name: 'Primary 400', var: 'primary-400', hex: '#ea8389' },
      { name: 'Primary 200', var: 'primary-200', hex: '#e2bdbf' },
      { name: 'Primary 100', var: 'primary-100', hex: '#f3e6e7' },
      { name: 'Primary 50', var: 'primary-50', hex: '#fcf8f8' },
    ],
    neutral: [
      { name: 'Neutral 900', var: 'neutral-900', hex: '#1f2223' },
      { name: 'Neutral 800', var: 'neutral-800', hex: '#363939' },
      { name: 'Neutral 700', var: 'neutral-700', hex: '#57595a' },
      { name: 'Neutral 600', var: 'neutral-600', hex: '#797a7b' },
      { name: 'Neutral 500', var: 'neutral-500', hex: '#8e9090' },
      { name: 'Neutral 400', var: 'neutral-400', hex: '#b1b2b2' },
      { name: 'Neutral 300', var: 'neutral-300', hex: '#d2d3d3' },
      { name: 'Neutral 200', var: 'neutral-200', hex: '#eaeaea' },
      { name: 'Neutral 100', var: 'neutral-100', hex: '#fcfcfc' },
      { name: 'Neutral 0', var: 'neutral-0', hex: '#ffffff' },
    ],
    secondary: [
      { name: 'Secondary', var: 'blue-500', hex: '#4a7ec9' },
      { name: 'Secondary 300', var: 'blue-300', hex: '#81b5e9' },
      { name: 'Secondary 200', var: 'blue-200', hex: '#c1d3e5' },
      { name: 'Secondary 100', var: 'blue-100', hex: '#e6eef5' },
    ],
    success: [
      { name: 'Success', var: 'green-500', hex: '#31b36b' },
      { name: 'Success 80%', var: 'green-500-80', hex: '#31b36bcc' },
      { name: 'Success 50%', var: 'green-500-50', hex: '#31b36b80' },
      { name: 'Success 10%', var: 'green-500-10', hex: '#31b36b1a' },
    ],
    warning: [
      { name: 'Warning', var: 'yellow-500', hex: '#f9d262' },
      { name: 'Warning 300', var: 'yellow-300', hex: '#ffe393' },
      { name: 'Warning 50', var: 'yellow-50', hex: '#fff8ef' },
    ],
    purple: [
      { name: 'Purple', var: 'purple-500', hex: '#deaaef' },
      { name: 'Purple 300', var: 'purple-300', hex: '#e7d1ee' },
      { name: 'Purple 100', var: 'purple-100', hex: '#f6eff8' },
    ],
    lime: [
      { name: 'Lime', var: 'lime-500', hex: '#b4d479' },
      { name: 'Lime 300', var: 'lime-300', hex: '#d8e4c2' },
      { name: 'Lime 100', var: 'lime-100', hex: '#eef2e5' },
    ],
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-background backdrop-blur-md border-b border-border shadow-sm'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
          <Link
            href='/'
            className='flex items-center gap-3 hover:opacity-80 transition-opacity'
          >
            <div className='w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold shadow-md'>
              RT
            </div>
            <h2 className='text-xl font-bold text-foreground'>
              {t('app.title')}
            </h2>
          </Link>

          <div className='flex items-center gap-3'>
            <LanguageToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12'>
        {/* Page Title */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground'>
            {pageText.pageTitle}
          </h1>
          <p className='text-base sm:text-lg text-muted'>
            {pageText.pageSubtitle}
          </p>
        </div>

        {/* Demo Grid */}
        <div className='space-y-6 sm:space-y-8'>
          {/* Color Palette */}
          <div className='bg-surface rounded-xl border border-border overflow-hidden shadow-sm'>
            <div className='bg-primary px-4 sm:px-6 py-4 sm:py-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-on-primary'>
                🎨 {pageText.colorPalette.title}
              </h2>
            </div>

            <div className='p-4 sm:p-6 space-y-6'>
              {Object.entries(colors).map(([category, colorList]) => (
                <div key={category}>
                  <h3 className='text-sm font-semibold text-foreground mb-3 capitalize'>
                    {category}
                  </h3>
                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                    {colorList.map((color) => (
                      <div
                        key={color.var}
                        className='border border-outline rounded-lg overflow-hidden hover:shadow-md transition-shadow'
                      >
                        <div
                          className='h-20 w-full'
                          style={{ backgroundColor: `var(--${color.var})` }}
                        />
                        <div className='p-2 bg-background'>
                          <p className='text-xs font-medium text-foreground'>
                            {color.name}
                          </p>
                          <p className='text-xs text-subtle font-mono'>
                            {color.hex}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Context Controls */}
          <div>
            {/* Language Card */}
            <div className='bg-surface rounded-xl border border-border overflow-hidden shadow-sm max-w-2xl mx-auto'>
              <div className='bg-purple-500 px-4 sm:px-6 py-4 sm:py-6'>
                <div className='flex items-center gap-3 text-neutral-900'>
                  <span className='text-2xl sm:text-3xl'>🌐</span>
                  <h2 className='text-xl sm:text-2xl font-bold'>
                    {pageText.languageCard.title}
                  </h2>
                </div>
              </div>

              <div className='p-4 sm:p-6 space-y-4'>
                <div className='p-4 bg-surface-2 rounded-lg border border-outline text-center'>
                  <p className='text-xs text-subtle mb-2'>
                    {pageText.languageCard.currentLanguage}
                  </p>
                  <p className='text-lg font-bold text-foreground'>
                    {locale === 'en'
                      ? `${pageText.languageCard.english} 🇺🇸`
                      : `${pageText.languageCard.bengali} 🇧🇩`}
                  </p>
                </div>
                <LanguageToggle />
              </div>
            </div>
          </div>

          {/* App State */}
          <div className='bg-surface rounded-xl border border-border overflow-hidden shadow-sm max-w-2xl mx-auto'>
            <div className='bg-green-500 px-4 sm:px-6 py-4 sm:py-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-on-success'>
                ⚙️ {pageText.appState.title}
              </h2>
            </div>

            <div className='p-4 sm:p-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-foreground'>
                      {pageText.appState.sidebar}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isSidebarOpen
                          ? 'bg-green-500-10 text-green-500'
                          : 'bg-surface-2 text-subtle'
                      }`}
                    >
                      {isSidebarOpen
                        ? pageText.appState.open
                        : pageText.appState.closed}
                    </span>
                  </div>
                  <button
                    onClick={toggleSidebar}
                    className='w-full px-4 py-3 bg-green-500 text-on-success rounded-lg hover:opacity-90 transition-opacity shadow-md font-medium'
                  >
                    {pageText.appState.toggleSidebar}
                  </button>
                </div>

                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-foreground'>
                      {pageText.appState.search}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        isSearchOpen
                          ? 'bg-blue-100 text-blue-500'
                          : 'bg-surface-2 text-subtle'
                      }`}
                    >
                      {isSearchOpen
                        ? pageText.appState.open
                        : pageText.appState.closed}
                    </span>
                  </div>
                  <button
                    onClick={toggleSearch}
                    className='w-full px-4 py-3 bg-blue-500 text-on-secondary rounded-lg hover:opacity-90 transition-opacity shadow-md font-medium'
                  >
                    {pageText.appState.toggleSearch}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Locale Formatting */}
          <div className='bg-surface rounded-xl border border-border overflow-hidden shadow-sm'>
            <div className='bg-yellow-500 px-4 sm:px-6 py-4 sm:py-6'>
              <h2 className='text-xl sm:text-2xl font-bold text-neutral-900'>
                🔢 {pageText.examples.formatting.title}
              </h2>
            </div>

            <div className='p-4 sm:p-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 bg-surface-2 rounded-lg border border-outline'>
                  <p className='text-xs font-medium text-subtle mb-2'>
                    {pageText.examples.formatting.date}
                  </p>
                  <p className='text-base font-semibold text-foreground'>
                    {formatDate(new Date(), locale)}
                  </p>
                </div>

                <div className='p-4 bg-surface-2 rounded-lg border border-outline'>
                  <p className='text-xs font-medium text-subtle mb-2'>
                    {pageText.examples.formatting.number}
                  </p>
                  <p className='text-base font-semibold text-foreground'>
                    {formatNumber(123456789, locale)}
                  </p>
                </div>

                <div className='p-4 bg-surface-2 rounded-lg border border-outline'>
                  <p className='text-xs font-medium text-subtle mb-2'>
                    Currency Example
                  </p>
                  <p className='text-base font-semibold text-foreground'>
                    {new Intl.NumberFormat(
                      locale === 'bn' ? 'bn-BD' : 'en-US',
                      {
                        style: 'currency',
                        currency: locale === 'bn' ? 'BDT' : 'USD',
                      }
                    ).format(50000)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
