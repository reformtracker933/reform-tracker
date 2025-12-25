import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CommissionReport } from '@/types/sanity';
import { Badge } from '@/components/ui/Badge';

interface CommissionCardProps {
  report: CommissionReport;
  priority?: boolean;
}

function CommissionCardComponent({
  report,
  priority = false,
}: CommissionCardProps) {
  const displayThemes = (report.themeList || [])
    .filter((theme) => theme?._id)
    .slice(0, 3);
  const displayParties = (report.allParties || [])
    .filter((party) => party?._id && party?.logo)
    .slice(0, 4);
  const imageUrl = report.featuredImage || '/images/placeholder-commission.jpg';
  const imageAlt = report.featuredImageAlt || report.title;

  return (
    <Link
      href={`/proposals/${report.slug.current}`}
      className='block h-full'
      aria-label={`View ${report.title}`}
    >
      <article className='group bg-white rounded-xl border-2 border-neutral-900 overflow-hidden transition-all duration-150 h-full flex flex-col shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px]'>
        <div className='relative h-48 overflow-hidden border-b-2 border-neutral-900'>
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            priority={priority}
            className='object-cover'
          />
        </div>

        <div className='p-4 flex-1 flex flex-col'>
          <h3 className='font-semibold text-lg text-neutral-900 line-clamp-2 mb-2 min-h-14'>
            {report.title}
          </h3>

          <p className='text-sm text-neutral-600 line-clamp-3 mb-4 flex-1'>
            {report.excerpt}
          </p>

          {displayThemes.length > 0 && (
            <div
              className='flex flex-wrap gap-2 mb-3'
              role='list'
              aria-label='Themes'
            >
              {displayThemes.map((theme) => (
                <Badge
                  key={theme._id}
                  style={{ backgroundColor: theme.color || '#4a7ec9' }}
                  className='text-white'
                >
                  <span>{theme.icon}</span>
                  <span>{theme.name}</span>
                </Badge>
              ))}
              {report.themeList && report.themeList.length > 3 && (
                <Badge variant='neutral'>+{report.themeList.length - 3}</Badge>
              )}
            </div>
          )}

          {displayParties.length > 0 && (
            <div className='flex flex-wrap gap-2'>
              {displayParties.map((party) => (
                <Badge
                  key={party._id}
                  style={{ backgroundColor: party.color || '#4a7ec9' }}
                  className='text-white'
                >
                  {party.logo && (
                    <Image
                      src={party.logo}
                      width={16}
                      height={16}
                      alt={party.name}
                      className='rounded-full'
                    />
                  )}
                  <span>{party.name}</span>
                </Badge>
              ))}
              {displayParties.length > 4 &&
                report.allParties &&
                report.allParties.length > 4 && (
                  <Badge variant='outline' className='text-xs'>
                    +{report.allParties.length - 4}
                  </Badge>
                )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

export const CommissionCard = memo(CommissionCardComponent);
