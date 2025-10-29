# Context and Providers Setup

This project includes a complete setup for AppContext, ThemeProvider, and LocaleProvider with support for English and Bangla languages.

## Features

### 1. **ThemeProvider** - Theme Management

- Supports `light`, `dark`, and `system` themes
- Automatically syncs with system preferences
- Persists theme choice in localStorage
- Smooth theme transitions

### 2. **LocaleProvider** - Language Management

- Supports English (`en`) and Bangla (`bn`)
- Translation function `t()` for i18n
- Persists language choice in localStorage
- Updates HTML lang attribute automatically

### 3. **AppProvider** - Global App State

- Manage sidebar open/close state
- Manage search modal open/close state
- Extensible for additional global state

## Usage

### Using Theme

```tsx
'use client';

import { useTheme } from '@/context/ThemeContext';

export function MyComponent() {
  const { theme, setTheme, toggleTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>

      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  );
}
```

### Using Locale/Language

```tsx
'use client';

import { useLocale } from '@/context/LocaleContext';

export function MyComponent() {
  const { locale, setLocale, toggleLocale, t } = useLocale();

  return (
    <div>
      <h1>{t('app.title')}</h1>
      <p>{t('app.description')}</p>

      <button onClick={toggleLocale}>Toggle Language</button>

      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('bn')}>বাংলা</button>
    </div>
  );
}
```

### Using App Context

```tsx
'use client';

import { useApp } from '@/context/AppContext';

export function MyComponent() {
  const {
    isSidebarOpen,
    toggleSidebar,
    setSidebarOpen,
    isSearchOpen,
    toggleSearch,
    setSearchOpen,
  } = useApp();

  return (
    <div>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? 'Close' : 'Open'} Sidebar
      </button>

      <button onClick={toggleSearch}>
        {isSearchOpen ? 'Close' : 'Open'} Search
      </button>
    </div>
  );
}
```

### Using All Together

```tsx
'use client';

import { useTheme } from '@/context/ThemeContext';
import { useLocale } from '@/context/LocaleContext';
import { useApp } from '@/context/AppContext';

export function Header() {
  const { toggleTheme } = useTheme();
  const { locale, toggleLocale, t } = useLocale();
  const { toggleSidebar } = useApp();

  return (
    <header>
      <h1 className={locale === 'bn' ? 'font-bengali' : 'font-sans'}>
        {t('app.title')}
      </h1>

      <button onClick={toggleSidebar}>Menu</button>
      <button onClick={toggleTheme}>🌓 Theme</button>
      <button onClick={toggleLocale}>
        {locale === 'en' ? '🇧🇩 বাংলা' : '🇺🇸 English'}
      </button>
    </header>
  );
}
```

## Utility Functions

### Locale Utilities (`@/lib/utils/locale`)

```tsx
import {
  getLocaleFontClass,
  formatDate,
  formatNumber,
  getLocaleDisplayName,
  getTextDirection,
} from '@/lib/utils/locale';

// Get appropriate font class
const fontClass = getLocaleFontClass('bn'); // 'font-bengali'

// Format dates
const formatted = formatDate(new Date(), 'bn'); // '২৯ অক্টোবর, ২০২৫'

// Format numbers
const number = formatNumber(12345, 'bn'); // '১২,৩৪৫'

// Get display name
const displayName = getLocaleDisplayName('bn'); // 'বাংলা'
```

### Theme Utilities (`@/lib/utils/theme`)

```tsx
import {
  getThemeDisplayName,
  getThemeIcon,
  updateMetaThemeColor,
} from '@/lib/utils/theme';

// Get theme display name
const name = getThemeDisplayName('dark'); // 'Dark'

// Get theme icon
const icon = getThemeIcon('light'); // 'sun'

// Update meta theme color
updateMetaThemeColor(true); // Updates for dark mode
```

## Adding New Translations

Edit `/src/lib/translations.ts`:

```tsx
export const translations: Translations = {
  'your.key': {
    en: 'Your English Text',
    bn: 'আপনার বাংলা টেক্সট',
  },
  // Add more translations...
};
```

Then use in components:

```tsx
const { t } = useLocale();
const text = t('your.key');
```

## Components

Ready-to-use toggle components are available:

- `<ThemeToggle />` - Theme switcher UI
- `<LanguageToggle />` - Language switcher UI

Import and use them:

```tsx
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageToggle } from '@/components/LanguageToggle';

export function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <ThemeToggle />
      <LanguageToggle />
    </div>
  );
}
```

## File Structure

```
src/
├── context/
│   ├── AppContext.tsx       # Global app state
│   ├── LocaleContext.tsx    # Language/i18n
│   └── ThemeContext.tsx     # Theme management
├── providers/
│   └── Providers.tsx        # Combined providers
├── lib/
│   ├── translations.ts      # Translation strings
│   └── utils/
│       ├── locale.ts        # Locale utilities
│       └── theme.ts         # Theme utilities
├── types/
│   └── locale.ts            # Type definitions
└── components/
    ├── ThemeToggle.tsx      # Theme switcher
    └── LanguageToggle.tsx   # Language switcher
```

## Dark Mode CSS

Dark mode is automatically applied via the `.dark` class on the `<html>` element. Use Tailwind's dark mode utilities:

```tsx
<div className='bg-white dark:bg-gray-900'>
  <p className='text-gray-900 dark:text-white'>This text adapts to theme</p>
</div>
```

Custom CSS variables are also available:

```css
.my-element {
  background: var(--background);
  color: var(--foreground);
  border: 1px solid var(--border);
}
```
