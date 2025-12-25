'use client';

import CardStat from '@/components/screens/dashboard/CardStat';
import BarChart from '@/components/screens/dashboard/BarChart';
import DoughnutChart from '@/components/screens/dashboard/DoughnutChart';
import { FileText, BarChart as BarIcon } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { DashboardStats } from '@/types/sanity';
import UpdatesSection from './UpdatesSection';

interface DashboardClientProps {
  stats: DashboardStats | null;
}

// Dummy data section starts from here
import { UpdateCard } from '@/data/sampleNewsData';
import { RTLTranslations } from '@/types/translations.generated';

export const dummyUpdatesSectionProps = {
  pageText: {
    reformUpdateTitle: 'সংস্কার আপডেট',
    searchBarPlaceHolder: 'অনুসন্ধান করুন',
    sector: 'সেক্টর',
    seeRecentUpdate: 'See Recent Updates',
    noUpdatesFound: 'No updates found for your selection.',
  } as RTLTranslations['reformNews'],

  updateSearchTerm: '',
  setUpdateSearchTerm: (v: string) => console.log('Search:', v),

  selectedUpdateCategory: 'all',
  setSelectedUpdateCategory: (v: string) => console.log('Category:', v),

  selectedUpdateDate: '',
  setSelectedUpdateDate: (v: string) => console.log('Date:', v),

  categories: [
    { id: '1', name: 'Politics' },
    { id: '2', name: 'Education' },
    { id: '3', name: 'Health' },
    { id: '4', name: 'Environment' },
    { id: '5', name: 'Economy' },
    { id: '6', name: 'Technology' },
  ],

  updates: [
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/election-reform-act-2024',
      text: 'চলছে',
      colorStat: '#4A7EC9',
      borderColor: '#4A7EC9',
    },
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/education-curriculum-update',
      text: 'সম্পন্ন',
      colorStat: '#31B36B',
      borderColor: '#31B36B',
    },
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/digital-health-cards',
      text: 'বাতিল',
      colorStat: '#E83231CC',
      borderColor: '#E83231CC',
    },
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/forest-conservation-program',
      text: 'পরিকল্পিত',
      colorStat: '#F9D262',
      borderColor: '#F9D262',
    },
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/national-budget-2025',
      text: 'সম্পন্ন',
      colorStat: '#31B36B',
      borderColor: '#31B36B',
    },
    {
      category: 'দুর্নীতিবিরোধী',
      date: '২৭,জানুয়ারি,২০২৫',
      title: 'নতুন শিক্ষা ব্যবস্থা চালু হয়েছে.',
      color: '#EA8389',
      href: '/news/smart-city-expansion',
      text: 'বাতিল',
      colorStat: '#E83231CC',
      borderColor: '#E83231CC',
    },
  ],

  currentUpdateItems: [
    {
      id: 'u1',
      title: 'Election Reform Act 2024',
      category: 'Politics',
      image: '/images/sample1.jpg',
      description:
        'A new reform law to enhance transparency and ensure fair elections across the country.',
      date: '2024-11-10',
      slug: 'election-reform-act-2024',
    },
    {
      id: 'u2',
      title: 'Healthcare Modernization Policy 2025',
      category: 'Health',
      image: '/images/sample2.jpg',
      description:
        'Policy introducing digital health records and improved access to healthcare in rural areas.',
      date: '2025-01-15',
      slug: 'healthcare-modernization-policy-2025',
    },
    {
      id: 'u3',
      title: 'Green Investment Budget 2025',
      category: 'Economy',
      image: '/images/sample3.jpg',
      description:
        'The government introduces new incentives for renewable energy and eco-friendly startups.',
      date: '2025-02-20',
      slug: 'green-investment-budget-2025',
    },
    {
      id: 'u4',
      title: 'Smart City Expansion Project',
      category: 'Technology',
      image: '/images/sample4.jpg',
      description:
        'Phase two of the Smart City initiative expands digital infrastructure to 10 new districts.',
      date: '2025-03-10',
      slug: 'smart-city-expansion-project',
    },
    {
      id: 'u5',
      title: 'Education Curriculum Overhaul',
      category: 'Education',
      image: '/images/sample5.jpg',
      description:
        'A modernized curriculum focusing on critical thinking and digital literacy has been introduced nationwide.',
      date: '2025-04-05',
      slug: 'education-curriculum-overhaul',
    },
    {
      id: 'u6',
      title: 'Forest Conservation Program Launched',
      category: 'Environment',
      image: '/images/sample6.jpg',
      description:
        'A long-term initiative to protect 1 million acres of forest and promote eco-tourism.',
      date: '2025-05-12',
      slug: 'forest-conservation-program-launched',
    },
  ] as unknown as UpdateCard[],

  totalUpdatePages: 3,
  currentUpdatePage: 1,

  setCurrentUpdatePage: (v: React.SetStateAction<number>) => {
    if (typeof v === 'function') {
      console.log('Page set via updater fn:', v(1));
    } else {
      console.log('Page set directly:', v);
    }
  },

  isLoading: false,
};

