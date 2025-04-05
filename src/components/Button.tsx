import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseClasses = 'rounded-full font-medium transition-colors';
  
  const variantClasses = {
    primary: 'bg-foreground text-background border border-solid border-transparent hover:bg-[#383838] dark:hover:bg-[#ccc]',
    secondary: 'border border-solid border-black/[.08] dark:border-white/[.145] hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent',
  };
  
  const sizeClasses = {
    small: 'text-xs px-3 py-1',
    medium: 'text-sm px-4 py-2',
    large: 'text-base px-5 py-3',
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 