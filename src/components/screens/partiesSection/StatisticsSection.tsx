'use client';

import { Doughnut } from 'react-chartjs-2';
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react';
import { ChartData } from 'chart.js';

interface DoughnutItem {
  id: string | number;
  name: string;
  data: ChartData<'doughnut'>;
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
    <section className='w-full bg-neutral-100 py-8 md:py-12 pt-0 md:pt-0'>
      <div className='max-w-2xl mx-auto flex flex-col items-center justify-center text-center mt-2 px-4'>
        <h2 className='text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-3 md:mb-4'>
          {pageText.title}
        </h2>
        <p className='text-lg md:text-xl text-neutral-700 font-semibold mb-6 md:mb-8'>
          {pageText.description}
        </p>
      </div>
      <div className='max-w-7xl mx-auto bg-white border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a] rounded-xl md:rounded-2xl px-4'>
        <div className='py-4 md:py-6 lg:py-8'>
          <div className='flex flex-col gap-2 items-center justify-center mb-12 md:mb-24 mt-2'>
            <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900'>
              {pageText.totalStatement}
            </h3>
            <span className='text-4xl md:text-5xl lg:text-6xl font-black text-primary'>
              256
            </span>
          </div>

          <div className='relative'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
              {visibleDoughnuts.map((item) => (
                <div
                  key={item.id}
                  className='bg-neutral-100 rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] p-3 md:p-4 hover:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150'
                >
                  <div className='relative mx-auto flex flex-col items-center justify-center'>
                    <div className='w-20 h-20 md:w-25 md:h-25'>
                      <Doughnut
                        data={{
                          labels: [],
                          datasets: [
                            {
                              data: item.data.datasets[0].data,
                              backgroundColor: ['#e83231', '#ffffff'],
                              borderWidth: 0,
                            },
                          ],
                        }}
                        options={{
                          cutout: '80%',
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { enabled: false },
                          },
                        }}
                      />
                    </div>
                    <span className='mt-2 font-bold text-sm md:text-base text-neutral-900'>
                      {item.name}
                    </span>
                  </div>

                  <div className='flex flex-col md:flex-row items-center justify-center gap-2 mt-2 md:mt-1'>
                    <div className='text-center flex items-center gap-1 md:gap-2 bg-primary text-white font-bold px-2 md:px-4 py-1 rounded-lg border-2 border-neutral-900 text-xs md:text-sm'>
                      <span className='block font-bold'>
                        {item.stats.approved}
                      </span>
                      <span className='block'>{pageText.acceptance}</span>
                    </div>
                    <div className='text-center flex items-center gap-1 md:gap-2 border-2 border-neutral-900 font-bold px-2 md:px-4 py-1 rounded-lg text-xs md:text-sm bg-white'>
                      <span className='block font-bold text-neutral-900'>
                        {item.stats.rejected}
                      </span>
                      <span className='block text-neutral-900'>
                        {pageText.rejected}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='flex justify-center items-center mt-6 md:mt-4'>
              <button
                onClick={handlePrevDoughnuts}
                disabled={currentDoughnutPage === 0}
                className='p-2 rounded-lg border-2 border-neutral-900 bg-white shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 transition-all duration-150'
              >
                <CircleArrowLeft className='h-6 w-6 md:h-8 md:w-8 text-neutral-900 cursor-pointer' />
              </button>

              <div className='flex gap-2 items-center mx-4'>
                {Array.from({ length: totalPages }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-3 transition-all duration-300 ease-in-out border-2 border-neutral-900 ${index === currentDoughnutPage ? 'w-8 md:w-10 bg-primary rounded-lg' : 'w-3 bg-white rounded-lg'}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextDoughnuts}
                disabled={currentDoughnutPage === totalPages - 1}
                className='p-2 rounded-lg border-2 border-neutral-900 bg-white shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] disabled:opacity-50 transition-all duration-150'
              >
                <CircleArrowRight className='h-6 w-6 md:h-8 md:w-8 text-neutral-900 cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
