"use client";

import Image from "next/image";
import { useLocale } from "@/context/LocaleContext";
import { leftSideCardImage } from "@/assets";
import Link from "next/link";
import Card from "@/components/ui/ReformNewsCard";
import Button from "@/components/ui/ReformUpdateButton";
import { NewsArticle } from "@/types/sanity";

interface ReformNewsProps {
  newsArticles: NewsArticle[];
}

export function ReformNews({ newsArticles }: ReformNewsProps) {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("reformNewsSection");

  if (!newsArticles || newsArticles.length === 0) {
    return null;
  }

  const colors = [
    "var(--color-primary-400)",
    "var(--color-purple)",
    "var(--color-success)",
  ];

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 ">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 md:mb-8 text-center">
          {pageText.sectionTitle}
        </h1>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-stretch justify-center bg-neutral-100 rounded-2xl md:rounded-3xl py-6 px-4 md:px-6 md:py-8 lg:px-8 lg:py-10 w-full">
          {/* Left Column - Illustration */}
          <div className="flex-1 w-full lg:max-w-none flex items-center justify-center">
            <div className="w-full ">
              <Image
                src={leftSideCardImage}
                alt=""
                width={800}
                height={400}
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Column - Recent News */}
          <div className="flex-1 w-full flex flex-col space-y-3 md:space-y-4 lg:space-y-6">
            <p className="font-semibold text-neutral-600 text-base md:text-lg">
              {pageText.rightSideTitle}
            </p>

            {/* Recent News Cards */}
            {newsArticles.slice(0, 3).map((news, index) => (
              <Card
                key={news._id}
                image={news.featuredImage}
                title={news.title}
                buttonText={pageText.buttonText}
                description={news.excerpt}
                personImage={news.author?.avatar || ""}
                person={news.author?.name || pageText.person}
                date={new Date(news.publishedDate).toLocaleDateString("bn-BD")}
                color={colors[index % colors.length]}
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
