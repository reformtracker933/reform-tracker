"use client";

import { useLocale } from "@/context/LocaleContext";
import Link from "next/link";
import Button from "@/components/ui/NewsLetterButton";

export function Newsletter() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("newsletter");

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

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 lg:gap-6">
          <Link href="/emailAddress">
            <Button variant="primary" text={pageText.emailPlaceholder} />
          </Link>

          <Link href="/subscribe">
            <Button variant="secondary" text={pageText.subscribeButton} />
          </Link>
        </div>
      </div>
    </section>
  );
}
