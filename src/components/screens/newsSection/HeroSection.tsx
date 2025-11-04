"use client";

import Image from "next/image";
import React, { FC } from "react";
import { StaticImageData } from "next/image";

type PageText = Record<string, unknown>;

const HeroSection: FC<{
  pageText: PageText;
  background: StaticImageData | string;
}> = ({ pageText, background }) => {
  return (
    <section className="relative w-full h-[618px] flex items-end justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={background}
          alt="Reform News Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl font-bold text-primary/900 mb-6">
          {String(pageText.title)}
        </h1>
        <p className="text-2xl font-semibold text-primary/800 max-w-lg mx-auto">
          {String(pageText.descriptionOfTitle)}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
