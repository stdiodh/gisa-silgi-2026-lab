import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-brand-secondary text-white hover:bg-brand-secondaryHover dark:bg-blue-500 dark:text-white dark:hover:bg-blue-400',
  secondary:
    'border border-line bg-surface text-brand-primary hover:bg-surface-muted dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
  ghost: 'text-ink-muted hover:bg-surface-muted dark:text-slate-300 dark:hover:bg-slate-800',
  danger: 'bg-state-error text-white hover:bg-state-errorHover dark:bg-red-500 dark:text-white dark:hover:bg-red-400',
};

export function Button({ variant = 'secondary', icon, className = '', children, ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
