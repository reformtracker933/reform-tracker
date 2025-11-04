"use client";

import { useState, useMemo } from "react";
// Presentation moved to components in '@/components/screens/newsSection'
import HeroSection from "@/components/screens/newsSection/HeroSection";
import NewsControls from "@/components/screens/newsSection/NewsControls";
import NewsGrid from "@/components/screens/newsSection/NewsGrid";
import UpdatesSection from "@/components/screens/newsSection/UpdatesSection";
import {
  categories,
  writers,
  newsData,
  updatesData,
  NewsCard,
  UpdateCard,
} from "@/data/sampleNewsData";
import { newsSectionBackgroundImage, rightSideCardPerson } from "@/assets";
import { useLocale } from "@/context/LocaleContext";

export default function NewsPage() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("reformNews");
  // States for news section
  const [newsSearchTerm, setNewsSearchTerm] = useState("");
  const [selectedNewsCategory, setSelectedNewsCategory] = useState("all");
  const [selectedWriter, setSelectedWriter] = useState("all");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentNewsPage, setCurrentNewsPage] = useState(1);

  // States for updates section
  const [updateSearchTerm, setUpdateSearchTerm] = useState("");
  const [selectedUpdateCategory, setSelectedUpdateCategory] = useState("all");
  const [selectedUpdateWriter, setSelectedUpdateWriter] = useState("all");
  const [currentUpdatePage, setCurrentUpdatePage] = useState(1);

  const updates = [
    {
      category: pageText.corruptionAgainst,
      title: pageText.navigationDescription,
      color: "var(--color-primary-400)",
      href: "/updates/education",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.navigationDescription,
      color: "var(--color-success)",
      href: "/updates/healthcare",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.navigationDescription,
      color: "var(--color-warning)",
      href: "/updates/economy",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.navigationDescription,
      color: "var(--color-secondary)",
      href: "/updates/technology",
    },
    {
      category: pageText.corruptionAgainst,
      title: pageText.navigationDescription,
      color: "var(--color-primary-400)",
      href: "/updates/education",
    },
  ];

  // Filter and paginate news
  const newsPerPage = 6;
  const filteredNewsItems = useMemo<NewsCard[]>(() => {
    let results = [...newsData];
    if (newsSearchTerm) {
      results = results.filter(
        (news) =>
          news.title.toLowerCase().includes(newsSearchTerm.toLowerCase()) ||
          news.description.toLowerCase().includes(newsSearchTerm.toLowerCase()),
      );
    }
    if (selectedNewsCategory !== "all") {
      results = results.filter(
        (news) =>
          news.category.toLowerCase() === selectedNewsCategory.toLowerCase(),
      );
    }
    if (selectedWriter !== "all") {
      results = results.filter(
        (news) => news.writer.toLowerCase() === selectedWriter.toLowerCase(),
      );
    }
    if (selectedTime) {
      results = results.filter((news) => news.date === selectedTime);
    }
    return results;
  }, [newsSearchTerm, selectedNewsCategory, selectedWriter, selectedTime]);

  const totalNewsPages = Math.ceil(filteredNewsItems.length / newsPerPage);
  // Ensure current page doesn't exceed total pages
  const safeCurrentNewsPage = Math.min(
    currentNewsPage,
    Math.max(1, totalNewsPages),
  );
  if (safeCurrentNewsPage !== currentNewsPage) {
    setCurrentNewsPage(safeCurrentNewsPage);
  }

  const currentNewsItems = useMemo<NewsCard[]>(
    () =>
      filteredNewsItems.slice(
        (safeCurrentNewsPage - 1) * newsPerPage,
        safeCurrentNewsPage * newsPerPage,
      ),
    [filteredNewsItems, safeCurrentNewsPage],
  );

  // Filter and paginate updates
  const updatesPerPage = 5;
  const filteredUpdateItems = useMemo<UpdateCard[]>(() => {
    let results = [...updatesData];
    if (updateSearchTerm) {
      results = results.filter((update) =>
        update.title.toLowerCase().includes(updateSearchTerm.toLowerCase()),
      );
    }
    if (selectedUpdateCategory !== "all") {
      results = results.filter(
        (update) =>
          update.category.toLowerCase() ===
          selectedUpdateCategory.toLowerCase(),
      );
    }
    return results;
  }, [updateSearchTerm, selectedUpdateCategory]);

  const totalUpdatePages = Math.ceil(
    filteredUpdateItems.length / updatesPerPage,
  );
  // Ensure current page doesn't exceed total pages
  const safeCurrentUpdatePage = Math.min(
    currentUpdatePage,
    Math.max(1, totalUpdatePages),
  );
  if (safeCurrentUpdatePage !== currentUpdatePage) {
    setCurrentUpdatePage(safeCurrentUpdatePage);
  }

  const currentUpdateItems = useMemo<UpdateCard[]>(
    () =>
      filteredUpdateItems.slice(
        (safeCurrentUpdatePage - 1) * updatesPerPage,
        safeCurrentUpdatePage * updatesPerPage,
      ),
    [filteredUpdateItems, safeCurrentUpdatePage],
  );

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
        currentUpdateItems={currentUpdateItems}
        totalUpdatePages={totalUpdatePages}
        currentUpdatePage={currentUpdatePage}
        setCurrentUpdatePage={setCurrentUpdatePage}
      />
    </>
  );
}
