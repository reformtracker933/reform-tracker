import { Hero } from '@/components/screens/landing/Hero';
import { DigitalReports } from '@/components/screens/landing/DigitalReports';
import { Newsletter } from '@/components/screens/landing/Newsletter';
import { getFeaturedCommissionReports } from '@/sanity/lib/fetch';

export default async function Home() {
  const featuredReports = await getFeaturedCommissionReports();

  return (
    <div className='min-h-screen w-full'>
      <Hero />
      <div className='px-4 w-full'>
        <DigitalReports reports={featuredReports} />
      </div>
      <Newsletter />
    </div>
  );
}
