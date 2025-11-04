"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  labels: string[];
  data: number[];
}

export default function BarChart({ labels, data }: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: "সংস্কার সংখ্যা",
        data,
        borderRadius: 12,
        backgroundColor: "#9DBFF9",
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // important for parent div sizing
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        type: "linear", // explicitly define the scale
        beginAtZero: true,
        grid: { display: true },
      },
      x: {
        type: "category",
        grid: { display: false },
      },
    },
  } as const;

  return (
    <div className="w-full h-full bg-white rounded-3xl shadow-xl py-8 px-16 flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="text-lg font-semibold text-gray-800">
          অবস্থা দ্বারা সংস্কার
        </div>
        <div className="text-xs text-gray-500">2023-2024</div>
      </div>

      {/* Chart */}
      <div className="w-full h-full">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
