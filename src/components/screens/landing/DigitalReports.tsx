'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { CommissionCard } from '@/components/screens/proposalsSection/CommissionCard';
import { CommissionReport } from '@/types/sanity';
import { useDebounce } from '@/hooks/useDebounce';

interface DigitalReportsProps {
  reports: CommissionReport[];
}

export function DigitalReports({ reports }: DigitalReportsProps) {
  const { getTranslation } = useLocale();
  const text = getTranslation('commissionReports');

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Filter reports based on search query
  const filteredReports = useMemo(() => {
    if (!debouncedSearch.trim()) return reports;

    const query = debouncedSearch.toLowerCase();
    return reports.filter((report) => {
      const titleMatch = report.title?.toLowerCase().includes(query);
      const excerptMatch = report.excerpt?.toLowerCase().includes(query);
      const tagsMatch = report.tags?.some((tag) =>
        tag?.toLowerCase().includes(query)
      );
      const themesMatch = report.themeList?.some((theme) =>
        theme?.name?.toLowerCase().includes(query)
      );
      return titleMatch || excerptMatch || tagsMatch || themesMatch;
    });
  }, [reports, debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  if (!reports || reports.length === 0) {
    return null;
  }

  return (
    <section className='max-w-7xl mx-auto py-8 md:py-12'>
      <div className='flex flex-row justify-between items-end gap-3 md:gap-4 mb-6'>
        <h2 className='text-2xl md:text-3xl lg:text-4xl font-black text-neutral-900'>
          {text.sectionTitle}
        </h2>
        <Link
          href='/proposals'
          className='inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold text-sm md:text-base border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150'
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

      {/* Search Bar */}
      <div className='mb-6 md:mb-8'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={
            text.searchPlaceholder ||
            'Search reports by title, topic, or tag...'
          }
          className='w-full px-5 py-4 md:py-4.5 bg-white border-2 border-neutral-900 rounded-xl text-sm md:text-base font-medium shadow-[4px_4px_0px_#1a1a1a] focus:shadow-[2px_2px_0px_#1a1a1a] focus:translate-x-[2px] focus:translate-y-[2px] focus:outline-none transition-all duration-150 placeholder:text-neutral-500'
        />
      </div>

      {/* Results */}
      {filteredReports.length === 0 ? (
        <div className='text-center py-12 bg-white rounded-xl border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a]'>
          <p className='text-neutral-600 font-semibold mb-4'>
            {text.noResults || 'No reports found matching your search.'}
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className='px-4 py-2 bg-primary text-white rounded-lg font-bold border-2 border-neutral-900 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] transition-all duration-150'
          >
            {text.clearSearch || 'Clear Search'}
          </button>
        </div>
      ) : (
        <div className='min-h-[600px]'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5'>
            {filteredReports.slice(0, 8).map((report) => (
              <CommissionCard key={report._id} report={report} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
