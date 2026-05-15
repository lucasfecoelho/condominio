import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  isLoading?: boolean;
  loadingLabel?: string;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "border border-border bg-surface text-muted hover:border-primary hover:text-primary",
  success: "bg-success text-white hover:bg-secondary-hover",
  danger: "border border-error bg-error text-white hover:border-error-hover hover:bg-error-hover",
  ghost: "bg-transparent text-muted hover:bg-primary-light hover:text-primary",
};

export function getButtonClassName(
  variant: ButtonVariant = "primary",
  className = "",
) {
  return `inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-base font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70 ${variantClasses[variant]} ${className}`;
}

export function Button({
  children,
  className = "",
  disabled,
  isLoading = false,
  loadingLabel,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={getButtonClassName(variant, className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <LoadingSpinner className="h-4 w-4" /> : null}
      {isLoading && loadingLabel ? loadingLabel : children}
    </button>
  );
}

