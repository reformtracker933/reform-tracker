'use client';
// Button.tsx
import React from 'react';
import { ArrowUpRight, CircleArrowRight } from 'lucide-react';

type Update = {
  title: string;
  href: string;
  color: string;
  category: string;
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
              <span
                className='text-xs font-bold text-white px-3 py-1 rounded-lg border-2 border-neutral-900 shadow-[2px_2px_0px_#1a1a1a] w-fit'
                style={{ backgroundColor: update.color }}
              >
                {update.category}
              </span>
              <h3 className='text-lg font-bold text-neutral-900'>
                {update.title}
              </h3>
            </div>
          </div>

          <div className='flex items-center mr-1'>
            <div className='w-12 h-12 rounded-xl bg-primary-100 border-2 border-neutral-900 flex items-center justify-center shadow-[2px_2px_0px_#1a1a1a]'>
              <ArrowUpRight className='w-5 h-5 text-neutral-900' />
            </div>
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
