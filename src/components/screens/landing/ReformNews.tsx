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
      color: "#ED787E",
    },
    {
      title: pageText.cardTitle,
      description: pageText.cardDescription,
      image: rightSideCardImage,
      color: "#D182EB",
    },
    {
      title: pageText.cardTitle,
      description: pageText.cardDescription,
      image: rightSideCardImage,
      color: "#31B36B",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col items-center justify-start w-full px-4">
      <section className="w-full py-16 dark:bg-gray-900">
        <div className="max-w-[1350px] mx-auto px-6">
          {/* Section Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#E83231] dark:text-white mb-8 text-center">
            {pageText.sectionTitle}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center bg-[#F9F8F8] rounded-3xl px-9 py-10 w-full">
            {/* Left Column */}
            <div className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden h-[32rem] sm:h-[36rem] lg:h-[44rem] lg:h-[42rem] relative flex flex-col">
                {/* Featured Image */}
                <div className="w-full mt-14">
                  <Image
                    src={leftSideCardImage}
                    alt=""
                    width={1200}
                    height={700}
                    className="w-full h-auto object-cover object-center"
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1 px-6 sm:px-8 flex flex-col justify-start items-center text-center mt-12 w-sm mx-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-white">
                    {pageText.imageTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Column - Recent News */}
            <div className="flex-1 w-full flex flex-col space-y-6">
              <p className="font-semibold text-neutral-600 dark:text-gray-300 text-lg">
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
              <div className="mt-2 flex items-center justify-center">
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
    </div>
  );
}
