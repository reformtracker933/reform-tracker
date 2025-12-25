'use client';

import React, { FC } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/ReformUpdateButton';
import { UpdateCard } from '@/data/sampleNewsData';
import { RTLTranslations } from '@/types/translations.generated';

const UpdatesSection: FC<{
  pageText: RTLTranslations['reformNews'];
  updateSearchTerm: string;
  setUpdateSearchTerm: (v: string) => void;
  selectedUpdateCategory: string;
  setSelectedUpdateCategory: (v: string) => void;
  selectedUpdateDate: string;
  setSelectedUpdateDate: (v: string) => void;
  categories: { id: string; name: string }[];
  updates: Array<{
    category: string;
    title: string;
    color: string;
    href: string;
  }>;
  currentUpdateItems: UpdateCard[];
  totalUpdatePages: number;
  currentUpdatePage: number;
  setCurrentUpdatePage: React.Dispatch<React.SetStateAction<number>>;
  isLoading?: boolean;
}> = ({
  pageText,
  updateSearchTerm,
  setUpdateSearchTerm,
  selectedUpdateCategory,
  setSelectedUpdateCategory,
  selectedUpdateDate,
  setSelectedUpdateDate,
  categories,
  updates,
  totalUpdatePages,
  currentUpdatePage,
  setCurrentUpdatePage,
  isLoading = false,
}) => {
  return (
    <section className='w-full py-8 md:py-12 bg-neutral-100'>
      <div className='max-w-7xl mx-auto bg-white rounded-xl border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a] px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10'>
        <div className='text-center'>
          <h2 className='text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-3 md:mb-4'>
            {pageText.reformUpdateTitle}
          </h2>
          <p className='text-base md:text-xl lg:text-2xl font-bold text-neutral-700 max-w-md mx-auto mb-6 md:mb-8'>
            {pageText.reformUpdateDescription}
          </p>
        </div>

        <div className='flex flex-col max-w-4xl mx-auto md:flex-row gap-3 md:gap-4 mb-8 md:mb-16'>
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder={pageText.searchBarPlaceHolder}
              value={updateSearchTerm}
              onChange={(e) => setUpdateSearchTerm(e.target.value)}
              className='h-12 md:h-14 w-full pl-12 md:pl-14 pr-4 rounded-xl border-2 border-neutral-900 bg-white text-neutral-900 font-bold text-sm md:text-base shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none transition-all duration-150'
            />
            <Search className='absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-neutral-900' />
          </div>

          <div className='flex gap-3 md:gap-4'>
            <div className='relative flex-1 md:w-36'>
              <select
                value={selectedUpdateCategory}
                onChange={(e) => setSelectedUpdateCategory(e.target.value)}
                className='appearance-none text-center h-12 md:h-14 rounded-xl border-2 border-neutral-900 bg-white text-neutral-900 font-bold w-full text-sm md:text-base pr-8 shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none cursor-pointer transition-all duration-150'
              >
                <option value='all'>{pageText.sector}</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <svg
                className='absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-900 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>

            <div className='relative flex-1 md:w-36'>
              <input
                type='date'
                value={selectedUpdateDate}
                onChange={(e) => setSelectedUpdateDate(e.target.value)}
                className='h-12 md:h-14 rounded-xl border-2 border-neutral-900 bg-white text-neutral-900 font-bold w-full text-sm md:text-base px-4 shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] focus:outline-none cursor-pointer transition-all duration-150'
              />
            </div>
          </div>
        </div>

        <div className='text-neutral-900 font-bold text-base md:text-lg lg:text-xl mb-4'>
          {pageText.seeRecentUpdate}
        </div>

        {isLoading ? (
          <div className='space-y-3 md:space-y-4'>
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className='h-16 md:h-20 bg-neutral-200 rounded-xl border-2 border-neutral-900 animate-pulse'
              />
            ))}
          </div>
        ) : updates.length === 0 ? (
          <div className='text-center py-12 text-neutral-700 font-bold'>
            {pageText.noUpdatesFound}
          </div>
        ) : (
          <div className='space-y-4 md:space-y-5'>
            {updates.map((update, index) => (
              <Button key={index} variant='card' update={update} />
            ))}
          </div>
        )}

        {totalUpdatePages > 1 && (
          <div className='flex justify-center items-center gap-3 mt-6 md:mt-8'>
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentUpdatePage === 1}
              className='p-2 disabled:opacity-50 bg-white border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              <ChevronLeft className='h-5 w-5 md:h-6 md:w-6 text-neutral-900' />
            </button>
            {Array.from({ length: totalUpdatePages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentUpdatePage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg text-sm md:text-base font-bold border-2 border-neutral-900 transition-all duration-150 ${currentUpdatePage === page ? 'bg-primary text-white shadow-[3px_3px_0px_#1a1a1a]' : 'bg-white text-neutral-900 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentUpdatePage((prev) =>
                  Math.min(prev + 1, totalUpdatePages)
                )
              }
              disabled={currentUpdatePage === totalUpdatePages}
              className='p-2 disabled:opacity-50 bg-white border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              <ChevronRight className='h-5 w-5 md:h-6 md:w-6 text-neutral-900' />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdatesSection;
