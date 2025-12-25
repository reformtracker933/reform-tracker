'use client';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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
        cutout: '65%',
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
    <div className='w-full h-full bg-white rounded-xl border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a] p-4 flex flex-col items-center justify-around'>
      <div className='text-center text-4xl md:text-5xl font-black text-neutral-900'>
        {title}
      </div>

      <div className='w-64 h-64 flex items-center justify-center'>
        <Doughnut data={data} options={options} />
      </div>

      <div className='mt-4 w-full flex justify-center'>
        <div className='grid grid-cols-2 gap-2 text-sm'>
          {labels.map((lab, idx) => (
            <div
              key={idx}
              className='flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg border-2 border-neutral-900'
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  background: colors[idx],
                }}
                className='rounded-sm border border-neutral-900'
              />
              <span className='text-neutral-900 font-semibold'>{lab}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
