"use client";

import Image from "next/image";
import React, { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NewsCard } from "@/data/sampleNewsData";
import { StaticImageData } from "next/image";

type PageText = Record<string, unknown>;

const NewsGrid: FC<{
  pageText: PageText;
  currentNewsItems: NewsCard[];
  totalNewsPages: number;
  currentNewsPage: number;
  setCurrentNewsPage: React.Dispatch<React.SetStateAction<number>>;
  rightSideCardPerson: StaticImageData | string;
}> = ({
  pageText,
  currentNewsItems,
  totalNewsPages,
  currentNewsPage,
  setCurrentNewsPage,
  rightSideCardPerson,
}) => {
  return (
    <section className="w-full py-6 md:py-8">
      <div className="max-w-7xl bg-neutral-100 mx-auto px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-9">
        <div className="text-neutral-600 font-semibold text-base md:text-lg lg:text-xl mb-4">
          {String(pageText.seeRecentNews)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {currentNewsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl transition duration-300"
            >
              <div className="relative h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 md:p-5 lg:p-6">
                <h3 className="text-lg md:text-xl text-neutral-900 mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-800 mb-4 line-clamp-3">
                  {news.description}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm text-neutral-500">
                  <div className="flex items-center gap-2">
                    <Image
                      src={rightSideCardPerson}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="text-neutral-600">{news.writer}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 md:w-3 md:h-3 bg-neutral-600 rounded-full inline-block"></span>
                    <span className="text-neutral-600">{news.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalNewsPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
            <button
              onClick={() =>
                setCurrentNewsPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentNewsPage === 1}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-8 w-5 md:h-12 md:w-6 cursor-pointer text-primary/800" />
            </button>
            {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentNewsPage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer text-sm md:text-base ${currentNewsPage === page ? "bg-primary text-white" : "bg-primary-100 text-neutral-800"}`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() =>
                setCurrentNewsPage((prev) => Math.min(prev + 1, totalNewsPages))
              }
              disabled={currentNewsPage === totalNewsPages}
              className="p-2 disabled:opacity-50"
            >
              <ChevronRight className="h-8 w-5 md:h-12 md:w-6 cursor-pointer text-primary/800" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsGrid;
