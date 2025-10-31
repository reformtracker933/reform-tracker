'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/context/LocaleContext';
import { facebookLogo, gmailLogo, mainLogoBn } from '@/assets';

export default function Footer() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation('footer');

  return (
    <footer className='w-full mt-10'>
      <div className='mx-auto bg-gray-200 rounded-xl py-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ml-28'>
          {/* Column 1: Logo + small copyright sentence (3 words) */}
          <div className='flex flex-col items-start'>
            <Link href='/' aria-label='Home'>
              <div className='inline-block'>
                <Image
                  src={mainLogoBn}
                  alt='Reform Tracker logo'
                  width={150}
                  height={60}
                  className='object-contain'
                />
              </div>
            </Link>
            <p className='mt-1 text-md text-neutral-600'>
              © {pageText.rightsReserved}
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className='text-xl font-semibold text-neutral-900 mb-4'>
              {pageText.navigation}
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/dashboard'
                  className='text-neutral-600 hover:underline'
                >
                  {pageText.dashboard}
                </Link>
              </li>
              <li>
                <Link
                  href='/parties'
                  className='text-neutral-600 hover:underline'
                >
                  {pageText.politicalParties}
                </Link>
              </li>
              <li>
                <Link
                  href='/asset'
                  className='text-neutral-600 hover:underline'
                >
                  {pageText.assets}
                </Link>
              </li>
              <li>
                <Link href='/news' className='text-neutral-600 hover:underline'>
                  {pageText.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className='text-xl font-semibold text-neutral-900 mb-4'>
              {pageText.contactUs}
            </h4>
            <ul className='space-y-2 text-neutral-600'>
              <li>
                <a
                  href='mailto:info@reformtracker.example'
                  className='hover:underline'
                >
                  {pageText.email}: info@reformtracker.example
                </a>
              </li>
              <li>
                <a href='tel:+1234567890' className='hover:underline'>
                  {pageText.phone}: +1 (234) 567-890
                </a>
              </li>
              <li>
                <address className='not-italic'>
                  {pageText.address}: Dhaka, Bangladesh
                </address>
              </li>
            </ul>
          </div>

          {/* Column 4: Subscribe / Social logos */}
          <div>
            <div className='w-[60%]'>
              <h4 className='text-xl font-medium text-neutral-900 mb-4'>
                {pageText.contactUsAndFindLatestNews}
              </h4>
            </div>
            <div className='flex items-center space-x-2'>
              <Link href='mailto:info@reformtracker.example' aria-label='Email'>
                <div className='inline-flex items-center'>
                  <Image
                    src={gmailLogo}
                    alt='Gmail'
                    width={30}
                    height={30}
                    className='object-contain'
                  />
                </div>
              </Link>

              <Link href='https://www.facebook.com' aria-label='Facebook'>
                <div className='inline-flex items-center'>
                  <Image
                    src={facebookLogo}
                    alt='Facebook'
                    width={26}
                    height={26}
                    className='object-contain'
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
