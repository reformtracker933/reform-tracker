"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { useLocale } from "@/context/LocaleContext";
import { card1, card2, card3, heroImage } from "@/assets";

export function Hero() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("heroSection");
  const cardTexts = getTranslation("heroSectionCards");

  const cards = [
    {
      title: pageText["news"],
      description: cardTexts["newsCardTitle"],
      imageSrc: card1,
      buttonName: cardTexts["buttonName1"],
      href: "/news",
    },
    {
      title: pageText["dashboard"],
      description: cardTexts["dashboardCardTitle"],
      imageSrc: card2,
      buttonName: cardTexts["buttonName2"],
      href: "/dashboard",
    },
    {
      title: pageText["politicalTime"],
      description: cardTexts["politicalTimeCardTitle"],
      imageSrc: card3,
      buttonName: cardTexts["buttonName3"],
      href: "/parties",
    },
  ];

  return (
    <section className="w-full">
      <div className="relative w-full">
        <div className="h-[60vh] w-full">
          <Image
            src={heroImage}
            alt="Reform Tracker Background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-4 leading-tight">
              {pageText["heading"]}
            </h1>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto py-8 md:py-12 flex flex-col items-center px-4 xl:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              className="backdrop-blur-sm bg-neutral-100 text-center flex flex-col items-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
