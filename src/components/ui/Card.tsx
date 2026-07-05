import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  action?: ReactNode;
}

export function Card({ title, action, className = '', children, ...props }: CardProps) {
  return (
    <section
      className={`rounded-2xl border border-line-subtle bg-surface p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] dark:border-slate-800 dark:bg-slate-900 ${className}`}
      {...props}
    >
      {(title || action) && (
        <div className="mb-5 flex items-start justify-between gap-4">
          {title && <h2 className="text-xl font-bold leading-snug text-ink dark:text-white">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
