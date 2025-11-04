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
    <div className="bg-neutral-100 rounded-xl md:rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 w-full">
      <div className="flex flex-row h-auto min-h-[140px] md:min-h-40">
        {/* Left Image Section */}
        <div className="relative w-[120px] md:w-[140px] lg:w-40 shrink-0">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
          {/* Title and Button Row */}
          <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between w-full">
            <h3 className="text-neutral-900 text-sm md:text-base lg:text-lg font-medium line-clamp-2 flex-1">
              {title}
            </h3>

            <button
              className="text-white transition duration-150 rounded-full text-xs md:text-sm px-3 md:px-4 py-1 shrink-0 self-start"
              style={{ backgroundColor: color }}
            >
              {buttonText}
            </button>
          </div>

          {/* Description */}
          <p className="text-neutral-700 text-xs md:text-sm line-clamp-1 md:line-clamp-2 my-1 md:my-2">
            {description}
          </p>

          {/* Footer Info (Person & Date) */}
          <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 md:gap-2">
              <Image
                src={personImage}
                alt="Author"
                width={16}
                height={16}
                className="rounded-full md:w-5 md:h-5"
              />
              <span className="text-neutral-600">{person}</span>
            </div>
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-neutral-400 rounded-full"></div>
              <span className="text-neutral-600">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
