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
    <section className="w-full py-12 bg-gray-50">
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
              className="h-14 w-full pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-gray-900"
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
          {currentUpdateItems.map((update) => (
            <Button key={update.id} variant="card" update={update} />
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
              )
            )}
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) =>
                  Math.min(prev + 1, totalUpdatePages)
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

export default UpdatesSection;
