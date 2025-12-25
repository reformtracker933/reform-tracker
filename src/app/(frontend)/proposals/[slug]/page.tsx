import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCommissionReportBySlug } from '@/sanity/lib/fetch';
import { Badge } from '@/components/ui/Badge';
import { CollapsibleTheme } from '@/components/screens/proposalsSection/CollapsibleTheme';
import { TableOfContents } from '@/components/screens/proposalsSection/TableOfContents';
import { BackToReportsLink } from '@/components/screens/proposalsSection/BackToReportsLink';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CommissionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const report = await getCommissionReportBySlug(slug);
  if (!report) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-neutral-100'>
      <div className='relative bg-primary text-white'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-size-[4rem_4rem]'></div>
        <div className='relative max-w-7xl mx-auto px-4 xl:px-0 pt-32 md:pt-36 pb-16 md:pb-20'>
          <div className='max-w-4xl'>
            <div className='flex flex-wrap gap-2 mb-4'>
              {report.tags?.map((tag) => (
                <Badge
                  key={tag}
                  variant='outline'
                  className='bg-white/10 border-2 border-white/30 text-white text-xs font-bold shadow-[2px_2px_0px_rgba(0,0,0,0.3)]'
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight'>
              {report.title}
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-white/90 mb-4 font-semibold'>
              {report.excerpt}
            </p>
            <div className='flex items-center gap-4 text-sm text-white/80 mb-8 md:mb-12 font-bold'>
              <span>
                📅{' '}
                {new Date(report.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {report.featuredImage && (
        <div className='max-w-5xl mx-auto px-4 -mt-16 mb-16 relative z-10'>
          <div className='rounded-xl overflow-hidden border-2 border-neutral-900 shadow-[6px_6px_0px_#1a1a1a]'>
            <div className='relative h-75 md:h-100 lg:h-125'>
              <Image
                src={report.featuredImage}
                alt={report.featuredImageAlt || report.title}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>
        </div>
      )}

      <div className='max-w-7xl mx-auto px-4 xl:px-0 pb-16'>
        <div className='w-full'>
          <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
            <TableOfContents themes={report.themes || []} />

            <main className='lg:col-span-3'>
              <div className='space-y-4 md:space-y-8'>
                {report.themes?.map((themeGroup, themeIndex) => (
                  <CollapsibleTheme
                    key={themeGroup.theme._id}
                    themeGroup={themeGroup}
                    themeIndex={themeIndex}
                  />
                ))}
              </div>

              <BackToReportsLink />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
