import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'default' | 'green' | 'amber' | 'red' | 'blue';
}

const tones = {
  default: 'bg-surface-muted text-ink-muted dark:bg-slate-800 dark:text-slate-200',
  green: 'bg-state-successContainer text-brand-tertiaryHover dark:bg-emerald-950 dark:text-emerald-200',
  amber: 'bg-state-warningContainer text-amber-700 dark:bg-amber-950 dark:text-amber-200',
  red: 'bg-state-errorContainer text-state-errorHover dark:bg-red-950 dark:text-red-200',
  blue: 'bg-brand-secondaryContainer text-brand-secondary dark:bg-blue-950 dark:text-blue-200',
};

export function Badge({ tone = 'default', className = '', children, ...props }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${tones[tone]} ${className}`} {...props}>
      {children}
    </span>
  );
}
