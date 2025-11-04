"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { facebookLogo, gmailLogo, mainLogoBn } from "@/assets";

export default function Footer() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("footer");

  return (
    <footer className="w-full mt-10">
      <div className="mx-auto bg-neutral-200 rounded-xl py-16 md:py-16 pb-10 md:pb-6 px-8 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" aria-label="Home">
              <div className="inline-block">
                <Image
                  src={mainLogoBn}
                  alt="Reform Tracker logo"
                  width={180}
                  height={70}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-xl font-semibold text-neutral-900 mb-4">
              {pageText.navigation}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/dashboard"
                  className="text-neutral-600 hover:underline"
                >
                  {pageText.dashboard}
                </Link>
              </li>
              <li>
                <Link
                  href="/parties"
                  className="text-neutral-600 hover:underline"
                >
                  {pageText.politicalParties}
                </Link>
              </li>
              <li>
                <Link
                  href="/asset"
                  className="text-neutral-600 hover:underline"
                >
                  {pageText.assets}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-neutral-600 hover:underline">
                  {pageText.news}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-xl font-semibold text-neutral-900 mb-4">
              {pageText.contactUs}
            </h4>
            <ul className="space-y-2 text-neutral-600">
              <li>
                <a
                  href="mailto:info@reformtracker.example"
                  className="hover:underline"
                >
                  {pageText.email}: info@reformtracker.example
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline">
                  {pageText.phone}: +1 (234) 567-890
                </a>
              </li>
              <li>
                <address className="not-italic">
                  {pageText.address}: Dhaka, Bangladesh
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl text-center font-medium text-neutral-900 mb-4">
              {pageText.contactUsAndFindLatestNews}
            </h4>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="mailto:info@reformtracker.example"
                aria-label="Email"
                className="hover:scale-110 transition-transform duration-200"
              >
                <Image
                  src={gmailLogo}
                  alt="Gmail"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </Link>

              <Link
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:scale-110 transition-transform duration-200"
              >
                <Image
                  src={facebookLogo}
                  alt="Facebook"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-neutral-300">
          <p className="text-xs text-center text-neutral-600 opacity-60">
            © {new Date().getFullYear()} {pageText.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
