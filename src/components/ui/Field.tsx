import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export const controlClass =
  "block w-full rounded-xl border bg-paper px-4 text-base text-ink placeholder:text-stone transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40";

function borderFor(error?: string) {
  return error ? "border-brick focus:border-brick" : "border-line hover:border-sage focus:border-bollard-500";
}

type FieldProps = {
  id: string;
  label: string;
  optionalLabel?: string;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ id, label, optionalLabel, error, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline gap-2 text-sm font-semibold text-ink">
        {label}
        {optionalLabel && <span className="font-normal text-stone">({optionalLabel})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-brick">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextInput({ error, className = "", ...rest }: InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
  return (
    <input
      className={`${controlClass} ${borderFor(error)} h-12 ${className}`}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${rest.id}-error` : undefined}
      {...rest}
    />
  );
}

export function SelectInput({
  error,
  className = "",
  children,
  ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & { error?: string }) {
  return (
    <div className="relative">
      <select
        className={`${controlClass} ${borderFor(error)} h-12 appearance-none pr-10 ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${rest.id}-error` : undefined}
        {...rest}
      >
        {children}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function TextArea({ error, className = "", ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
  return <textarea className={`${controlClass} ${borderFor(error)} min-h-28 py-3 ${className}`} {...rest} />;
}
