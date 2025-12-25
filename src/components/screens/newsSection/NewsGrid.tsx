'use client';

import Image from 'next/image';
import React, { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsArticle } from '@/types/sanity';
import { StaticImageData } from 'next/image';
import { RTLTranslations } from '@/types/translations.generated';
import { formatDate } from '@/lib/utils/dateFormatter';
import { useLocale } from '@/context/LocaleContext';

const NewsGrid: FC<{
  pageText: RTLTranslations['reformNews'];
  currentNewsItems: NewsArticle[];
  totalNewsPages: number;
  currentNewsPage: number;
  setCurrentNewsPage: React.Dispatch<React.SetStateAction<number>>;
  rightSideCardPerson: StaticImageData | string;
  isLoading?: boolean;
}> = ({
  pageText,
  currentNewsItems,
  totalNewsPages,
  currentNewsPage,
  setCurrentNewsPage,
  rightSideCardPerson,
  isLoading = false,
}) => {
  const { locale } = useLocale();
  return (
    <section className='w-full py-6 md:py-8 bg-neutral-100'>
      <div className='max-w-7xl bg-white rounded-xl border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a] mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10'>
        <div className='text-neutral-900 font-bold text-base md:text-lg lg:text-xl mb-4'>
          {pageText.seeRecentNews}
        </div>

        {isLoading ? (
          <div className='text-center py-12'>
            <div className='inline-block h-8 w-8 animate-spin rounded-lg border-4 border-solid border-primary border-r-transparent'></div>
            <p className='mt-4 text-neutral-700 font-bold'>Loading news...</p>
          </div>
        ) : currentNewsItems.length === 0 ? (
          <div className='text-center py-12 text-neutral-700 font-bold'>
            {pageText.noNewsFound}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8'>
            {currentNewsItems.map((news) => (
              <div
                key={news._id}
                className='bg-white rounded-xl overflow-hidden border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150'
              >
                <div className='relative h-[200px] md:h-[250px] lg:h-[300px] border-b-2 border-neutral-900'>
                  <Image
                    src={news.featuredImage}
                    alt={news.title}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='p-4 md:p-5 lg:p-6'>
                  <h3 className='text-lg md:text-xl text-neutral-900 mb-2 line-clamp-2 font-bold'>
                    {news.title}
                  </h3>
                  <p className='text-sm md:text-base text-neutral-700 mb-4 line-clamp-3 font-semibold'>
                    {news.excerpt}
                  </p>
                  <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs md:text-sm'>
                    <div className='flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-lg border-2 border-neutral-900'>
                      <Image
                        src={rightSideCardPerson}
                        alt=''
                        width={20}
                        height={20}
                        className='rounded-full border border-neutral-900'
                      />
                      <span className='text-neutral-900 font-bold'>
                        {news.author?.name || pageText.unknown}
                      </span>
                    </div>
                    <div className='flex items-center gap-2 px-3 py-1 bg-warning rounded-lg border-2 border-neutral-900'>
                      <span className='w-2 h-2 md:w-3 md:h-3 bg-neutral-900 rounded-sm inline-block'></span>
                      <span className='text-neutral-900 font-bold'>
                        {formatDate(news.publishedDate, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && totalNewsPages > 1 && (
          <div className='flex justify-center items-center gap-3 mt-6 md:mt-8'>
            <button
              onClick={() =>
                setCurrentNewsPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={currentNewsPage === 1}
              className='p-2 disabled:opacity-50 bg-white border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              <ChevronLeft className='h-5 w-5 md:h-6 md:w-6 cursor-pointer text-neutral-900' />
            </button>
            {Array.from({ length: totalNewsPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentNewsPage(page)}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg cursor-pointer text-sm md:text-base font-bold border-2 border-neutral-900 transition-all duration-150 ${currentNewsPage === page ? 'bg-primary text-white shadow-[3px_3px_0px_#1a1a1a]' : 'bg-white text-neutral-900 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px]'}`}
                >
                  {page}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentNewsPage((prev) => Math.min(prev + 1, totalNewsPages))
              }
              disabled={currentNewsPage === totalNewsPages}
              className='p-2 disabled:opacity-50 bg-white border-2 border-neutral-900 rounded-lg shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              <ChevronRight className='h-5 w-5 md:h-6 md:w-6 cursor-pointer text-neutral-900' />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsGrid;
