import { useLocale } from '@/context/LocaleContext';
import Link from 'next/link';
import Button from '@/components/ui/NewsLetterButton';

export function Newsletter() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('newsletter');

  return (
  <section className='w-full py-12 bg-background'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        {/* Title */}
        <div className='w-[60%] md:w-[70%] px-4 flex justify-center mx-auto text-center'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight mt-6 sm:mt-8'>
            {pageText.title}
          </h2>
        </div>

        {/* Description */}
        <div className='w-[64%] flex justify-center mx-auto'>
          <p className='text-lg md:text-xl text-neutral-600 mb-8 max-w-2xl mx-auto font-semibold'>
            {pageText.description}
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6'>
          <Link href='/emailAddress'>
            <Button variant='primary' text={pageText.emailPlaceholder} />
          </Link>

          <Link href='/subscribe'>
            <Button variant='secondary' text={pageText.subscribeButton} />
          </Link>
        </div>
      </div>
    </section>
  );
}
