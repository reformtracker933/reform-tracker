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
        className='w-full group bg-gray-100 rounded-full p-5 transition-all duration-200 relative flex flex-col text-left border border-gray-200 hover:border-red-400'
      >
        {/* Main Content Row */}
        <div className='flex items-center justify-between'>
          {/* Left: Double Circle Bullet & Title */}
          <div className='ml-1 flex items-center space-x-3 relative'>
            <div className='relative'>
              <div className='w-6 h-6 relative rounded-full border-20 border-primary-50 flex items-center justify-center'>
                <div className='w-1 h-1 rounded-full border-9 border-primary-200'></div>
              </div>
            </div>
            <h3 className='text-xl text-neutral-900 ml-3'>{update.title}</h3>
            <span
              className='text-xs font-medium text-white mb-1 absolute bottom-7.5 left-16 px-2.5 py-0.5 rounded-full hidden sm:block'
              style={{ backgroundColor: update.color }}
            >
              {update.category}
            </span>
          </div>

          {/* Right: Navigation Circle */}
          <div className='flex items-center mr-1'>
            <div className='w-12 h-12 rounded-full bg-red-50 flex items-center justify-center transition-colors duration-200'>
              <ArrowUpRight className='w-5 h-5 text-neutral-900' />
            </div>
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
      className='inline-flex items-center px-8 py-3 rounded-full bg-primary text-on-primary text-sm md:text-base cursor-pointer hover:bg-primary-400 focus:ring-primary shadow-lg hover:shadow-xl transition duration-200 hover:-translate-y-0.5 gap-1.5'
    >
      <span>{pageText.viewAll}</span>
      <CircleArrowRight className='w-4 h-4' />
    </button>
  );
};

export default Button;
