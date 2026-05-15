import type { ReactNode } from "react";

type FormFieldProps = {
  children: ReactNode;
  error?: string;
  helperText?: string;
  id: string;
  label: string;
};

export function FormField({
  children,
  error,
  helperText,
  id,
  label,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-ink" htmlFor={id}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-error" id={`${id}-error`}>
          {error}
        </p>
      ) : helperText ? (
        <p className="text-sm text-muted" id={`${id}-helper`}>
          {helperText}
        </p>
      ) : null}
    </div>
  );
}

