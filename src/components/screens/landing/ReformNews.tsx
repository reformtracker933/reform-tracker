import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import {
  leftSideCardImage,
  rightSideCardImage,
  rightSideCardPerson,
} from "@/assets";
import Link from "next/link";
import Card from "@/components/ui/ReformNewsCard";
import Button from "@/components/ui/ReformUpdateButton";

export function ReformNews() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("reformNewsSection");

  const recentNews = [
    {
      title: pageText.cardTitle,
      description: pageText.cardDescription,
      image: rightSideCardImage,
      color: "var(--color-primary-400)",
    },
    {
      title: pageText.cardTitle,
      description: pageText.cardDescription,
      image: rightSideCardImage,
      color: "var(--color-purple)",
    },
    {
      title: pageText.cardTitle,
      description: pageText.cardDescription,
      image: rightSideCardImage,
      color: "var(--color-success)",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 ">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 md:mb-8 text-center">
          {pageText.sectionTitle}
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch justify-center bg-neutral-100 rounded-2xl md:rounded-3xl py-6 md:px-6 md:py-8 lg:px-8 lg:py-10 w-full">
          {/* Left Column */}
          <div className="flex-1 w-full lg:max-w-none">
            <div className="bg-white rounded-xl overflow-hidden h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] flex flex-col">
              {/* Featured Image */}
              <div className="w-full shrink-0 mt-8 md:mt-12 lg:mt-14">
                <Image
                  src={leftSideCardImage}
                  alt=""
                  width={1200}
                  height={700}
                  className="w-full h-auto object-cover object-center"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 px-4 md:px-6 lg:px-8 flex flex-col justify-start items-center text-center mt-6 md:mt-8 lg:mt-10 pb-6 md:pb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-neutral-800">
                  {pageText.imageTitle}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Column - Recent News */}
          <div className="flex-1 w-full flex flex-col space-y-3 md:space-y-4 lg:space-y-6">
            <p className="font-semibold text-neutral-600 text-base md:text-lg">
              {pageText.rightSideTitle}
            </p>

            {/* Recent News Cards */}
            {recentNews.map((news, index) => (
              <Card
                key={index}
                image={news.image}
                title={pageText.cardTitle}
                buttonText={pageText.buttonText}
                description={pageText.cardDescription}
                personImage={rightSideCardPerson}
                person={pageText.person}
                date={pageText.date}
                color={news.color}
              />
            ))}

            {/* View All Button */}
            <div className="mt-2 md:mt-3 lg:mt-4 flex items-center justify-center">
              <Link href="/news">
                <Button
                  variant="primary"
                  pageText={{ viewAll: pageText.viewAllNews }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
