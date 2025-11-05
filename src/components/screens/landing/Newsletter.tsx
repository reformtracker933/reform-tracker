"use client";

import { useState } from "react";
import { useLocale } from "@/context/LocaleContext";
import SubscribeModal from "@/components/ui/SubscribeModal";

export function Newsletter() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("newsletter");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleSubscribeClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className="w-full py-8 md:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 md:mb-6 leading-tight">
            {pageText.title}
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl text-neutral-600 mb-6 md:mb-8 font-semibold">
            {pageText.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6 max-w-2xl mx-auto">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder={pageText.emailPlaceholder}
            className="w-full sm:flex-1 px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-primary text-neutral-800 font-medium text-sm md:text-base focus:outline-none focus:border-secondary transition-colors"
          />

          <button
            onClick={handleSubscribeClick}
            className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors whitespace-nowrap"
          >
            {pageText.subscribeButton}
          </button>
        </div>
      </div>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="newsletter"
        showNameField={true}
        initialEmail={emailInput}
      />
    </section>
  );
}
