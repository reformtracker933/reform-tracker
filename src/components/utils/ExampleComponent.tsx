"use client";

import { useGlobalContext } from "@/context";
import { LanguageToggle } from "@/components/utils";
import { formatDate, formatNumber } from "@/lib/utils";

export function ExampleComponent() {
  const {
    locale,
    t,
    toggleLocale,
    isSidebarOpen,
    toggleSidebar,
    isSearchOpen,
    toggleSearch,
  } = useGlobalContext();

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between border-b border-border pb-4">
        <h1 className="text-2xl font-bold">{t("app.title")}</h1>

        <div className="flex gap-3">
          <LanguageToggle />
        </div>
      </header>

      <main className="space-y-4">
        <section className="p-4 bg-neutral-100 rounded-lg">
          <h2 className="font-semibold mb-2">{t("common.language")}</h2>
          <p className="text-sm text-muted">
            Current: {locale === "en" ? "English" : "বাংলা"}
          </p>
          <button
            onClick={toggleLocale}
            className="mt-2 px-3 py-1 bg-secondary text-white rounded text-sm"
          >
            {locale === "en" ? "Switch to বাংলা" : "Switch to English"}
          </button>
        </section>

        <section className="p-4 bg-neutral-100 rounded-lg">
          <h2 className="font-semibold mb-2">App State</h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Sidebar:</span>
              <button
                onClick={toggleSidebar}
                className="px-3 py-1 bg-success text-white rounded text-sm"
              >
                {isSidebarOpen ? "Close" : "Open"}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Search:</span>
              <button
                onClick={toggleSearch}
                className="px-3 py-1 bg-purple text-white rounded text-sm"
              >
                {isSearchOpen ? "Close" : "Open"}
              </button>
            </div>
          </div>
        </section>

        <section className="p-4 bg-neutral-100 rounded-lg">
          <h2 className="font-semibold mb-2">Locale Formatting</h2>
          <div className="space-y-1 text-sm">
            <p>Date: {formatDate(new Date(), locale)}</p>
            <p>Number: {formatNumber(123456789, locale)}</p>
          </div>
        </section>

        <section className="p-4 bg-neutral-100 rounded-lg">
          <h2 className="font-semibold mb-2">Sample Translations</h2>
          <ul className="space-y-1 text-sm">
            <li>• {t("common.home")}</li>
            <li>• {t("common.about")}</li>
            <li>• {t("common.contact")}</li>
            <li>• {t("common.search")}</li>
            <li>• {t("reforms.title")}</li>
            <li>• {t("evidence.title")}</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default ExampleComponent;
