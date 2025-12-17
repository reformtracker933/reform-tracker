'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { PortableText } from '@portabletext/react';
import { CommissionReport } from '@/types/sanity';

interface CollapsibleThemeProps {
  themeGroup: NonNullable<CommissionReport['themes']>[0];
  themeIndex: number;
}

export function CollapsibleTheme({
  themeGroup,
  themeIndex,
}: CollapsibleThemeProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Auto-expand on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleTheme = () => {
    // Only toggle on mobile
    if (window.innerWidth < 1024) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div
      id={`theme-${themeIndex}`}
      className='bg-white rounded-xl shadow-md overflow-hidden'
    >
      {/* Theme Header - Clickable on Mobile */}
      <button
        onClick={toggleTheme}
        className='w-full text-left px-4 md:px-6 py-4 border-b-4 lg:cursor-default focus:outline-none focus:ring-2 focus:ring-primary/50 lg:focus:ring-0 transition-all'
        style={{
          borderColor: themeGroup.theme.color || '#4a7ec9',
        }}
        aria-expanded={isExpanded}
        aria-controls={`theme-content-${themeIndex}`}
      >
        <div className='flex items-center justify-between gap-3'>
          <div className='flex items-center gap-3 flex-1 min-w-0'>
            <span className='text-2xl md:text-3xl shrink-0'>
              {themeGroup.theme.icon}
            </span>
            <div className='flex-1 min-w-0'>
              <h2 className='text-lg md:text-xl lg:text-2xl font-bold text-gray-900'>
                {themeGroup.theme.name}
              </h2>
              {themeGroup.theme.description && (
                <p className='text-xs md:text-sm lg:text-base text-gray-600 mt-1'>
                  {themeGroup.theme.description}
                </p>
              )}
            </div>
          </div>
          {/* Chevron Icon - Only visible on mobile */}
          <svg
            className={`w-5 h-5 md:w-6 md:h-6 text-gray-600 transition-transform duration-300 lg:hidden shrink-0 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </button>

      {/* Sections - Collapsible on Mobile, Always Open on Desktop */}
      <div
        id={`theme-content-${themeIndex}`}
        className={`divide-y divide-gray-200 transition-all duration-300 ease-in-out lg:block ${
          isExpanded
            ? 'max-h-[10000px] opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden lg:max-h-none lg:opacity-100 lg:overflow-visible'
        }`}
      >
        {themeGroup.sections
          ?.sort((a, b) => a.order - b.order)
          .map((section, sectionIndex) => (
            <div key={sectionIndex} className='p-4 md:p-6'>
              <h3 className='text-lg md:text-xl font-semibold text-gray-900 mb-4'>
                {section.title}
              </h3>

              {/* Content */}
              <div className='prose prose-sm md:prose max-w-none mb-6 text-gray-700'>
                <PortableText value={section.content} />
              </div>

              {/* Political Parties */}
              {section.politicalParties &&
                section.politicalParties.length > 0 && (
                  <div className='mt-6 pt-6 border-t border-gray-200'>
                    <h4 className='text-xs md:text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
                      <svg
                        className='w-4 h-4 md:w-5 md:h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                      </svg>
                      Political Party Support
                    </h4>
                    <div className='flex flex-wrap gap-2'>
                      {section.politicalParties
                        .filter((party) => party && party._id)
                        .map((party) => (
                          <Badge
                            key={party._id}
                            style={{
                              backgroundColor: party.color || '#4a7ec9',
                            }}
                            className='text-white text-xs md:text-sm'
                          >
                            {party.logo && (
                              <Image
                                src={party.logo}
                                width={16}
                                height={16}
                                alt={party.name}
                                className='rounded-full md:w-5 md:h-5'
                              />
                            )}
                            <span className='font-medium'>{party.name}</span>
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}
            </div>
          ))}
      </div>
    </div>
  );
}
