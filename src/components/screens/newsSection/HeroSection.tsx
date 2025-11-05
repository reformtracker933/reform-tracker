"use client";

import Image from "next/image";
import React, { FC } from "react";
import { StaticImageData } from "next/image";
import { RTLTranslations } from "@/types/translations.generated";

const HeroSection: FC<{
  pageText: RTLTranslations["reformNews"];
  background: StaticImageData | string;
}> = ({ pageText, background }) => {
  return (
    <section className="relative w-full">
      <div className="relative w-full">
        <div className="h-[60vh] w-full">
          <Image
            src={background}
            alt="Reform News Background"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary/900 mb-4 md:mb-6">
              {pageText.title}
            </h1>
            <p className="text-lg md:text-2xl font-semibold text-primary/800">
              {pageText.descriptionOfTitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
