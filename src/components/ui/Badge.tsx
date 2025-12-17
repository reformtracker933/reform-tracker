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
    'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full';

  const variantStyles = {
    default: 'text-white',
    outline: 'bg-transparent border border-neutral-300 text-neutral-700',
    neutral: 'bg-neutral-200 text-neutral-700',
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
