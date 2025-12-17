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
    <header className='fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-white/70 py-2.5 px-4'>
      <div className='max-w-7xl mx-auto'>
        <div className='h-16 flex items-center justify-between'>
          {/* Left: Logo */}
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

          {/* Center: nav buttons */}
          <nav className='hidden md:flex justify-center space-x-3 items-center'>
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
                      ? 'bg-secondary text-secondary hover:bg-secondary hover:text-secondary'
                      : ''
                  }`}
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Right: Subscribe & Mobile Menu */}
          <div className='flex items-center gap-4'>
            {/* Subscribe Button - Hidden on mobile */}
            <button
              onClick={() => setIsModalOpen(true)}
              className='hidden md:block bg-secondary text-white rounded-full px-7 py-2 cursor-pointer hover:scale-105 transition-transform duration-200'
            >
              {pageText.subscribe}
            </button>

            {/* Mobile Navigation */}
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
