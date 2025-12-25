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
        className='inline-flex items-center gap-2 bg-white text-neutral-900 font-bold px-6 py-3 rounded-xl border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150'
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
