"use client";

import { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import Image from "next/image";
import { downloadFileIcon, fileDownloadLinkIcon } from "@/assets";
import { Resource } from "@/types/sanity";
import { getColorWithFallback } from "@/lib/utils/colorMapper";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/lib/utils/dateFormatter";

interface AssetClientProps {
  resources?: Resource[];
}

export default function AssetClient({
  resources: initialResources,
}: AssetClientProps) {
  const { getTranslation, locale } = useLocale();
  const pageText = getTranslation("resource");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCommission, setSelectedCommission] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resources, setResources] = useState<Resource[]>(
    initialResources || [],
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [commissions, setCommissions] = useState<
    { id: string; name: string }[]
  >([]);

  const debouncedSearch = useDebounce(searchTerm, 500);

  // Fetch all categories and commissions from Sanity
  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        const [categoriesRes, commissionsRes] = await Promise.all([
          fetch("/api/taxonomies?type=categories"),
          fetch("/api/taxonomies?type=commissions"),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.items || []);
        }

        if (commissionsRes.ok) {
          const commissionsData = await commissionsRes.json();
          setCommissions(commissionsData.items || []);
        }
      } catch (error) {
        console.error("Error fetching taxonomies:", error);
      }
    };

    fetchTaxonomies();
  }, []);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: "10",
          language: locale,
        });

        if (debouncedSearch) {
          params.append("search", debouncedSearch);
        }
        if (selectedCategory !== "all") {
          params.append("category", selectedCategory);
        }
        if (selectedCommission !== "all") {
          params.append("commission", selectedCommission);
        }
        if (selectedDate) {
          params.append("date", selectedDate);
        }

        const response = await fetch(`/api/resources?${params.toString()}`);
        const data = await response.json();

        setResources(data.items);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [
    currentPage,
    debouncedSearch,
    selectedCategory,
    selectedCommission,
    selectedDate,
    locale,
  ]);

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "N/A";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)}MB`;
  };

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

            <div className="flex gap-3 md:gap-4 flex-wrap md:flex-nowrap">
              <div className="relative flex-1 md:w-40">
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
                >
                  <option value="all">{pageText.sector}</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:w-40">
                <select
                  value={selectedCommission}
                  onChange={(e) => {
                    setSelectedCommission(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none text-center h-12 md:h-14 rounded-full border border-neutral-400 bg-white text-neutral-600 w-full text-sm md:text-base pr-8"
                >
                  <option value="all">{pageText.commission}</option>
                  {commissions.map((commission) => (
                    <option key={commission.id} value={commission.name}>
                      {commission.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
              </div>

              <div className="relative flex-1 md:w-40">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => {
                    setSelectedDate(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="h-12 md:h-14 w-full px-4 rounded-full border border-neutral-400 bg-white text-neutral-600 text-center text-sm md:text-base [&::-webkit-calendar-picker-indicator]:opacity-100"
                />
              </div>
            </div>
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
              {resources.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-neutral-600">
                    {pageText.noResourcesFound}
                  </td>
                </tr>
              ) : (
                resources.map((file, index) => (
                  <tr
                    key={file._id}
                    className="border-b border-neutral-300 h-20 md:h-24 text-xs md:text-base"
                  >
                    <td className="pl-4 md:pl-12 py-3 md:py-4 text-neutral-800 font-semibold text-sm md:text-xl">
                      {file.title}
                    </td>
                    <td className="pl-4 md:pl-12 py-3 md:py-4">
                      <span
                        className="inline-flex items-center px-2 md:px-4 py-1 rounded-full font-medium text-white text-xs md:text-base"
                        style={{
                          backgroundColor: getColorWithFallback(
                            file.category?.color,
                            file.color,
                            index,
                          ),
                        }}
                      >
                        {file.category?.title}
                      </span>
                    </td>
                    <td className="pl-4 md:pl-8 py-3 md:py-4 text-neutral-600">
                      {formatDate(file.publishedDate, locale)}
                    </td>
                    <td className="px-2 md:px-4 py-3 md:py-4 text-neutral-600">
                      {file.commission?.name}
                    </td>
                    <td className="pl-3 md:pl-6 py-3 md:py-4 text-neutral-600">
                      {file.fileSize || formatFileSize(file.file?.size || 0)}
                    </td>
                    <td className="py-4 md:py-6 flex items-center justify-center">
                      <a
                        href={file.file?.url}
                        className="text-primary hover:text-primary-dark"
                        download={file.file?.originalFilename}
                        target="_blank"
                        rel="noopener noreferrer"
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg bg-primary text-white disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-neutral-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg bg-primary text-white disabled:bg-neutral-300 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
