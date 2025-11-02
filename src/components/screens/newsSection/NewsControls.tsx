"use client";

import React, { FC } from "react";
import { Search, Clock } from "lucide-react";

type PageText = Record<string, unknown>;

const NewsControls: FC<{
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
    <section className="w-full py-8 bg-gray-50">
      <div className="mx-auto max-w-4xl h-14">
        <div className="flex items-center justify-center h-full gap-2">
          <div className="relative w-90 text-xl">
            <input
              type="text"
              placeholder={"   " + String(pageText.searchBarPlaceHolder)}
              value={newsSearchTerm}
              onChange={(e) => setNewsSearchTerm(e.target.value)}
              className="h-14 w-full pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-gray-900"
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
            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
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

export default NewsControls;
