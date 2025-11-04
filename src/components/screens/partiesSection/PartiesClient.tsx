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
import { PoliticalParty, Proposal } from "@/types/sanity";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface PartiesClientProps {
  parties: PoliticalParty[];
  proposals: Proposal[];
}

export default function PartiesClient({
  parties,
  proposals,
}: PartiesClientProps) {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("parties");

  const [currentDoughnutPage, setCurrentDoughnutPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWriter, setSelectedWriter] = useState("all");
  const [selectedDate, setSelectedDate] = useState("");

  const defaultDoughnutData = [
    {
      id: "1",
      name: pageText.BNP,
      data: {
        labels: ["Running", "Completed"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#FFA726", "#4CAF50"],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: "2",
      name: pageText.NCP,
      data: {
        labels: ["Running", "Completed"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#FFA726", "#4CAF50"],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: "3",
      name: "Jamat",
      data: {
        labels: ["Running", "Completed"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#FFA726", "#4CAF50"],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
    {
      id: "4",
      name: "Party 4",
      data: {
        labels: ["Running", "Completed"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#FFA726", "#4CAF50"],
            borderWidth: 0,
          },
        ],
      },
      stats: { approved: 0, rejected: 0 },
    },
  ];

  const doughnutData =
    parties.length > 0
      ? parties.map((party) => {
          const completedCount = Math.round(
            ((party.statistics?.totalStatements || 0) *
              (party.statistics?.completionPercentage || 0)) /
              100,
          );
          const pendingCount = Math.round(
            ((party.statistics?.totalStatements || 0) *
              (party.statistics?.pendingPercentage || 0)) /
              100,
          );
          const approvedCount = party.statistics?.approved || 0;
          const rejectedCount = party.statistics?.rejected || 0;

          return {
            id: party._id,
            name: party.name,
            data: {
              labels: ["Running", "Completed"],
              datasets: [
                {
                  data: [pendingCount, completedCount],
                  backgroundColor: ["#FFA726", "#4CAF50"],
                  borderWidth: 0,
                },
              ],
            },
            stats: { approved: approvedCount, rejected: rejectedCount },
          };
        })
      : defaultDoughnutData;

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

  const defaultTableData = Array(6)
    .fill(null)
    .map((_, i) => ({
      proposalName: pageText.educationReformLaw,
      commission: pageText.commissionEx,
      category: pageText.logisession,
      color:
        i % 3 === 0
          ? "var(--color-success)"
          : i % 3 === 1
            ? "var(--color-purple)"
            : "var(--color-primary-400)",
      bnp: "-",
      ncp: "-",
      jamat: "-",
    }));

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch = searchTerm
      ? proposal.title.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesCategory =
      selectedCategory !== "all"
        ? proposal.category?._id === selectedCategory
        : true;
    const matchesWriter =
      selectedWriter !== "all"
        ? proposal.commission?._id === selectedWriter
        : true;
    const matchesDate = selectedDate
      ? new Date(proposal.publishedDate).toISOString().split("T")[0] ===
        selectedDate
      : true;

    return matchesSearch && matchesCategory && matchesWriter && matchesDate;
  });

  const tableData =
    proposals.length > 0
      ? filteredProposals.map((proposal) => {
          const partyPositions: Record<string, string> = {};

          proposal.partyPositions?.forEach((position) => {
            const partyKey = position.party.name
              .toLowerCase()
              .replace(/\s+/g, "");
            const stanceMap: Record<string, string> = {
              support: pageText.support,
              against: pageText.against,
              neutral: "-",
            };
            partyPositions[partyKey] =
              stanceMap[position.stance] || position.stance;
          });

          return {
            proposalName: proposal.title,
            commission: proposal.commission?.name || "",
            category: proposal.category?.title || "",
            color: proposal.category?.color || "var(--color-primary-400)",
            bnp: partyPositions.bnp || "-",
            ncp: partyPositions.ncp || "-",
            jamat: partyPositions.jamat || "-",
          };
        })
      : defaultTableData;

  const defaultBarChartLabels = [
    pageText.BNP,
    pageText.NCP,
    pageText.Jamat,
    "Party 4",
    "Party 5",
    "Party 6",
  ];

  const barChartData = {
    labels:
      parties.length > 0
        ? parties.map((party) => party.name).slice(0, 6)
        : defaultBarChartLabels,
    datasets: [
      {
        label: pageText.acceptable,
        data:
          parties.length > 0
            ? parties
                .map((party) => party.statistics?.approved || 0)
                .slice(0, 6)
            : [0, 0, 0, 0, 0, 0],
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
        label: pageText.unacceptable,
        data:
          parties.length > 0
            ? parties
                .map((party) => party.statistics?.rejected || 0)
                .slice(0, 6)
            : [0, 0, 0, 0, 0, 0],
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
