'use client';

import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';

export function BackToReportsLink() {
  const { getTranslation } = useLocale();
  const text = getTranslation('commissionDetail');

  return (
    <div className='mt-12 text-center'>
      <Link
        href='/proposals'
        className='inline-flex items-center gap-2 text-primary hover:text-primary-600 font-semibold transition-colors'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 19l-7-7m0 0l7-7m-7 7h18'
          />
        </svg>
        {text.backToReports}
      </Link>
    </div>
  );
}
