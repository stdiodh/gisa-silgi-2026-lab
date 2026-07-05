import { forwardRef } from 'react';
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function TextInput(
  props,
  ref,
) {
  return (
    <input
      ref={ref}
      {...props}
      className={`focus-ring min-h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${props.className ?? ''}`}
    />
  );
});

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`focus-ring min-h-28 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm leading-6 text-ink placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${props.className ?? ''}`}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`focus-ring min-h-11 w-full rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${props.className ?? ''}`}
    />
  );
}
