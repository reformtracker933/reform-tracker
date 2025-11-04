"use client";

import Image from "next/image";
import React, { FC } from "react";
import { Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/ReformUpdateButton";
import { NewsCard } from "@/data/sampleNewsData";
import { StaticImageData } from "next/image";

type PageText = Record<string, unknown>;

export const HeroSection: FC<{
  pageText: PageText;
  background: StaticImageData | string;
}> = ({ pageText, background }) => {
  return (
    <section className="relative w-full h-[618px] flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Reform News Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-primary/900 mb-6">
          {String(pageText.title)}
        </h1>
        <p className="text-2xl font-semibold text-primary/800 max-w-lg mx-auto">
          {String(pageText.descriptionOfTitle)}
        </p>
      </div>
    </section>
  );
};

export const NewsControls: FC<{
  pageText: PageText;
  newsSearchTerm: string;
  setNewsSearchTerm: (v: string) => void;
  selectedNewsCategory: string;
  setSelectedNewsCategory: (v: string) => void;
  selectedWriter: string;
  setSelectedWriter: (v: string) => void;
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  categories: string[];
  writers: string[];
}> = ({
  pageText,
  newsSearchTerm,
  setNewsSearchTerm,
  selectedNewsCategory,
  setSelectedNewsCategory,
  selectedWriter,
  setSelectedWriter,
  selectedTime,
  setSelectedTime,
  categories,
  writers,
}) => {
  return (
    <section className="w-full py-8 bg-neutral-100">
      <div className="mx-auto max-w-4xl h-14">
        <div className="flex items-center justify-center h-full gap-2">
          <div className="relative w-90 text-xl">
            <input
              type="text"
              placeholder={"   " + String(pageText.searchBarPlaceHolder)}
              value={newsSearchTerm}
              onChange={(e) => setNewsSearchTerm(e.target.value)}
              className="h-14 w-full pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-neutral-900"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400" />
          </div>

          <div className="w-34 relative flex items-center text-base">
            <select
              value={selectedNewsCategory}
              onChange={(e) => setSelectedNewsCategory(e.target.value)}
              className="h-14 w-full rounded-full border border-neutral-400 bg-white text-neutral-600 appearance-none text-center absolute"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={
                    category === "All Categories"
                      ? "all"
                      : category.toLowerCase()
                  }
                >
                  {String(pageText.sector)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-34 relative flex items-center text-base">
            <select
              value={selectedWriter}
              onChange={(e) => setSelectedWriter(e.target.value)}
              className="h-14 w-full rounded-full border border-neutral-400 bg-white text-neutral-600 appearance-none text-center absolute"
            >
              {writers.map((writer) => (
                <option
                  key={writer}
                  value={
                    writer === "All Writers" ? "all" : writer.toLowerCase()
                  }
                >
                  {String(pageText.writer)}
                </option>
              ))}
            </select>
          </div>

          <div className="relative w-34 text-base">
            <input
              type="date"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="h-14 w-full px-4 pr-10 rounded-full border border-neutral-400 bg-white  text-neutral-600"
            />
            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
          </div>

          <div className="w-48 text-white text-xl">
            <button className="h-14 w-full rounded-full bg-secondary">
              {String(pageText.searchBarPlaceHolder)}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const NewsGrid: FC<{
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
    <section className="w-full py-8 bg-primary-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-neutral-600 font-semibold text-xl mb-4">
          {String(pageText.seeRecentNews)}
        </div>
        <div className="grid grid-cols-2 gap-8">
          {currentNewsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:scale-102 hover:shadow-2xl transition duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-neutral-900 mb-2">{news.title}</h3>
                <p className="text-neutral-800 mb-4">{news.description}</p>
                <div className="flex items-center gap-4 text-sm text-neutral-500">
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
                    <span className="w-3 h-3 bg-neutral-600 rounded-full inline-block"></span>
                    <span className="text-neutral-600">{news.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalNewsPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() =>
                setCurrentNewsPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentNewsPage === 1}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-12 w-6 cursor-pointer text-primary/800" />
            </button>
            {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentNewsPage(page)}
                  className={`w-12 h-12 rounded-full cursor-pointer ${currentNewsPage === page ? "bg-primary text-white" : "bg-primary-100 text-neutral-800"}`}
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
              <ChevronRight className="h-12 w-6 cursor-pointer text-primary/800" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export const UpdatesSection: FC<{
  pageText: PageText;
  updateSearchTerm: string;
  setUpdateSearchTerm: (v: string) => void;
  selectedUpdateCategory: string;
  setSelectedUpdateCategory: (v: string) => void;
  selectedUpdateWriter: string;
  setSelectedUpdateWriter: (v: string) => void;
  categories: string[];
  writers: string[];
  updates: Array<{
    category: string;
    title: string;
    color: string;
    href: string;
  }>;
  totalUpdatePages: number;
  currentUpdatePage: number;
  setCurrentUpdatePage: React.Dispatch<React.SetStateAction<number>>;
}> = ({
  pageText,
  updateSearchTerm,
  setUpdateSearchTerm,
  selectedUpdateCategory,
  setSelectedUpdateCategory,
  selectedUpdateWriter,
  setSelectedUpdateWriter,
  categories,
  writers,
  updates,
  totalUpdatePages,
  currentUpdatePage,
  setCurrentUpdatePage,
}) => {
  return (
    <section className="w-full py-12 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-6xl font-bold text-primary/900 mb-4">
            {String(pageText.reformUpdateTitle)}
          </h2>
          <p className="text-2xl font-semibold text-primary/800 max-w-md mx-auto mb-8">
            {String(pageText.reformUpdateDescription)}
          </p>
        </div>

        <div className="flex items-center justify-center h-full gap-2 mb-16">
          <div className="relative w-90 text-xl">
            <input
              type="text"
              placeholder={"   " + String(pageText.searchBarPlaceHolder)}
              value={updateSearchTerm}
              onChange={(e) => setUpdateSearchTerm(e.target.value)}
              className="h-14 w-full pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-neutral-900"
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400" />
          </div>

          <div className="w-34 relative flex items-center text-base">
            <select
              value={selectedUpdateCategory}
              onChange={(e) => setSelectedUpdateCategory(e.target.value)}
              className="h-14 w-full rounded-full border border-neutral-400 bg-white text-neutral-600 appearance-none text-center absolute"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={
                    category === "All Categories"
                      ? "all"
                      : category.toLowerCase()
                  }
                >
                  {String(pageText.sector)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-34 relative flex items-center text-base">
            <select
              value={selectedUpdateWriter}
              onChange={(e) => setSelectedUpdateWriter(e.target.value)}
              className="h-14 w-full rounded-full border border-neutral-400 bg-white text-neutral-600 appearance-none text-center absolute"
            >
              {writers.map((writer) => (
                <option
                  key={writer}
                  value={
                    writer === "All Writers" ? "all" : writer.toLowerCase()
                  }
                >
                  {String(pageText.writer)}
                </option>
              ))}
            </select>
          </div>

          <div className="w-48 text-white text-xl">
            <button className="h-14 w-full rounded-full bg-secondary">
              {String(pageText.searchBarPlaceHolder)}
            </button>
          </div>
        </div>

        <div className="left-0 top-0 text-neutral-600 font-semibold text-xl mb-4">
          {String(pageText.seeRecentNews)}
        </div>

        <div className="space-y-4">
          {updates.map((update, index) => (
            <Button key={index} variant="card" update={update} />
          ))}
        </div>

        {totalUpdatePages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentUpdatePage === 1}
              className="px-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-12 w-6 cursor-pointer text-primary/800" />
            </button>
            {Array.from({ length: totalUpdatePages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentUpdatePage(page)}
                  className={`w-12 h-12 rounded-full ${currentUpdatePage === page ? "bg-primary text-white" : "bg-primary-100 text-neutral-800"}`}
                >
                  {page}
                </button>
              ),
            )}
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) =>
                  Math.min(prev + 1, totalUpdatePages),
                )
              }
              disabled={currentUpdatePage === totalUpdatePages}
              className="px-2 disabled:opacity-50"
            >
              <ChevronRight className="h-12 w-6 cursor-pointer text-primary/800" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const components = {
  HeroSection,
  NewsControls,
  NewsGrid,
  UpdatesSection,
};

export default components;
