"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import NewsControls from "./NewsControls";
import NewsGrid from "./NewsGrid";
import UpdatesSection from "./UpdatesSection";
import { NewsArticle, ReformUpdate } from "@/types/sanity";
import { newsSectionBackgroundImage, rightSideCardPerson } from "@/assets";
import { useLocale } from "@/context/LocaleContext";
import { getColorWithFallback } from "@/lib/utils/colorMapper";
import { useDebounce } from "@/hooks/useDebounce";

export default function NewsClient() {
  const { getTranslation, locale } = useLocale();
  const pageText = getTranslation("reformNews");

  // News state
  const [newsSearchTerm, setNewsSearchTerm] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("all");
  const [selectedWriter, setSelectedWriter] = useState("all");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentNewsPage, setCurrentNewsPage] = useState(1);
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [totalNewsPages, setTotalNewsPages] = useState(1);
  const [isLoadingNews, setIsLoadingNews] = useState(false);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [writers, setWriters] = useState<{ id: string; name: string }[]>([]);

  // Updates state
  const [updateSearchTerm, setUpdateSearchTerm] = useState("");
  const [selectedUpdateCategory, setSelectedUpdateCategory] = useState("all");
  const [selectedUpdateDate, setSelectedUpdateDate] = useState("");
  const [currentUpdatePage, setCurrentUpdatePage] = useState(1);
  const [updatesData, setUpdatesData] = useState<ReformUpdate[]>([]);
  const [totalUpdatesPages, setTotalUpdatesPages] = useState(1);
  const [isLoadingUpdates, setIsLoadingUpdates] = useState(false);

  // Debounce search terms
  const debouncedNewsSearch = useDebounce(newsSearchTerm, 500);
  const debouncedUpdateSearch = useDebounce(updateSearchTerm, 500);

  // Fetch all categories and authors from Sanity
  useEffect(() => {
    const fetchTaxonomies = async () => {
      try {
        const [categoriesRes, authorsRes] = await Promise.all([
          fetch("/api/taxonomies?type=categories"),
          fetch("/api/taxonomies?type=authors"),
        ]);

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.items || []);
        }

        if (authorsRes.ok) {
          const authorsData = await authorsRes.json();
          setWriters(authorsData.items || []);
        }
      } catch (error) {
        console.error("Error fetching taxonomies:", error);
      }
    };

    fetchTaxonomies();
  }, []);

  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoadingNews(true);
      try {
        const params = new URLSearchParams({
          page: currentNewsPage.toString(),
          limit: "6",
          language: locale,
        });

        if (debouncedNewsSearch) {
          params.append("search", debouncedNewsSearch);
        }
        if (
          selectedNewsCategory !== "all" &&
          selectedNewsCategory !== pageText.sector
        ) {
          params.append("category", selectedNewsCategory);
        }
        if (selectedWriter !== "all" && selectedWriter !== pageText.writer) {
          params.append("author", selectedWriter);
        }
        if (selectedTime) {
          params.append("date", selectedTime);
        }

        const response = await fetch(`/api/news?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        setNewsData(data.items);
        setTotalNewsPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, [
    currentNewsPage,
    debouncedNewsSearch,
    selectedNewsCategory,
    selectedWriter,
    selectedTime,
    locale,
    pageText.sector,
    pageText.writer,
  ]);

  // Fetch reform updates from API
  useEffect(() => {
    const fetchUpdates = async () => {
      setIsLoadingUpdates(true);
      try {
        const params = new URLSearchParams({
          page: currentUpdatePage.toString(),
          limit: "5",
          language: locale,
        });

        if (debouncedUpdateSearch) {
          params.append("search", debouncedUpdateSearch);
        }
        if (
          selectedUpdateCategory !== "all" &&
          selectedUpdateCategory !== pageText.sector
        ) {
          params.append("category", selectedUpdateCategory);
        }
        if (selectedUpdateDate) {
          params.append("date", selectedUpdateDate);
        }

        const response = await fetch(
          `/api/reform-updates?${params.toString()}`,
        );
        if (!response.ok) throw new Error("Failed to fetch updates");

        const data = await response.json();
        setUpdatesData(data.items);
        setTotalUpdatesPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching updates:", error);
      } finally {
        setIsLoadingUpdates(false);
      }
    };

    fetchUpdates();
  }, [
    currentUpdatePage,
    debouncedUpdateSearch,
    selectedUpdateCategory,
    selectedUpdateDate,
    locale,
    pageText.sector,
  ]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentNewsPage(1);
  }, [debouncedNewsSearch, selectedNewsCategory, selectedWriter, selectedTime]);

  useEffect(() => {
    setCurrentUpdatePage(1);
  }, [debouncedUpdateSearch, selectedUpdateCategory, selectedUpdateDate]);

  const updates = updatesData.map((update, index) => ({
    category: update.category?.title || pageText.corruptionAgainst,
    title: update.title,
    color: getColorWithFallback(update.color, update.category?.color, index),
    href: `/news/${update.slug?.current || ""}`,
  }));

  return (
    <>
      <HeroSection
        pageText={pageText}
        background={newsSectionBackgroundImage}
      />

      <NewsControls
        pageText={pageText}
        newsSearchTerm={newsSearchTerm}
        setNewsSearchTerm={setNewsSearchTerm}
        selectedNewsCategory={selectedNewsCategory}
        setSelectedNewsCategory={setSelectedNewsCategory}
        selectedWriter={selectedWriter}
        setSelectedWriter={setSelectedWriter}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        categories={categories}
        writers={writers}
      />

      <NewsGrid
        pageText={pageText}
        currentNewsItems={newsData}
        totalNewsPages={totalNewsPages}
        currentNewsPage={currentNewsPage}
        setCurrentNewsPage={setCurrentNewsPage}
        rightSideCardPerson={rightSideCardPerson}
        isLoading={isLoadingNews}
      />

      <UpdatesSection
        pageText={pageText}
        updateSearchTerm={updateSearchTerm}
        setUpdateSearchTerm={setUpdateSearchTerm}
        selectedUpdateCategory={selectedUpdateCategory}
        setSelectedUpdateCategory={setSelectedUpdateCategory}
        selectedUpdateDate={selectedUpdateDate}
        setSelectedUpdateDate={setSelectedUpdateDate}
        categories={categories}
        updates={updates}
        currentUpdateItems={[]}
        totalUpdatePages={totalUpdatesPages}
        currentUpdatePage={currentUpdatePage}
        setCurrentUpdatePage={setCurrentUpdatePage}
        isLoading={isLoadingUpdates}
      />
    </>
  );
}
