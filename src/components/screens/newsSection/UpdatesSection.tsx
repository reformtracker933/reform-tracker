"use client";

import React, { FC } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/ReformUpdateButton";
import { UpdateCard } from "@/data/sampleNewsData";

type PageText = Record<string, unknown>;

const UpdatesSection: FC<{
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
  currentUpdateItems: UpdateCard[];
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
  currentUpdateItems,
  totalUpdatePages,
  currentUpdatePage,
  setCurrentUpdatePage,
}) => {
  return (
    <section className="w-full py-8 md:py-12">
      <div className="max-w-7xl mx-auto bg-neutral-100 px-4 py-6 md:px-6 md:py-8 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary/900 mb-3 md:mb-4">
            {String(pageText.reformUpdateTitle)}
          </h2>
          <p className="text-base md:text-xl lg:text-2xl font-semibold text-primary/800 max-w-md mx-auto mb-6 md:mb-8">
            {String(pageText.reformUpdateDescription)}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 md:mb-16">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={String(pageText.searchBarPlaceHolder)}
              value={updateSearchTerm}
              onChange={(e) => setUpdateSearchTerm(e.target.value)}
              className="h-12 md:h-14 w-full pl-10 md:pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-neutral-900 text-sm md:text-base"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
          </div>

          <div className="flex gap-3 md:gap-4">
            <div className="relative flex-1 md:w-34">
              <select
                value={selectedUpdateCategory}
                onChange={(e) => setSelectedUpdateCategory(e.target.value)}
                className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
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
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div className="relative flex-1 md:w-34">
              <select
                value={selectedUpdateWriter}
                onChange={(e) => setSelectedUpdateWriter(e.target.value)}
                className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
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
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors">
            {String(pageText.searchBarPlaceHolder)}
          </button>
        </div>

        <div className="text-neutral-600 font-semibold text-base md:text-lg lg:text-xl mb-4">
          {String(pageText.seeRecentNews)}
        </div>

        <div className="space-y-3 md:space-y-4">
          {currentUpdateItems.map((update) => (
            <Button key={update.id} variant="card" update={update} />
          ))}
        </div>

        {totalUpdatePages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6 md:mt-8">
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentUpdatePage === 1}
              className="px-2 disabled:opacity-50"
            >
              <ChevronLeft className="h-8 w-5 md:h-12 md:w-6 cursor-pointer text-primary/800" />
            </button>
            {Array.from({ length: totalUpdatePages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentUpdatePage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full text-sm md:text-base ${currentUpdatePage === page ? "bg-primary text-white" : "bg-primary-100 text-neutral-800"}`}
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
              <ChevronRight className="h-8 w-5 md:h-12 md:w-6 cursor-pointer text-primary/800" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdatesSection;
