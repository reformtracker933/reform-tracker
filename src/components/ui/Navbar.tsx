'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button, MobileNav } from '@/components/ui';
import { useLocale } from '@/context/LocaleContext';
import { mainLogoBn } from '@/assets';
import SubscribeModal from '@/components/ui/SubscribeModal';
import { getNavItems } from '@/lib/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const { getTranslation } = useLocale();
  const pageText = getTranslation('navBar');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navItems = getNavItems(pageText);

  return (
    <header className='fixed top-0 left-0 w-full z-50 bg-background border-b-2 border-neutral-900 py-2.5 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='h-16 flex items-center justify-between'>
          <div className='flex items-center shrink-0'>
            <Link href='/' aria-label='Home'>
              <Image
                src={mainLogoBn}
                alt='Reform Tracker logo'
                width={160}
                height={160}
                priority={true}
                className='object-contain'
              />
            </Link>
          </div>

          <nav className='hidden md:flex justify-center space-x-2 items-center'>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  href={item.href}
                  key={item.href}
                  variant='navbar'
                  size='xm'
                  className={`cursor-pointer ${
                    isActive
                      ? 'bg-warning border-2 border-neutral-900 shadow-[2px_2px_0px_#1a1a1a]'
                      : ''
                  }`}
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className='flex items-center gap-4'>
            <button
              onClick={() => setIsModalOpen(true)}
              className='hidden md:block bg-secondary text-white rounded-xl px-6 py-2 cursor-pointer font-bold border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              {pageText.subscribe}
            </button>

            <MobileNav onSubscribeClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>

      <SubscribeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source='navbar'
        showNameField={true}
      />
    </header>
  );
}
