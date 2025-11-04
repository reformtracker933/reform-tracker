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
    <section className="w-full min-h-screen pt-24 md:pt-32 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary">
            {pageText.title}
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row items-start justify-center gap-4 md:gap-6 w-full">
          <div className="flex flex-col gap-4 md:gap-6 w-full lg:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full h-[164px]">
                <CardStat
                  icon={FileText}
                  title={pageText.totalProposal}
                  value={234}
                  delta={"12%"}
                />
              </div>
              <div className="w-full h-[164px]">
                <CardStat
                  icon={BarIcon}
                  title={pageText.totalCommission}
                  value={234}
                  delta={"12%"}
                />
              </div>
            </div>

            <div className="w-full h-[350px] md:h-[410px]">
              <BarChart labels={barLabels} data={barData} />
            </div>
          </div>

          <div className="w-full lg:w-[540px] h-[500px] md:h-[600px]">
            <DoughnutChart labels={doughLabels} />
          </div>
        </div>
      </div>
    </section>
  );
}
