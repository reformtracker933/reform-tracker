import React from "react";
import Image from "next/image";

type CardProps = {
  image: string;
  title: string;
  buttonText: string;
  description: string;
  personImage: string;
  person: string;
  date: string;
  color: string;
};

const Card: React.FC<CardProps> = ({
  image,
  title,
  buttonText,
  description,
  personImage,
  person,
  date,
  color,
}) => {
  return (
    <div className="bg-surface rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 max-w-full">
      <div className="flex h-36 sm:h-43">
        {/* Left Image Section */}
        <div className="relative w-1/3 sm:w-[25%] shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Right Content Section */}
        <div className="w-2/3 sm:w-full p-4 flex flex-col justify-between items-start">
          {/* Title and Button Row */}
          <div className="flex items-center justify-between w-full mt-2">
            <p className="text-neutral-900 text-base sm:text-xl tracking-tight line-clamp-2">
              {title}
            </p>

            <button
              className="text-white transition duration-150 rounded-full text-xs sm:text-sm px-4 py-0.5 shrink-0 whitespace-nowrap"
              style={{ backgroundColor: color }}
            >
              {buttonText}
            </button>
          </div>

          {/* Description */}
          <p className="text-neutral-800 text-xs sm:text-sm line-clamp-1 md:block">
            {description}
          </p>

          {/* Footer Info (Person & Date) */}
          <div className="flex items-center gap-5 mb-2">
            <div className="flex items-center">
              <Image
                src={personImage}
                alt="News Source Logo"
                width={20}
                height={20}
                className="inline-block mr-2 rounded-full"
              />
              <p className="text-neutral-600 text-xs sm:text-md">{person}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <p className="text-neutral-600 text-xs sm:text-md">{date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
