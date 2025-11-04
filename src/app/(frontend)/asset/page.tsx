"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, Calendar, ChevronDown, Loader2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import Image from "next/image";
import { downloadFileIcon, fileDownloadLinkIcon } from "@/assets";

interface AssetFile {
  id: string;
  filename: string;
  category: string;
  publishedDate: string;
  commission: string;
  size: string;
  downloadUrl: string;
  color: string;
}

export default function AssetPage() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("resource");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const assetFiles = useMemo<AssetFile[]>(
    () => [
      {
        id: "1",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-success)",
      },
      {
        id: "2",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-warning)",
      },
      {
        id: "3",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-purple)",
      },
      {
        id: "4",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-primary-400)",
      },
      {
        id: "5",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-success)",
      },
      {
        id: "6",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-warning)",
      },
      {
        id: "7",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-purple)",
      },
      {
        id: "8",
        filename: pageText.fileName,
        category: pageText.categoryName,
        publishedDate: pageText.dummyDate,
        commission: pageText.commissionEx,
        size: "25MB",
        downloadUrl: "/files/reform-policy-2025.pdf",
        color: "var(--color-primary-400)",
      },
    ],
    [pageText],
  );

  const categories = [pageText.sector, pageText.categoryName];

  const filteredFiles = useMemo(() => {
    const sorted = [...assetFiles].sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
    let results = sorted;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      results = results.filter(
        (f) =>
          f.filename.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q),
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      results = results.filter(
        (f) => f.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    if (selectedDate) {
      results = results.filter((f) => f.publishedDate === selectedDate);
    }

    return results;
  }, [assetFiles, searchTerm, selectedCategory, selectedDate]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchTerm, selectedCategory, selectedDate]);

  return (
    <section className="min-h-screen w-full pt-24 md:pt-32 px-4">
      <div className="w-full">
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-white/60 flex items-center justify-center rounded-lg">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
        <div className="mb-6 md:mb-8 flex flex-col items-center justify-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary mb-3 md:mb-4 text-center px-4">
            {pageText.title}
          </h1>
          <p className="text-base md:text-xl lg:text-2xl font-semibold text-primary/800 max-w-3xl text-center px-4">
            {pageText.description}
          </p>
        </div>

        <div className="mx-auto max-w-4xl mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={pageText.searchBarPlaceHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 md:h-14 w-full pl-10 md:pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-neutral-900 text-sm md:text-base"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400" />
            </div>

            <div className="flex gap-3 md:gap-4">
              <div className="relative flex-1 md:w-34">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
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
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:w-34">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-12 md:h-14 w-full px-4 pr-10 rounded-full border border-neutral-400 bg-white text-neutral-600 text-center text-sm md:text-base"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 md:h-5 md:w-5 text-neutral-400 pointer-events-none" />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="h-12 md:h-14 px-6 md:px-8 rounded-full bg-secondary text-white font-semibold text-sm md:text-base hover:bg-secondary/90 transition-colors"
            >
              {pageText.searchBarPlaceHolder}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg md:rounded-4xl max-w-7xl mx-auto shadow-2xl">
          <table className="w-full bg-primary-30 min-w-[800px]">
            <thead className="bg-white">
              <tr className="h-16 md:h-19 text-primary font-semibold text-sm md:text-xl">
                <th className="pl-4 md:pl-8 py-3 md:py-4 first:rounded-tl-lg text-left font-semibold">
                  {pageText.file}
                </th>
                <th className="pl-8 md:pl-16 py-3 md:py-4 text-left font-semibold">
                  {pageText.category}
                </th>
                <th className="pl-4 md:pl-8 py-3 md:py-4 text-left font-semibold">
                  {pageText.publishedDate}
                </th>
                <th className="pl-3 md:pl-6 py-3 md:py-4 text-left font-semibold">
                  {pageText.commission}
                </th>
                <th className="px-2 md:px-4 py-3 md:py-4 text-left font-semibold">
                  {pageText.size}
                </th>
                <th className="px-2 md:px-4 pt-4 md:pt-6 last:rounded-tr-lg flex items-center justify-center">
                  <Image
                    src={downloadFileIcon}
                    alt=""
                    width={24}
                    height={24}
                    className="md:w-8 md:h-8"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className="border-b border-neutral-300 h-20 md:h-24 text-xs md:text-base"
                >
                  <td className="pl-4 md:pl-12 py-3 md:py-4 text-neutral-800 font-semibold text-sm md:text-xl">
                    {file.filename}
                  </td>
                  <td className="pl-4 md:pl-12 py-3 md:py-4">
                    <span
                      className="inline-flex items-center px-2 md:px-4 py-1 rounded-full font-medium text-white text-xs md:text-base"
                      style={{ backgroundColor: file.color }}
                    >
                      {file.category}
                    </span>
                  </td>
                  <td className="pl-4 md:pl-8 py-3 md:py-4 text-neutral-600">
                    {file.publishedDate}
                  </td>
                  <td className="px-2 md:px-4 py-3 md:py-4 text-neutral-600">
                    {file.commission}
                  </td>
                  <td className="pl-3 md:pl-6 py-3 md:py-4 text-neutral-600">
                    {file.size}
                  </td>
                  <td className="py-4 md:py-6 flex items-center justify-center">
                    <a
                      href={file.downloadUrl}
                      className="text-primary hover:text-primary-dark"
                      download
                    >
                      <Image
                        src={fileDownloadLinkIcon}
                        alt=""
                        height={32}
                        width={32}
                        className="md:w-10 md:h-10"
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
