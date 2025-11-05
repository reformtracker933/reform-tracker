"use client";

import { useState, useMemo } from "react";
import HeroSection from "./HeroSection";
import NewsControls from "./NewsControls";
import NewsGrid from "./NewsGrid";
import UpdatesSection from "./UpdatesSection";
import { NewsArticle, ReformUpdate } from "@/types/sanity";
import { newsSectionBackgroundImage, rightSideCardPerson } from "@/assets";
import { useLocale } from "@/context/LocaleContext";
import { getColorWithFallback } from "@/lib/utils/colorMapper";

interface NewsClientProps {
  allNews: NewsArticle[];
  recentUpdates: ReformUpdate[];
}

export default function NewsClient({
  allNews,
  recentUpdates,
}: NewsClientProps) {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("reformNews");

  const [newsSearchTerm, setNewsSearchTerm] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("all");
  const [selectedWriter, setSelectedWriter] = useState("all");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentNewsPage, setCurrentNewsPage] = useState(1);

  const [updateSearchTerm, setUpdateSearchTerm] = useState("");
  const [selectedUpdateCategory, setSelectedUpdateCategory] = useState("all");
  const [selectedUpdateWriter, setSelectedUpdateWriter] = useState("all");
  const [currentUpdatePage, setCurrentUpdatePage] = useState(1);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      allNews.map((news) => news.category?.title).filter(Boolean),
    );
    return [pageText.sector, ...Array.from(uniqueCategories)];
  }, [allNews, pageText.sector]);

  const writers = useMemo(() => {
    const uniqueWriters = new Set(
      allNews.map((news) => news.author?.name).filter(Boolean),
    );
    return [pageText.writer, ...Array.from(uniqueWriters)];
  }, [allNews, pageText.writer]);

  const newsPerPage = 6;
  const filteredNewsItems = useMemo(() => {
    let results = [...allNews];

    if (newsSearchTerm) {
      results = results.filter(
        (news) =>
          news.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) ||
          news.excerpt.toLowerCase().includes(newsSearchTerm.toLowerCase()),
      );
    }

    if (
      selectedNewsCategory !== "all" &&
      selectedNewsCategory !== pageText.sector
    ) {
      results = results.filter(
        (news) =>
          news.category?.title.toLowerCase() ===
          selectedNewsCategory.toLowerCase(),
      );
    }

    if (selectedWriter !== "all" && selectedWriter !== pageText.writer) {
      results = results.filter(
        (news) =>
          news.author?.name.toLowerCase() === selectedWriter.toLowerCase(),
      );
    }

    if (selectedTime) {
      results = results.filter(
        (news) =>
          new Date(news.publishedDate).toISOString().split("T")[0] ===
          selectedTime,
      );
    }

    return results;
  }, [
    allNews,
    newsSearchTerm,
    selectedNewsCategory,
    selectedWriter,
    selectedTime,
    pageText.sector,
    pageText.writer,
  ]);

  const totalNewsPages = Math.ceil(filteredNewsItems.length / newsPerPage);
  const safeCurrentNewsPage = Math.min(
    currentNewsPage,
    Math.max(1, totalNewsPages),
  );

  if (safeCurrentNewsPage !== currentNewsPage) {
    setCurrentNewsPage(safeCurrentNewsPage);
  }

  const currentNewsItems = useMemo(
    () =>
      filteredNewsItems.slice(
        (safeCurrentNewsPage - 1) * newsPerPage,
        safeCurrentNewsPage * newsPerPage,
      ),
    [filteredNewsItems, safeCurrentNewsPage],
  );

  const updatesPerPage = 5;
  const filteredUpdateItems = useMemo(() => {
    let results = [...recentUpdates];

    if (updateSearchTerm) {
      results = results.filter((update) =>
        update.title.toLowerCase().includes(updateSearchTerm.toLowerCase()),
      );
    }

    if (
      selectedUpdateCategory !== "all" &&
      selectedUpdateCategory !== pageText.sector
    ) {
      results = results.filter(
        (update) =>
          update.category?.title.toLowerCase() ===
          selectedUpdateCategory.toLowerCase(),
      );
    }

    return results;
  }, [
    recentUpdates,
    updateSearchTerm,
    selectedUpdateCategory,
    pageText.sector,
  ]);

  const totalUpdatePages = Math.ceil(
    filteredUpdateItems.length / updatesPerPage,
  );
  const safeCurrentUpdatePage = Math.min(
    currentUpdatePage,
    Math.max(1, totalUpdatePages),
  );

  if (safeCurrentUpdatePage !== currentUpdatePage) {
    setCurrentUpdatePage(safeCurrentUpdatePage);
  }

  const currentUpdateItems = useMemo(
    () =>
      filteredUpdateItems.slice(
        (safeCurrentUpdatePage - 1) * updatesPerPage,
        safeCurrentUpdatePage * updatesPerPage,
      ),
    [filteredUpdateItems, safeCurrentUpdatePage],
  );

  const updates = currentUpdateItems.map((update, index) => ({
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
        currentNewsItems={currentNewsItems}
        totalNewsPages={totalNewsPages}
        currentNewsPage={currentNewsPage}
        setCurrentNewsPage={setCurrentNewsPage}
        rightSideCardPerson={rightSideCardPerson}
      />

      <UpdatesSection
        pageText={pageText}
        updateSearchTerm={updateSearchTerm}
        setUpdateSearchTerm={setUpdateSearchTerm}
        selectedUpdateCategory={selectedUpdateCategory}
        setSelectedUpdateCategory={setSelectedUpdateCategory}
        selectedUpdateWriter={selectedUpdateWriter}
        setSelectedUpdateWriter={setSelectedUpdateWriter}
        categories={categories}
        writers={writers}
        updates={updates}
        currentUpdateItems={[]}
        totalUpdatePages={totalUpdatePages}
        currentUpdatePage={currentUpdatePage}
        setCurrentUpdatePage={setCurrentUpdatePage}
      />
    </>
  );
}
