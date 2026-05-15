"use client";

import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { FormField } from "@/components/ui/form-field";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  error?: string;
  helperText?: string;
  label: string;
};

export function PasswordInput({
  className = "",
  error,
  helperText,
  id,
  label,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!id) {
    throw new Error("PasswordInput requires an id.");
  }

  return (
    <FormField error={error} helperText={helperText} id={id} label={label}>
      <div className="relative">
        <input
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          aria-invalid={Boolean(error)}
          className={`w-full rounded-2xl border bg-surface px-4 py-3 pr-14 text-base text-ink outline-none transition focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 ${
            error ? "border-error" : "border-border"
          } ${className}`}
          id={id}
          type={isVisible ? "text" : "password"}
          {...props}
        />
        <button
          aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted transition hover:text-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20"
          onClick={() => setIsVisible((current) => !current)}
          type="button"
        >
          <EyeIcon isVisible={isVisible} />
        </button>
      </div>
    </FormField>
  );
}

function EyeIcon({ isVisible }: { isVisible: boolean }) {
  if (isVisible) {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path
          d="M3 3l18 18M10.6 10.6a2 2 0 102.8 2.8M9.9 4.2A10.9 10.9 0 0112 4c5 0 8.5 4 9.5 8a11.8 11.8 0 01-3.2 5.3M6.1 6.1A12 12 0 002.5 12C3.5 16 7 20 12 20c1.4 0 2.7-.3 3.8-.8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M2.5 12S5.5 6 12 6s9.5 6 9.5 6-3 6-9.5 6-9.5-6-9.5-6z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

