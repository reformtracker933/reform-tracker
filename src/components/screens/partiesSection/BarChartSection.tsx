'use client';

import { Bar } from 'react-chartjs-2';
import { ChartData } from 'chart.js';

interface PageText {
  thirdTitle: string;
  graphTitle: string;
  acceptance: string;
  rejectance: string;
}

interface BarChartSectionProps {
  barChartData: ChartData<'bar'>;
  pageText: PageText;
}

const BarChartSection = ({ barChartData, pageText }: BarChartSectionProps) => {
  return (
    <section className='w-full bg-neutral-100 py-6 md:py-8'>
      <div className='max-w-7xl mx-auto px-4'>
        <h2 className='mx-auto text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-6 md:mb-8 text-center'>
          {pageText.thirdTitle}
        </h2>

        <div className='bg-white rounded-xl border-2 border-neutral-900 p-4 md:p-8 lg:p-12 shadow-[6px_6px_0px_#1a1a1a]'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8'>
            <div>
              <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900'>
                {pageText.graphTitle}
              </h3>
              <span className='text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-700'>
                2024 - 2025
              </span>
            </div>
            <div className='flex flex-row md:flex-col items-start gap-3'>
              <div className='flex items-center gap-2 px-3 py-1 bg-secondary rounded-lg border-2 border-neutral-900'>
                <div className='h-3 w-3 md:h-4 md:w-4 rounded-sm bg-white border border-neutral-900' />
                <span className='text-sm md:text-lg font-bold text-white'>
                  {pageText.acceptance}
                </span>
              </div>
              <div className='flex items-center gap-2 px-3 py-1 bg-primary rounded-lg border-2 border-neutral-900'>
                <div className='h-3 w-3 md:h-4 md:w-4 rounded-sm bg-white border border-neutral-900' />
                <span className='text-sm md:text-lg font-bold text-white'>
                  {pageText.rejectance}
                </span>
              </div>
            </div>
          </div>

          <div className='h-64 md:h-80 lg:h-69 mt-8 md:mt-12 lg:mt-16'>
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
                      topLeft: 4,
                      topRight: 4,
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
