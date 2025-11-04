"use client";

import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface PageText {
  thirdTitle: string;
  graphTitle: string;
  acceptance: string;
  rejectance: string;
}

interface BarChartSectionProps {
  barChartData: ChartData<"bar">;
  pageText: PageText;
}

const BarChartSection = ({ barChartData, pageText }: BarChartSectionProps) => {
  return (
    <section className="w-full bg-white py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="mx-auto text-3xl md:text-5xl lg:text-6xl font-bold text-primary/900 mb-6 md:mb-8 text-center">
          {pageText.thirdTitle}
        </h2>

        <div className="bg-white rounded-2xl md:rounded-4xl p-4 md:p-8 lg:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary/900">
                {pageText.graphTitle}
              </h3>
              <span className="text-xl md:text-2xl lg:text-3xl font-medium text-primary/500">
                2024 - 2025
              </span>
            </div>
            <div className="flex flex-row md:flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-secondary" />
                <span className="text-sm md:text-lg lg:text-2xl font-semibold text-primary/800">
                  {pageText.acceptance}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 md:h-3 md:w-3 rounded-full bg-primary/800" />
                <span className="text-sm md:text-lg lg:text-2xl font-semibold text-primary/800">
                  {pageText.rejectance}
                </span>
              </div>
            </div>
          </div>

          <div className="h-64 md:h-80 lg:h-69 mt-8 md:mt-12 lg:mt-16">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, grid: { display: true } },
                  x: { grid: { display: false }, ticks: { padding: 10 } },
                },
                plugins: { legend: { display: false } },
                elements: {
                  bar: {
                    borderRadius: {
                      topLeft: 10,
                      topRight: 10,
                      bottomLeft: 0,
                      bottomRight: 0,
                    },
                    borderSkipped: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BarChartSection;
