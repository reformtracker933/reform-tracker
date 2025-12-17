'use client';

import Image from 'next/image';
import { useLocale } from '@/context/LocaleContext';
import { heroImage } from '@/assets';

export function Hero() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('heroSection');

  return (
    <section className='w-full'>
      <div className='relative w-full'>
        <div className='h-[60vh] w-full'>
          <Image
            src={heroImage}
            alt='Reform Tracker Background'
            fill
            priority
            className='object-cover'
          />
        </div>

        <div className='relative z-10 flex items-center justify-center h-full px-4'>
          <div className='text-center w-4xl'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4 leading-tight'>
              {pageText['heading']}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
