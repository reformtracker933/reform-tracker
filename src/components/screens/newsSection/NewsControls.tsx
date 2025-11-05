"use client";

import React, { FC } from "react";
import { Search } from "lucide-react";
import { RTLTranslations } from "@/types/translations.generated";

const NewsControls: FC<{
  pageText: RTLTranslations["reformNews"];
  newsSearchTerm: string;
  setNewsSearchTerm: (v: string) => void;
  selectedNewsCategory: string;
  setSelectedNewsCategory: (v: string) => void;
  selectedWriter: string;
  setSelectedWriter: (v: string) => void;
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  categories: { id: string; name: string }[];
  writers: { id: string; name: string }[];
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
    <section className="w-full py-6 md:py-8 ">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={pageText.searchBarPlaceHolder}
              value={newsSearchTerm}
              onChange={(e) => setNewsSearchTerm(e.target.value)}
              className="h-12 md:h-14 w-full pl-10 md:pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-neutral-900 text-sm md:text-base"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
          </div>

          <div className="flex gap-3 md:gap-4">
            <div className="relative flex-1 md:w-34">
              <select
                value={selectedNewsCategory}
                onChange={(e) => setSelectedNewsCategory(e.target.value)}
                className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
              >
                <option value="all">{pageText.sector}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
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
                value={selectedWriter}
                onChange={(e) => setSelectedWriter(e.target.value)}
                className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
              >
                <option value="all">{pageText.writer}</option>
                {writers.map((writer) => (
                  <option key={writer.id} value={writer.name}>
                    {writer.name}
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

          <div className="relative w-full md:w-34">
            <input
              type="date"
              placeholder={pageText.time}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="h-12 md:h-14 w-full px-4 rounded-full border border-neutral-400 bg-white text-neutral-600 text-center text-sm md:text-base [&::-webkit-calendar-picker-indicator]:opacity-100"
            />
          </div>

          {/* <button className='h-12 md:h-14 px-6 md:px-8 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors'>
            {pageText.searchBarPlaceHolder}
          </button> */}
        </div>
      </div>
    </section>
  );
};

export default NewsControls;
