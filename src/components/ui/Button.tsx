import React from "react";
import Link from "next/link";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "navbar" | "rounded";
  size?: "sm" | "md" | "lg" | "xm";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-primary text-white hover:bg-primary-400 focus:ring-primary shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary:
      "bg-white dark:bg-gray-800 text-foreground border border-neutral-200 dark:border-gray-700 hover:bg-neutral-100 dark:hover:bg-gray-700 focus:ring-neutral-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline:
      "bg-transparent text-foreground border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary",
    navbar:
      "bg-transparent text-foreground hover:bg-[#C1D3E5] hover:text-[#4A7EC9] border-none rounded-full",
    rounded: "rounded-full",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    xm: "px-6 py-2 text-base",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
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
