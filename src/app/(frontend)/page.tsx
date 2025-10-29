'use client';

import { Button } from '@/components/ui';
import { useLocale } from '@/context/LocaleContext';

export default function Home() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('homePage');

  return (
    <div className='min-h-[90vh] w-full bg-background flex items-center justify-center'>
      <div className='text-center space-y-8'>
        <h1 className='text-6xl font-bold text-foreground'>
          {pageText['title']}
        </h1>

        <p className='text-xl text-muted'>{pageText.subtitle}</p>

        <div className='pt-4'>
          <Button href='/demo' variant='primary' size='lg'>
            {pageText.viewDemo} →
          </Button>
        </div>
      </div>
    </div>
  );
}
