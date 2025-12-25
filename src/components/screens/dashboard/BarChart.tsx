'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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
  title: string;
  subtitle?: string;
}

export default function BarChart({
  labels,
  data,
  title,
  subtitle,
}: BarChartProps) {
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        borderRadius: 12,
        backgroundColor: '#81b5e9',
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        grid: { display: true },
      },
      x: {
        type: 'category' as const,
        grid: { display: false },
      },
    },
  };

  return (
    <div className='w-full h-full bg-white rounded-xl border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a] py-8 px-8 md:px-16 flex flex-col'>
      <div className='mb-4'>
        <div className='text-lg font-bold text-neutral-900'>{title}</div>
        {subtitle && (
          <div className='text-xs font-semibold text-neutral-700'>
            {subtitle}
          </div>
        )}
      </div>

      <div className='w-full h-full'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
