'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { CommissionCard } from '@/components/screens/proposalsSection/CommissionCard';
import { CommissionReport } from '@/types/sanity';

interface DigitalReportsProps {
  reports: CommissionReport[];
}

export function DigitalReports({ reports }: DigitalReportsProps) {
  const { getTranslation } = useLocale();
  const text = getTranslation('commissionReports');

  if (!reports || reports.length === 0) {
    return null;
  }

  return (
    <section className='max-w-7xl mx-auto py-12 md:py-16'>
      <div className='flex flex-row justify-between items-center gap-3 md:gap-4 mb-8'>
        <h2 className='text-xl md:text-3xl lg:text-4xl font-bold text-neutral-900'>
          {text.sectionTitle}
        </h2>
        <Link
          href='/proposals'
          className='inline-flex items-center gap-1.5 md:gap-2 bg-secondary text-white px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-200 hover:bg-secondary-300 hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap'
        >
          {text.seeAll}
          <svg
            className='w-4 h-4 md:w-5 md:h-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M17 8l4 4m0 0l-4 4m4-4H3'
            />
          </svg>
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {reports.map((report) => (
          <CommissionCard key={report._id} report={report} />
        ))}
      </div>
    </section>
  );
}
