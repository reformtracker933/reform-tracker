import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'neutral';
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  children,
  variant = 'default',
  className = '',
  style,
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border-2 border-neutral-900';

  const variantStyles = {
    default: 'text-white shadow-[2px_2px_0px_#1a1a1a]',
    outline: 'bg-white text-neutral-900 shadow-[2px_2px_0px_#1a1a1a]',
    neutral: 'bg-neutral-100 text-neutral-900 shadow-[2px_2px_0px_#1a1a1a]',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      style={style}
    >
      {children}
    </span>
  );
}
