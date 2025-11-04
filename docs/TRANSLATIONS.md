# Translation System

## Overview

This project uses an auto-generated type-safe translation system. TypeScript types are automatically generated from JSON translation files, providing full type safety and autocomplete.

## Usage

### Getting Translations in Components

```tsx
import { useLocale } from '@/context/LocaleContext';

function MyComponent() {
  const { getTranslation } = useLocale();

  // Get translations for a specific page with full type safety
  const pageText = getTranslation('heroSection');

  // TypeScript will autocomplete all available keys
  return <h1>{pageText.heading}</h1>;
}
```

### Adding New Translations

1. Add your translation keys to the English JSON file:
   - For landing pages: `src/data/languages/en/RTL.json`
   - For new pages: Create a new JSON file in `src/data/languages/en/`

2. Add the same keys to the Bengali JSON file:
   - `src/data/languages/bn/RTL.json` or corresponding file

3. Run the type generator:

   ```bash
   pnpm generate:types
   ```

4. Types are automatically generated and you'll have full autocomplete!

## File Structure

```
src/
├── data/
│   └── languages/
│       ├── en/
│       │   ├── RTL.json      # Main translations
│       │   └── demo.json     # Demo page translations
│       └── bn/
│           ├── RTL.json      # Bengali translations
│           └── demo.json     # Bengali demo translations
├── types/
│   ├── locale.ts                      # Main type definitions
│   └── translations.generated.ts     # Auto-generated types (DO NOT EDIT)
└── lib/
    └── translationHelpers.ts         # Helper functions

scripts/
└── generate-translation-types.ts    # Type generation script
```

## Type Generation

Types are automatically generated:

- On `pnpm install` (via postinstall script)
- Manually via `pnpm generate:types`

The script:

1. Reads all JSON files from `src/data/languages/en/`
2. Generates TypeScript types matching the JSON structure
3. Creates a `TranslationPages` interface with all page keys
4. Outputs to `src/types/translations.generated.ts`

## Benefits

✅ **Type Safety**: Catch typos at compile time
✅ **Autocomplete**: Full IntelliSense support in your editor
✅ **No Manual Updates**: Types auto-generate from JSON
✅ **Scalable**: Add as many translation keys as needed
✅ **Refactoring**: Rename keys with confidence
