"use client";

import { useLocale } from "@/context/LocaleContext";
import { getLocaleDisplayName } from "@/lib/utils/locale";

export function LanguageToggle() {
  const { locale, toggleLocale, t } = useLocale();

  return (
    <button
      onClick={toggleLocale}
      className="px-4 py-2 rounded-lg bg-neutral-200 border border-neutral-300 hover:bg-neutral-100 transition-colors"
      aria-label={t("common.language")}
    >
      <span className="text-sm font-medium text-foreground">
        {getLocaleDisplayName(locale)}
      </span>
    </button>
  );
}
