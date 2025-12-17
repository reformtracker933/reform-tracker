'use client';

import { useLocale } from '@/context/LocaleContext';
import { Newsletter } from '@/components/screens/landing/Newsletter';

export default function AboutPage() {
  const { getTranslation } = useLocale();
  const text = getTranslation('aboutPage');

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='relative bg-linear-to-br from-primary to-secondary text-white overflow-hidden'>
        <div className='absolute inset-0 bg-black/20'></div>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem]'></div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 pb-16 md:pb-20'>
          <div className='max-w-4xl'>
            <div className='inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium mb-4 border border-white/20'>
              {text.subtitle}
            </div>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight'>
              {text.title}
            </h1>
            <p className='text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl'>
              {text.heroDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-8 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Mission Card */}
          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shrink-0'>
                <svg
                  className='w-7 h-7 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h2 className='text-xl md:text-2xl font-bold text-gray-900'>
                {text.missionTitle}
              </h2>
            </div>
            <p className='text-gray-600 text-base leading-relaxed'>
              {text.missionDescription}
            </p>
          </div>

          {/* Vision Card */}
          <div className='bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100 hover:shadow-2xl transition-shadow'>
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shrink-0'>
                <svg
                  className='w-7 h-7 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                  />
                </svg>
              </div>
              <h2 className='text-xl md:text-2xl font-bold text-gray-900'>
                {text.visionTitle}
              </h2>
            </div>
            <p className='text-gray-600 text-base leading-relaxed'>
              {text.visionDescription}
            </p>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28'>
        <div className='text-center mb-12'>
          <h2 className='text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4'>
            {text.whatWeDoTitle}
          </h2>
          <div className='w-16 h-1 bg-linear-to-r from-primary to-secondary mx-auto mb-4'></div>
          <p className='text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            {text.whatWeDoDescription}
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Feature 1 */}
          <div className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200'>
            <div className='relative mb-6'>
              <div className='w-16 h-16 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-blue-100 rounded-full -z-10'></div>
            </div>
            <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3'>
              {text.feature1Title}
            </h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              {text.feature1Description}
            </p>
          </div>

          {/* Feature 2 */}
          <div className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200'>
            <div className='relative mb-6'>
              <div className='w-16 h-16 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </div>
              <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-purple-100 rounded-full -z-10'></div>
            </div>
            <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3'>
              {text.feature2Title}
            </h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              {text.feature2Description}
            </p>
          </div>

          {/* Feature 4 */}
          <div className='group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-cyan-200'>
            <div className='relative mb-6'>
              <div className='w-16 h-16 bg-linear-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300'>
                <svg
                  className='w-8 h-8 text-white'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
                  />
                </svg>
              </div>
              <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-cyan-100 rounded-full -z-10'></div>
            </div>
            <h3 className='text-lg md:text-xl font-bold text-gray-900 mb-3'>
              {text.feature4Title}
            </h3>
            <p className='text-gray-600 text-sm md:text-base leading-relaxed'>
              {text.feature4Description}
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
}
