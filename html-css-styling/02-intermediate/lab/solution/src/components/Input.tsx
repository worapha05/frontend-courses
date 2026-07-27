import type { InputHTMLAttributes } from 'react';
import { cn } from '../lib/cn';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ id, label, error, className, ...props }: InputProps) {
  const inputId = id ?? String(props.name ?? label);
  return (
    <label className="grid gap-1.5 text-sm" htmlFor={inputId}>
      <span className="font-semibold">{label}</span>
      <input
        id={inputId}
        className={cn(
          'rounded-lg border border-stone-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-brand-700 dark:border-stone-700 dark:bg-stone-900',
          error && 'border-rose-500 focus:ring-rose-500',
          className,
        )}
        aria-invalid={Boolean(error) || undefined}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${inputId}-error`} className="text-rose-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
