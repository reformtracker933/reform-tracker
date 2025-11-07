"use client";
// Button.tsx
import React from "react";
import { CircleArrowRight } from "lucide-react";

type Update = {
  title: string;
  href: string;
  color: string;
  category: string;
  date: string;
  text: string;
  colorStat: string;
  borderColor: string;
};

type PageText = {
  viewAll: string;
};

type ButtonProps =
  | {
      variant: "card";
      update: Update;
      onClick?: () => void;
    }
  | {
      variant: "primary";
      pageText: PageText;
      onClick?: () => void;
    };

const Button: React.FC<ButtonProps> = (props) => {
  if (props.variant === "card") {
    const { update, onClick } = props;
    return (
      <button
        onClick={() => {
          if (onClick) return onClick();
          window.location.href = update.href;
        }}
        className="w-full group bg-neutral-100 rounded-full p-5 transition-all duration-200 relative flex flex-col text-left border border-neutral-200 hover:border-primary-400"
      >
        {/* Main Content Row */}
        <div className="flex items-center justify-between">
          {/* Left: Double Circle Bullet & Title */}
          <div className="ml-1 flex items-center space-x-3 relative">
            <div className="relative">
              <div className="w-6 h-6 relative rounded-full border-20 border-primary-50 flex items-center justify-center">
                <div className="w-1 h-1 rounded-full border-9 border-primary-200"></div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-2">
              <h3 className="text-xl text-neutral-900">{update.title}</h3>
              <div className="flex flex-row gap-2">
                <span
                  className="text-xs font-medium text-primary-50 px-2.5 py-1 rounded-full w-fit"
                  style={{ backgroundColor: update.color }}
                >
                  {update.category}
                </span>
                <span className="text-xs font-medium text-primary-50 px-2.5 py-1 rounded-full w-fit bg-neutral-400">
                  {update.date}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Navigation Circle */}
          <div className="flex items-center mr-1">
            {/* <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center transition-colors duration-200">
              <ArrowUpRight className="w-5 h-5 text-neutral-900" />
            </div> */}
            <span
              className="inline-flex items-center px-4 md:px-6 py-2 rounded-full border gap-1 text-xs md:text-sm"
              style={{ borderColor: update.borderColor }}
            >
              <div
                className="w-3 h-3 md:w-4 md:h-4 rounded-full"
                style={{ backgroundColor: update.colorStat }}
              ></div>
              {update.text}
            </span>
          </div>
        </div>
      </button>
    );
  }

  // variant === "primary"
  const { pageText, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-on-primary text-sm md:text-base cursor-pointer hover:bg-primary-400 focus:ring-primary shadow-lg hover:shadow-xl transition duration-200 hover:-translate-y-0.5 gap-1.5"
    >
      <span>{pageText.viewAll}</span>
      <CircleArrowRight className="w-4 h-4" />
    </button>
  );
};

export default Button;
