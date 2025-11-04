"use client";

import { Doughnut } from "react-chartjs-2";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { ChartData } from "chart.js";

interface DoughnutItem {
  id: string | number;
  data: ChartData<"doughnut">;
  stats: {
    approved: number;
    rejected: number;
  };
}

interface PageText {
  title: string;
  description: string;
  totalStatement: string;
  BNP: string;
  acceptance: string;
  rejected: string;
}

interface StatisticsSectionProps {
  doughnutData: DoughnutItem[];
  visibleDoughnuts: DoughnutItem[];
  currentDoughnutPage: number;
  totalPages: number;
  pageText: PageText;
  handleNextDoughnuts: () => void;
  handlePrevDoughnuts: () => void;
}

const StatisticsSection = ({
  visibleDoughnuts,
  currentDoughnutPage,
  totalPages,
  pageText,
  handleNextDoughnuts,
  handlePrevDoughnuts,
}: StatisticsSectionProps) => {
  return (
    <section className="w-full bg-white py-12 mt-8">
      <div className="w-2xl mx-auto flex flex-col items-center justify-center text-center mt-2">
        <h2 className="text-6xl font-bold text-primary/900 mb-4">
          {pageText.title}
        </h2>
        <p className="text-base text-primary/800 mb-8">
          {pageText.description}
        </p>
      </div>
      <div className="max-w-7xl mx-auto bg-primary-30 shadow-2xl rounded-3xl">
        <div className="px-8 py-4">
          <div className="flex flex-col gap-2 items-center justify-center mb-24 mt-2">
            <h3 className="text-4xl font-semibold text-neutral-900">
              {pageText.totalStatement}
            </h3>
            <span className="text-6xl font-bold text-primary/900">256</span>
          </div>

          <div className="relative">
            <div className="grid grid-cols-4 gap-6">
              {visibleDoughnuts.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-450 rounded-2xl shadow-xl p-4"
                >
                  <div className="relative mx-auto flex flex-col items-center justify-center">
                    <div className="w-25 h-25">
                      <Doughnut
                        data={{
                          labels: [],
                          datasets: [
                            {
                              data: item.data.datasets[0].data,
                              backgroundColor: ["#e83231", "#FFFFFF"],
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          cutout: "80%",
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                          },
                        }}
                      />
                    </div>
                    <span className="mt-2 font-medium">{pageText.BNP}</span>
                  </div>

                  <div className="md:flex items-center justify-center gap-2 mt-1 flex-wrap">
                    <div className="text-center flex items-center gap-2 border bg-primary/800 text-white font-medium px-4 py-1 rounded-full">
                      <span className="block text-sm font-semibold">
                        {item.stats.approved}
                      </span>
                      <span className="block text-sm">
                        {pageText.acceptance}
                      </span>
                    </div>
                    <div className="text-center flex items-center gap-2 border border-primary/800 font-medium px-4 py-1 rounded-full">
                      <span className="block text-sm font-semibold text-neutral-800">
                        {item.stats.rejected}
                      </span>
                      <span className="block text-sm text-neutral-800">
                        {pageText.rejected}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-4">
              <button
                onClick={handlePrevDoughnuts}
                disabled={currentDoughnutPage === 0}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <CircleArrowLeft className="h-8 w-8 text-primary/500 cursor-pointer" />
              </button>

              <div className="flex gap-2 items-center mx-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all duration-300 ease-in-out ${
                      index === currentDoughnutPage
                        ? "w-8 bg-primary rounded-full"
                        : "w-2 bg-gray-300 rounded-full"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextDoughnuts}
                disabled={currentDoughnutPage === totalPages - 1}
                className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
              >
                <CircleArrowRight className="h-8 w-8 text-primary/500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
