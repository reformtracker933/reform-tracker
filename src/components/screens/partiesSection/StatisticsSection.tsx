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
    <section className="w-full bg-white py-8 md:py-12 pt-0 md:pt-0">
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-2 px-4">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary/900 mb-3 md:mb-4">
          {pageText.title}
        </h2>
        <p className="text-sm md:text-base text-primary/800 mb-6 md:mb-8">
          {pageText.description}
        </p>
      </div>
      <div className="max-w-7xl mx-auto bg-primary-30 shadow-2xl rounded-2xl md:rounded-3xl px-4">
        <div className="py-4 md:py-6 lg:py-8">
          <div className="flex flex-col gap-2 items-center justify-center mb-12 md:mb-24 mt-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-neutral-900">
              {pageText.totalStatement}
            </h3>
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary/900">
              256
            </span>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {visibleDoughnuts.map((item) => (
                <div
                  key={item.id}
                  className="bg-neutral-450 rounded-xl md:rounded-2xl shadow-xl p-3 md:p-4"
                >
                  <div className="relative mx-auto flex flex-col items-center justify-center">
                    <div className="w-20 h-20 md:w-25 md:h-25">
                      <Doughnut
                        data={{
                          labels: [],
                          datasets: [
                            {
                              data: item.data.datasets[0].data,
                              backgroundColor: ["#e83231", "#ffffff"],
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
                    <span className="mt-2 font-medium text-sm md:text-base">
                      {pageText.BNP}
                    </span>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 mt-2 md:mt-1">
                    <div className="text-center flex items-center gap-1 md:gap-2 border bg-primary/800 text-white font-medium px-2 md:px-4 py-1 rounded-full text-xs md:text-sm">
                      <span className="block font-semibold">
                        {item.stats.approved}
                      </span>
                      <span className="block">{pageText.acceptance}</span>
                    </div>
                    <div className="text-center flex items-center gap-1 md:gap-2 border border-primary/800 font-medium px-2 md:px-4 py-1 rounded-full text-xs md:text-sm">
                      <span className="block font-semibold text-neutral-800">
                        {item.stats.rejected}
                      </span>
                      <span className="block text-neutral-800">
                        {pageText.rejected}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 md:mt-4">
              <button
                onClick={handlePrevDoughnuts}
                disabled={currentDoughnutPage === 0}
                className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50"
              >
                <CircleArrowLeft className="h-6 w-6 md:h-8 md:w-8 text-primary/500 cursor-pointer" />
              </button>

              <div className="flex gap-2 items-center mx-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 transition-all duration-300 ease-in-out ${
                      index === currentDoughnutPage
                        ? "w-6 md:w-8 bg-primary rounded-full"
                        : "w-2 bg-neutral-300 rounded-full"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextDoughnuts}
                disabled={currentDoughnutPage === totalPages - 1}
                className="p-2 rounded-full hover:bg-neutral-100 disabled:opacity-50"
              >
                <CircleArrowRight className="h-6 w-6 md:h-8 md:w-8 text-primary/500 cursor-pointer" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
