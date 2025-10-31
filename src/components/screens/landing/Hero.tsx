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
    },
    {
      title: pageText["dashboard"],
      description: cardTexts["dashboardCardTitle"],
      imageSrc: card2,
      buttonName: cardTexts["buttonName2"],
    },
    {
      title: pageText["politicalTime"],
      description: cardTexts["politicalTimeCardTitle"],
      imageSrc: card3,
      buttonName: cardTexts["buttonName3"],
    },
  ];
  return (
    <section className="w-full">
      {/* Top visual area: this background starts behind the fixed navbar and ends before the cards */}
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
        {/* Centered hero text inside the visual area */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {pageText["heading"]}
            </h1>
          </div>
        </div>
      </div>

      {/* Cards: placed outside the background visual so the background does not extend behind them */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, index) => (
            <Card
              key={index}
              {...card}
              className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 text-center flex flex-col items-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
