'use client';

import { Hero } from '@/components/screens/Landing/Hero';
import { Newsletter } from '@/components/screens/Landing/Newsletter';
import { ReformNews } from '@/components/screens/Landing/ReformNews';
import { ReformUpdate } from '@/components/screens/Landing/ReformUpdate';

export default function Home() {
  return (
    <div className='min-h-[90vh] w-full bg-background flex flex-col items-center justify-center'>
      <Hero />
      <ReformNews />
      <RefordmUpdatedff />
      <Newsletter />
      {/* fs */}
    </div>
  );
}
