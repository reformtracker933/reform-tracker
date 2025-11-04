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
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="mx-auto text-6xl font-bold text-primary/900 mb-8 w-md text-center">
          {pageText.thirdTitle}
        </h2>

        <div className="bg-white rounded-4xl p-12 shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-4xl font-semibold text-primary/900">
                {pageText.graphTitle}
              </h3>
              <span className="text-3xl font-medium text-primary/500">
                2024 - 2025
              </span>
            </div>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-secondary" />
                <span className="text-2xl font-semibold text-primary/800">
                  {pageText.acceptance}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary/800" />
                <span className="text-2xl font-semibold text-primary/800">
                  {pageText.rejectance}
                </span>
              </div>
            </div>
          </div>

          <div className="h-69 mt-16">
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
