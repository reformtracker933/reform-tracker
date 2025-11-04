"use client";

import CardStat from "@/components/screens/dashboard/CardStat";
import BarChart from "@/components/screens/dashboard/BarChart";
import DoughnutChart from "@/components/screens/dashboard/DoughnutChart";
import { FileText, BarChart as BarIcon } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { DashboardStats } from "@/types/sanity";

interface DashboardClientProps {
  stats: DashboardStats | null;
}

export default function DashboardClient({ stats }: DashboardClientProps) {
  const { getTranslation, locale } = useLocale();
  const pageText = getTranslation("dashboard");

  const defaultBarLabels = [
    pageText.running,
    pageText.completed,
    pageText.preplanned,
    pageText.expelled,
  ];
  const defaultBarData = [0, 0, 0, 0];

  const defaultDoughLabels = [
    pageText.antiCorruption,
    pageText.reformUsingSector,
  ];

  const barLabels =
    stats?.statusBreakdown?.map((item) =>
      locale === "bn" ? item.label_bn : item.label_en,
    ) || defaultBarLabels;

  const barData =
    stats?.statusBreakdown?.map((item) => item.count) || defaultBarData;

  const doughLabels =
    stats?.sectorBreakdown?.map((item) =>
      locale === "bn" ? item.sectorName_bn : item.sectorName_en,
    ) || defaultDoughLabels;

  return (
    <section className="w-full min-h-screen pt-24 md:pt-32 px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12">
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
                  value={stats?.totalProposals || 0}
                  delta={stats?.proposalsDelta || "+0%"}
                />
              </div>
              <div className="w-full h-[164px]">
                <CardStat
                  icon={BarIcon}
                  title={pageText.totalCommission}
                  value={stats?.totalCommissions || 0}
                  delta={stats?.commissionsDelta || "+0%"}
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
