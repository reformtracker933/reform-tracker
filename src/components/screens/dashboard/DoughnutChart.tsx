"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  colors: string[];
  title: string;
}

export default function DoughnutChart({
  labels,
  data: chartData,
  colors,
  title,
}: DoughnutChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: chartData,
        borderWidth: 0,
        cutout: "65%",
        spacing: 4,
        hoverOffset: 4,
        backgroundColor: colors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  } as const;

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-xl p-4 flex flex-col items-center justify-around">
      <div className="text-center text-5xl font-semibold text-neutral-900">
        {title}
      </div>

      <div className="w-64 h-64 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>

      <div className="mt-4 w-full flex justify-center">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {labels.map((lab, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                style={{
                  width: 12,
                  height: 12,
                  background: colors[idx],
                  borderRadius: 6,
                }}
              />
              <span className="text-neutral-800">{lab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
