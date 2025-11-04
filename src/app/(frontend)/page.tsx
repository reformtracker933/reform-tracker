"use client";

import { Hero } from "@/components/screens/landing/Hero";
import { Newsletter } from "@/components/screens/landing/Newsletter";
import { ReformNews } from "@/components/screens/landing/ReformNews";
import { ReformUpdate } from "@/components/screens/landing/ReformUpdate";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <div className="px-4 w-full">
        <ReformNews />
        <ReformUpdate />
        <Newsletter />
      </div>
    </div>
  );
}
