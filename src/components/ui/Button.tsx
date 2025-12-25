import React from 'react';
import Link from 'next/link';

export interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'navbar'
    | 'warning'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xm';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed border-2 border-neutral-900';

  const variantStyles = {
    primary:
      'bg-primary text-white shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px]',
    secondary:
      'bg-secondary text-white shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px]',
    outline:
      'bg-white text-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-neutral-100 active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px]',
    navbar:
      'bg-transparent text-neutral-900 border-transparent shadow-none hover:bg-warning hover:border-neutral-900 hover:shadow-[2px_2px_0px_#1a1a1a] rounded-full',
    warning:
      'bg-warning text-neutral-900 shadow-[3px_3px_0px_#1a1a1a] hover:shadow-[5px_5px_0px_#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] active:shadow-[1px_1px_0px_#1a1a1a] active:translate-x-[2px] active:translate-y-[2px]',
    ghost:
      'bg-transparent text-neutral-900 border-transparent shadow-none hover:bg-neutral-100',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    xm: 'px-5 py-2 text-base',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
