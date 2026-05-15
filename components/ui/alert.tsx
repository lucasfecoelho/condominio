import type { ReactNode } from "react";

type AlertVariant = "info" | "success" | "warning" | "error";

type AlertProps = {
  children: ReactNode;
  className?: string;
  variant?: AlertVariant;
};

const alertClasses: Record<AlertVariant, string> = {
  info: "bg-primary-light text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
};

export function Alert({
  children,
  className = "",
  variant = "info",
}: AlertProps) {
  return (
    <div
      aria-live="polite"
      className={`rounded-2xl px-4 py-3 text-sm ${alertClasses[variant]} ${className}`}
      role={variant === "error" ? "alert" : "status"}
    >
      {children}
    </div>
  );
}
