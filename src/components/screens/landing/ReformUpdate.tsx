'use client';

import { useLocale } from '@/context/LocaleContext';
import Link from 'next/link';
import Button from '@/components/ui/ReformUpdateButton';
import { ReformUpdate as ReformUpdateType } from '@/types/sanity';
import { getColorWithFallback } from '@/lib/utils/colorMapper';

interface ReformUpdateProps {
  updates: ReformUpdateType[];
}

export function ReformUpdate({ updates }: ReformUpdateProps) {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('reformUpdateSection');

  const formattedUpdates = updates.map((update, index) => ({
    category: update.category?.title || pageText.corruptionAgainst,
    title: update.title,
    color: getColorWithFallback(update.color, update.category?.color, index),
    href: `/news/${update.slug?.current || ''}`,
  }));

  return (
    <section className='w-full py-8 md:py-12'>
      <h2 className='text-3xl md:text-4xl lg:text-5xl font-black text-primary mb-6 md:mb-8 text-center'>
        {pageText.sectionTitle}
      </h2>
      <div className='max-w-7xl mx-auto bg-neutral-100 rounded-xl md:rounded-2xl py-6 px-4 md:px-6 md:py-8 lg:px-8 lg:py-10 border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a]'>
        <div className='space-y-4 md:space-y-5'>
          <p className='font-bold text-neutral-800 text-base md:text-lg'>
            {pageText.seeRecentUpdates}
          </p>
          {formattedUpdates.map((update, index) => (
            <Button key={index} variant='card' update={update} />
          ))}
        </div>

        {/* View All Updates Button - Only show if there's update data */}
        {updates.length > 0 && (
          <div className='mt-6 md:mt-8 lg:mt-10 text-center'>
            <Link href='/news'>
              <Button
                variant='primary'
                pageText={{ viewAll: pageText.viewAll }}
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
