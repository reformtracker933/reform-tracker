'use client';
// Button.tsx
import React from 'react';
import { CircleArrowRight } from 'lucide-react';

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
      variant: 'card';
      update: Update;
      onClick?: () => void;
    }
  | {
      variant: 'primary';
      pageText: PageText;
      onClick?: () => void;
    };

const Button: React.FC<ButtonProps> = (props) => {
  if (props.variant === 'card') {
    const { update, onClick } = props;
    return (
      <button
        onClick={() => {
          if (onClick) return onClick();
          window.location.href = update.href;
        }}
        className='w-full group bg-white rounded-xl p-5 transition-all duration-150 relative flex flex-col text-left border-2 border-neutral-900 shadow-[4px_4px_0px_#1a1a1a] hover:shadow-[6px_6px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px]'
      >
        <div className='flex items-center justify-between'>
          <div className='ml-1 flex items-center space-x-4 relative'>
            <div
              className='w-4 h-4 rounded-full border-4'
              style={{ borderColor: update.color }}
            ></div>

            <div className='flex flex-col justify-center gap-2'>
              <h3 className='text-lg font-bold text-neutral-900'>
                {update.title}
              </h3>
              <div className='flex flex-row gap-2'>
                <span
                  className='text-xs font-bold text-white px-3 py-1 rounded-lg border-2 border-neutral-900 shadow-[2px_2px_0px_#1a1a1a]'
                  style={{ backgroundColor: update.color }}
                >
                  {update.category}
                </span>
                <span className='text-xs font-bold text-neutral-900 px-3 py-1 rounded-lg bg-neutral-200 border-2 border-neutral-900'>
                  {update.date}
                </span>
              </div>
            </div>
          </div>

          <div className='flex items-center mr-1'>
            <span className='inline-flex items-center px-4 md:px-6 py-2 rounded-lg border-2 border-neutral-900 gap-2 text-xs md:text-sm font-bold shadow-[2px_2px_0px_#1a1a1a]'>
              <div
                className='w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-neutral-900'
                style={{ backgroundColor: update.colorStat }}
              ></div>
              {update.text}
            </span>
          </div>
        </div>
      </button>
    );
  }

  const { pageText, onClick } = props;
  return (
    <button
      onClick={onClick}
      className='inline-flex items-center px-8 py-3 rounded-xl bg-primary text-white text-sm md:text-base font-bold cursor-pointer border-2 border-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-150 gap-2'
    >
      <span>{pageText.viewAll}</span>
      <CircleArrowRight className='w-5 h-5' />
    </button>
  );
};

export default Button;
