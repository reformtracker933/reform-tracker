"use client";
import CardStat from "@/components/screens/dashboard/CardStat";
import BarChart from "@/components/screens/dashboard/BarChart";
import DoughnutChart from "@/components/screens/dashboard/DoughnutChart";
import { FileText, BarChart as BarIcon } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";

export default function DashboardPage() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("dashboard");
  const barLabels = [
    pageText.running,
    pageText.completed,
    pageText.preplanned,
    pageText.expelled,
  ];
  const barData = [180, 130, 270, 90];
  const doughLabels = [
    pageText.antiCorruption,
    pageText.antiCorruption,
    pageText.antiCorruption,
    pageText.antiCorruption,
    pageText.antiCorruption,
    pageText.antiCorruption,
  ];

  return (
    <main className="w-full p-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-6xl font-bold text-primary">{pageText.title}</h1>
        </header>

        <div className="flex items-start justify-center gap-4 w-full">
          {/* Left Column */}
          <div className="flex flex-col gap-6 flex-1">
            {/* Cards Row */}
            <div className="flex items-center gap-4 w-full">
              <div className="w-[350px] h-[164px]">
                <CardStat
                  icon={FileText}
                  title={pageText.totalProposal}
                  value={234}
                  delta={"12%"}
                />
              </div>
              <div className="w-[350px] h-[164px]">
                <CardStat
                  icon={BarIcon}
                  title={pageText.totalCommission}
                  value={234}
                  delta={"12%"}
                />
              </div>
            </div>

            {/* Bar Chart */}
            <div className="w-[715px] h-[410px]">
              <BarChart labels={barLabels} data={barData} />
            </div>
          </div>

          {/* Doughnut Chart */}
          <div className="w-[540px] h-[600px]">
            <DoughnutChart labels={doughLabels} />
          </div>
        </div>
      </div>
    </main>
  );
}
