import type { Metadata } from 'next';
import { Geist, Geist_Mono, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import { LocaleWrapper } from '@/components/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: '--font-noto-sans-bengali',
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Reform Tracker',
  description: 'Track the progress of reforms, search through evidences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='bn' className='locale-bn' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <LocaleWrapper>
            <Navbar />
            <main className='w-full'>{children}</main>
            <Footer />
          </LocaleWrapper>
        </Providers>
      </body>
    </html>
  );
}
