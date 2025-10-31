import React from 'react';
import { Mail } from 'lucide-react';

type ButtonProps = {
  variant: 'primary' | 'secondary';
  text: string;
};

const Button: React.FC<ButtonProps> = ({ variant, text }) => {
  if (variant === 'primary') {
    return (
      <button className='w-full font-medium sm:w-auto min-w-[196px] border border-primary-200 text-neutral-600 px-5 py-3 rounded-full cursor-pointer hover:-translate-y-0.5 transition duration-200 flex items-center justify-center gap-2'>
        <Mail className='w-4 h-4' />
        {text}
      </button>
    );
  }

  return (
    <button className='w-full font-medium text-on-primary sm:w-auto min-w-[162px] bg-primary px-5 py-2.5 rounded-full text-lg cursor-pointer hover:-translate-y-0.5 transition duration-200'>
      {text}
    </button>
  );
};

export default Button;
