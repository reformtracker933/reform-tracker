'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '@/context/LocaleContext';
import { gmailLogo, facebookLogo } from '@/assets';
import { getNavItems } from '@/lib/navigation';

interface MobileNavProps {
  onSubscribeClick: () => void;
}

export default function MobileNav({ onSubscribeClick }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { getTranslation } = useLocale();
  const pageText = getTranslation('navBar');

  const navItems = getNavItems(pageText);

  const socialLinks = [
    {
      name: 'Email',
      href: 'mailto:info@reformtracker.example',
      icon: gmailLogo,
      alt: 'Gmail',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com',
      icon: facebookLogo,
      alt: 'Facebook',
    },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        closeMenu();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className='md:hidden'>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className='relative w-10 h-10 flex items-center justify-center focus:outline-none z-50'
        aria-label='Toggle menu'
        aria-expanded={isOpen}
      >
        <div className='w-6 h-5 flex flex-col justify-between'>
          <span
            className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-foreground rounded-full transition-all duration-300 ease-in-out ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Backdrop Overlay */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white border-l-2 border-neutral-900 shadow-[-6px_0_0px_#1a1a1a] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-screen'>
          <div className='p-6 border-b-2 border-neutral-900'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-black text-foreground'>
                {pageText.menu}
              </h2>
              <button
                onClick={closeMenu}
                className='w-10 h-10 flex items-center justify-center rounded-lg border-2 border-neutral-900 bg-white shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
                aria-label='Close menu'
              >
                <svg
                  className='w-5 h-5 text-foreground'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>

          <nav className='flex-1 overflow-y-auto p-4 space-y-3'>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                  className={`block px-5 py-3 rounded-xl font-bold transition-all duration-150 border-2 border-neutral-900 ${
                    isActive
                      ? 'bg-warning text-neutral-900 shadow-[3px_3px_0px_#1a1a1a]'
                      : 'bg-white text-neutral-900 shadow-[2px_2px_0px_#1a1a1a] hover:shadow-[3px_3px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className='border-t-2 border-neutral-900 p-6 space-y-4 bg-neutral-100'>
            <button
              onClick={() => {
                onSubscribeClick();
                closeMenu();
              }}
              className='w-full bg-secondary text-white rounded-xl px-6 py-3 font-bold border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[4px_4px_0px_#1a1a1a] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all duration-150'
            >
              {pageText.subscribe}
            </button>

            <div className='flex items-center justify-center gap-4 pt-2'>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:scale-110 transition-transform duration-200'
                  aria-label={social.name}
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={28}
                    height={28}
                    className='object-contain'
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
