import type { InputHTMLAttributes } from "react";
import { FormField } from "@/components/ui/form-field";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  helperText?: string;
  label: string;
};

export function Input({
  className = "",
  error,
  helperText,
  id,
  label,
  ...props
}: InputProps) {
  if (!id) {
    throw new Error("Input requires an id.");
  }

  return (
    <FormField error={error} helperText={helperText} id={id} label={label}>
      <input
        aria-describedby={
          error ? `${id}-error` : helperText ? `${id}-helper` : undefined
        }
        aria-invalid={Boolean(error)}
        className={`w-full rounded-2xl border bg-surface px-4 py-3 text-base text-ink outline-none transition focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 ${
          error ? "border-error" : "border-border"
        } ${className}`}
        id={id}
        {...props}
      />
    </FormField>
  );
}