export default function DashboardClient({ stats }: DashboardClientProps) {
  const { getTranslation, locale } = useLocale();
  const pageText = getTranslation('dashboard');

  const defaultBarLabels = [
    pageText.running,
    pageText.completed,
    pageText.preplanned,
    pageText.expelled,
  ];
  const defaultBarData = [0, 0, 0, 0];

  const defaultDoughLabels = [
    pageText.antiCorruption,
    pageText.reformUsingSector,
  ];
  const defaultDoughData = [0, 0];
  const defaultDoughColors = ['#e83231', '#4a7ec9'];

  const barLabels =
    stats?.statusBreakdown?.map((item) =>
      locale === 'bn' ? item.label_bn : item.label_en
    ) || defaultBarLabels;

  const barData =
    stats?.statusBreakdown?.map((item) => item.count) || defaultBarData;

  const doughLabels =
    stats?.sectorBreakdown?.map((item) =>
      locale === 'bn' ? item.sectorName_bn : item.sectorName_en
    ) || defaultDoughLabels;

  const doughData =
    stats?.sectorBreakdown?.map((item) => item.value) || defaultDoughData;

  const doughColors =
    stats?.sectorBreakdown?.map((item) => item.color) || defaultDoughColors;

  return (
    <section className='w-full min-h-screen pt-24 md:pt-32 px-4 md:px-6 lg:px-8 space-y-12 md:space-y-16 pb-12 bg-neutral-100'>
      <div className='max-w-7xl mx-auto'>
        <header className='text-center mb-8 md:mb-12'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900'>
            {pageText.title}
          </h1>
          <div className='w-24 h-1 bg-primary mx-auto mt-4 border border-neutral-900'></div>
        </header>

        <div className='flex flex-col lg:flex-row items-start justify-center gap-4 md:gap-6 w-full'>
          <div className='flex flex-col gap-4 md:gap-6 w-full lg:flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full'>
              <div className='w-full h-[164px]'>
                <CardStat
                  icon={FileText}
                  title={pageText.totalProposal}
                  value={stats?.totalProposals || 0}
                  delta={stats?.proposalsDelta || '+0%'}
                />
              </div>
              <div className='w-full h-[164px]'>
                <CardStat
                  icon={BarIcon}
                  title={pageText.totalCommission}
                  value={stats?.totalCommissions || 0}
                  delta={stats?.commissionsDelta || '+0%'}
                />
              </div>
            </div>

            <div className='w-full h-[350px] md:h-[410px]'>
              <BarChart
                labels={barLabels}
                data={barData}
                title={pageText.graphTitle}
                subtitle='2023-2024'
              />
            </div>
          </div>

          <div className='w-full lg:w-[540px] h-[500px] md:h-[600px]'>
            <DoughnutChart
              labels={doughLabels}
              data={doughData}
              colors={doughColors}
              title={pageText.reformUsingSector}
            />
          </div>
        </div>
        <div>
          <UpdatesSection {...dummyUpdatesSectionProps} />
        </div>
      </div>
    </section>
  );
}
