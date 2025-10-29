# Quick Start Guide - Context & Providers

## 🚀 Quick Import Reference

```tsx
// Import contexts
import { useTheme } from '@/context/ThemeContext';
import { useLocale } from '@/context/LocaleContext';
import { useApp } from '@/context/AppContext';

// Or use the index export
import { useTheme, useLocale, useApp } from '@/context';

// Import components
import { ThemeToggle, LanguageToggle } from '@/components';

// Import utilities
import { formatDate, formatNumber, getLocaleFontClass } from '@/lib/utils';
```

## 📝 Common Patterns

### 1. Basic Component with Translation

```tsx
'use client';

import { useLocale } from '@/context/LocaleContext';

export function MyComponent() {
  const { locale, t } = useLocale();

  return (
    <div className={locale === 'bn' ? 'font-bengali' : 'font-sans'}>
      <h1>{t('app.title')}</h1>
      <p>{t('app.description')}</p>
    </div>
  );
}
```

### 2. Theme-Aware Component

```tsx
'use client';

import { useTheme } from '@/context/ThemeContext';

export function MyComponent() {
  const { resolvedTheme } = useTheme();

  return (
    <div className='bg-white dark:bg-gray-900'>
      <p>Current theme: {resolvedTheme}</p>
    </div>
  );
}
```

### 3. Complete Header Example

```tsx
'use client';

import { useLocale } from '@/context/LocaleContext';
import { ThemeToggle, LanguageToggle } from '@/components';

export function Header() {
  const { locale, t } = useLocale();

  return (
    <header className='flex items-center justify-between p-4'>
      <h1 className={locale === 'bn' ? 'font-bengali' : 'font-sans'}>
        {t('app.title')}
      </h1>

      <div className='flex gap-4'>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </header>
  );
}
```

## 🎨 Styling Tips

### Using Theme Variables

```tsx
// Tailwind classes (recommended)
<div className="bg-white dark:bg-gray-900 text-foreground">

// CSS variables
<div style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
```

### Font Classes

```tsx
// Bengali font
<p className="font-bengali">আপনার বাংলা টেক্সট</p>

// English font
<p className="font-sans">Your English text</p>

// Dynamic based on locale
const { locale } = useLocale();
<p className={locale === 'bn' ? 'font-bengali' : 'font-sans'}>
  {text}
</p>
```

## 🌐 Adding Translations

1. Open `/src/lib/translations.ts`
2. Add your translation key:

```tsx
export const translations: Translations = {
  'mypage.title': {
    en: 'My Page Title',
    bn: 'আমার পেজ শিরোনাম',
  },
  'mypage.button': {
    en: 'Click Me',
    bn: 'আমাকে ক্লিক করুন',
  },
};
```

3. Use in component:

```tsx
const { t } = useLocale();
<h1>{t('mypage.title')}</h1>
<button>{t('mypage.button')}</button>
```

## 📱 Demo Pages

- **Main page**: `/` - Shows basic setup
- **Demo page**: `/demo` - Interactive demonstration of all features

## 🛠️ Utility Functions

```tsx
import { formatDate, formatNumber, getLocaleFontClass } from '@/lib/utils';

// Format date in current locale
const date = formatDate(new Date(), locale); // "October 29, 2025" or "২৯ অক্টোবর, ২০২৫"

// Format number in current locale
const num = formatNumber(123456, locale); // "123,456" or "১,২৩,৪৫৬"

// Get font class for locale
const fontClass = getLocaleFontClass(locale); // "font-bengali" or "font-sans"
```

## ✅ Checklist

- [x] ThemeProvider installed and working
- [x] LocaleProvider installed and working
- [x] AppProvider installed and working
- [x] Dark mode functional
- [x] Language toggle functional
- [x] Persistence working (localStorage)
- [x] Bangla and English fonts loaded
- [x] Translation system ready
- [x] Demo page created

## 📚 Full Documentation

See `CONTEXT_SETUP.md` for complete documentation with all features and examples.
