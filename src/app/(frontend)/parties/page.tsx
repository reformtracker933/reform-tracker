"use client";

import { useLocale } from "@/context/LocaleContext";
import { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import StatisticsSection from "@/components/screens/partiesSection/StatisticsSection";
import TableSection from "@/components/screens/partiesSection/TableSection";
import BarChartSection from "@/components/screens/partiesSection/BarChartSection";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
const doughnutData = [
  {
    id: 1,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [65, 35],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 45, rejected: 20 },
  },
  {
    id: 2,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 55, rejected: 15 },
  },
  {
    id: 3,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [65, 35],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 45, rejected: 20 },
  },
  {
    id: 4,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 55, rejected: 15 },
  },
  {
    id: 5,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [65, 35],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 45, rejected: 20 },
  },
  {
    id: 6,
    data: {
      labels: ["Completed", "Pending"],
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#4CAF50", "#FFA726"],
          borderWidth: 0,
        },
      ],
    },
    stats: { approved: 55, rejected: 15 },
  },
];

const barChartData = {
  labels: ["NCP", "NCP", "NCP", "NCP", "NCP", "NCP"],
  datasets: [
    {
      label: "Acceptable",
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: "#4a7ec9",
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      borderRadius: {
        topLeft: 10,
        topRight: 10,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: false,
    },
    {
      label: "Unacceptable",
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: "#e83231",
      barPercentage: 0.5,
      categoryPercentage: 0.5,
      borderRadius: {
        topLeft: 10,
        topRight: 10,
        bottomLeft: 0,
        bottomRight: 0,
      },
      borderSkipped: false,
    },
  ],
};

export default function PartiesPage() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("parties");

  const [currentDoughnutPage, setCurrentDoughnutPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWriter, setSelectedWriter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const itemsPerPage = 4;
  const totalDoughnuts = doughnutData.length;
  const totalPages = Math.ceil(totalDoughnuts / itemsPerPage);
  const visibleDoughnuts = doughnutData.slice(
    currentDoughnutPage * itemsPerPage,
    (currentDoughnutPage + 1) * itemsPerPage,
  );

  const handleNextDoughnuts = () => {
    if (currentDoughnutPage < totalPages - 1) {
      setCurrentDoughnutPage((prev) => prev + 1);
    }
  };

  const handlePrevDoughnuts = () => {
    if (currentDoughnutPage > 0) {
      setCurrentDoughnutPage((prev) => prev - 1);
    }
  };

  const tableData = Array(6)
    .fill(null)
    .map((_, i) => ({
      proposalName: pageText.educationReformLaw,
      commission: pageText.commissionEx,
      category: pageText.logisession,
      bnp: pageText.support,
      ncp: pageText.against,
      jamat: pageText.against,
      color:
        i % 3 === 0
          ? "var(--color-success)"
          : i % 3 === 1
            ? "var(--color-purple)"
            : "var(--color-primary-400)",
    }));

  return (
    <div className="w-full space-y-8 md:space-y-12 pt-24 md:pt-32 px-4 md:px-6 lg:px-8">
      <StatisticsSection
        doughnutData={doughnutData}
        visibleDoughnuts={visibleDoughnuts}
        currentDoughnutPage={currentDoughnutPage}
        totalPages={totalPages}
        pageText={pageText}
        handleNextDoughnuts={handleNextDoughnuts}
        handlePrevDoughnuts={handlePrevDoughnuts}
      />

      <TableSection
        pageText={pageText}
        tableData={tableData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedWriter={selectedWriter}
        setSelectedWriter={setSelectedWriter}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <BarChartSection barChartData={barChartData} pageText={pageText} />
    </div>
  );
}
