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
    <div className="min-h-screen bg-white flex flex-col items-center justify-start w-full px-4">
      <section className="w-full py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">
            {pageText.sectionTitle}
          </h1>

          <div className="flex flex-col lg:flex-row gap-6 items-start justify-center bg-neutral-100 rounded-3xl px-9 py-10 w-full">
            {/* Left Column */}
            <div className="flex-1 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-full mx-auto">
              <div className="bg-white rounded-xl overflow-hidden h-128 sm:h-144 lg:h-168 relative flex flex-col">
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

                <div className="flex-1 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-start items-center text-center mt-8 sm:mt-12 max-w-full md:max-w-md lg:max-w-lg mx-auto">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-800">
                    {pageText.imageTitle}
                  </h2>
                </div>
              </div>
            </div>

            {/* Right Column - Recent News */}
            <div className="flex-1 w-full flex flex-col space-y-6">
              <p className="font-semibold text-neutral-600 text-lg">
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
