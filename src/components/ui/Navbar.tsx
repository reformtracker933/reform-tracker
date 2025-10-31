"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { useLocale } from "@/context/LocaleContext";
import { mainLogoBn } from "@/assets";

export default function Navbar() {
  const { getTranslation } = useLocale();
  const pageText = getTranslation("navBar");

  const navItems: { label: string; href: string }[] = [
    { label: pageText.home, href: "/" },
    { label: pageText.dashboard, href: "/dashboard" },
    { label: pageText.parties, href: "/parties" },
    { label: pageText.asset, href: "/asset" },
    { label: pageText.news, href: "/news" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-[#FFFFFF]/65 py-2.5">
      <div className="max-w-7xl mx-auto">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <Link href="/" aria-label="Home">
              <Image
                src={mainLogoBn}
                alt="Reform Tracker logo"
                width={160}
                height={160}
                priority={true}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Center: nav buttons */}
          <nav className="hidden md:flex justify-center space-x-3 items-center">
            {navItems.map((item) => (
              <Button
                href={item.href}
                key={item.href}
                variant="navbar"
                size="xm"
                className="cursor-pointer"
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Right: Subscribe */}
          <div className="flex items-center">
            <Link href="/subscribe">
              <button className="bg-[#4A7EC9] text-[#FFFFFF] color-secondary-foreground rounded-full px-7 py-2 cursor-pointer hover:scale-105 transition-transform duration-200">
                {pageText.subscribe}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
