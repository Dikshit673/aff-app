import { type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | React.ReactNode;
  className?: string;
}

export const Button = ({ label, className = '', ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'inline-block rounded-lg bg-blue-600 px-4 py-1.5 text-white capitalize active:scale-95',
        className
      )}
    >
      {label}
    </button>
  );
};
