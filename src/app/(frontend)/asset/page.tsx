"use client";

import { useState, useEffect, useRef } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredFiles, setFilteredFiles] = useState<AssetFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const { getTranslation } = useLocale();
  const pageText = getTranslation("resource");

  // Sample data - replace with actual data from your backend
  const assetFiles: AssetFile[] = [
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
  ];

  const categories = [pageText.sector, pageText.categoryName];

  const handleSearch = () => {
    setIsLoading(true);
    performFilter();
    // small UX delay
    setTimeout(() => setIsLoading(false), 300);
  };

  const performFilter = () => {
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

    setFilteredFiles(results);
  };

  // Debounced filtering when typing or changing filters
  useEffect(() => {
    setIsLoading(true);
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      performFilter();
      setIsLoading(false);
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategory, selectedDate]);

  // initialize filtered files on mount
  useEffect(() => {
    performFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-[90vh] w-full bg-background flex flex-col items-center justify-center mt-24">
      <div className="w-full">
        {isLoading && (
          <div className="absolute inset-0 z-40 bg-white/60 flex items-center justify-center rounded-lg">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}
        {/* Title and Description */}
        <div className="mb-8 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold text-primary mb-4">
            {pageText.title}
          </h1>
          <p className="text-2xl font-semibold text-primary/800 w-md text-center">
            {pageText.description}
          </p>
        </div>

        {/* Search Controls: centered container with max width (~835px -> using max-w-4xl) and fixed height (56px -> h-14) */}
        <div className="mx-auto max-w-4xl h-14 mb-8">
          <div className="flex items-center justify-center h-full gap-2">
            {/* Search Input */}
            <div className="relative w-90 text-xl">
              <input
                type="text"
                placeholder={"   " + pageText.searchBarPlaceHolder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 w-full pl-12 pr-4 rounded-full border border-neutral-400 bg-white text-gray-900"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-neutral-400" />
            </div>

            {/* Category Select */}
            <div className="w-34 relative flex items-center text-base">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown className="right-4 absolute text-neutral-800 pointer-events-none" />
            </div>

            {/* Date Select */}
            <div className="relative w-34 text-base">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-14 w-full px-4 pr-10 rounded-full border border-neutral-400 bg-white  text-neutral-600"
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Search Button */}
            <div className="w-44 text-white text-xl">
              <button
                onClick={handleSearch}
                className="h-14 w-full rounded-full bg-secondary"
              >
                {pageText.searchBarPlaceHolder}
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-4xl max-w-7xl mx-auto shadow-2xl">
          <table className="w-full bg-primary-30">
            <thead className="bg-white">
              <tr className="h-19 text-primary font-semibold text-xl">
                <th className="pl-8 py-4 first:rounded-tl-lg text-left font-semibold">
                  {pageText.file}
                </th>
                <th className="pl-16 py-4 text-left font-semibold">
                  {pageText.category}
                </th>
                <th className="pl-8 py-4 text-left font-semibold">
                  {pageText.publishedDate}
                </th>
                <th className="pl-6 py-4 text-left font-semibold">
                  {pageText.commission}
                </th>
                <th className="px-4 py-4 text-left font-semibold">
                  {pageText.size}
                </th>
                <th className="px-4 pt-6 last:rounded-tr-lg flex items-center justify-center">
                  <Image src={downloadFileIcon} alt="" width={32} height={32} />
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.map((file) => (
                <tr
                  key={file.id}
                  className="border-b border-neutral-300 h-24 text-base"
                >
                  <td className="pl-12 py-4 text-neutral-800 font-semibold text-xl">
                    {file.filename}
                  </td>
                  <td className="pl-12 py-4">
                    <span
                      className="inline-flex items-center px-4 py-1 rounded-full font-medium text-white"
                      style={{ backgroundColor: file.color }}
                    >
                      {file.category}
                    </span>
                  </td>
                  <td className="pl-8 py-4 text-neutral-600">
                    {file.publishedDate}
                  </td>
                  <td className="px-4 py-4 text-neutral-600">
                    {file.commission}
                  </td>
                  <td className="pl-6 py-4 text-neutral-600">{file.size}</td>
                  <td className="py-6 flex items-center justify-center">
                    <a
                      href={file.downloadUrl}
                      className="text-primary hover:text-primary-dark"
                      download
                    >
                      <Image
                        src={fileDownloadLinkIcon}
                        alt=""
                        height={40}
                        width={40}
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
