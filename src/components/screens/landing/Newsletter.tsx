'use client';

import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import SubscribeModal from '@/components/ui/SubscribeModal';

export function Newsletter() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('newsletter');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribeClick = () => {
    setIsModalOpen(true);
  };

  return (
    <section className='w-full py-10 md:py-14 bg-warning'>
      <div className='max-w-7xl mx-auto px-4 text-center'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-neutral-900 mb-4 md:mb-6 leading-tight'>
            {pageText.title}
          </h2>
        </div>

        <div className='max-w-2xl mx-auto'>
          <p className='text-base md:text-lg lg:text-xl text-neutral-800 mb-6 md:mb-8 font-bold'>
            {pageText.description}
          </p>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 max-w-2xl mx-auto'>
          <input
            type='email'
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder={pageText.emailPlaceholder}
            className='w-full sm:flex-1 px-6 md:px-8 py-3 md:py-4 rounded-xl border-2 border-neutral-900 bg-white text-neutral-900 font-bold text-sm md:text-base focus:outline-none shadow-[3px_3px_0px_#1a1a1a] focus:shadow-[4px_4px_0px_#e63946] transition-all duration-150'
          />

          <button
            onClick={handleSubscribeClick}
            className='w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 rounded-xl bg-primary text-white font-bold text-sm md:text-base border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150'
          >
            {pageText.subscribeButton}
          </button>
        </div>
      </div>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source='newsletter'
        showNameField={true}
        initialEmail={emailInput}
      />
    </section>
  );
}
