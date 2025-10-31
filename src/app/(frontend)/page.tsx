"use client";

import { Hero } from "@/components/screens/landing/Hero";
import { Newsletter } from "@/components/screens/landing/Newsletter";
import { ReformNews } from "@/components/screens/landing/ReformNews";
import { ReformUpdate } from "@/components/screens/landing/ReformUpdate";
import { useLocale } from "@/context/LocaleContext";

export default function Home() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("homePage");

  return (
    <div className="min-h-[90vh] w-full bg-background flex flex-col items-center justify-center">
      <Hero />
      <ReformNews />
      <ReformUpdate />
      <Newsletter />
      {/* <Button href="/demo" variant="primary" size="lg">
        {pageText.viewDemo} →
      </Button> */}
    </div>
  );
}
