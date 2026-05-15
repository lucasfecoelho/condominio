import type { ReactNode } from "react";

export type BadgeVariant = "active" | "pending" | "blocked" | "neutral";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

const badgeClasses: Record<BadgeVariant, string> = {
  active: "bg-success/10 text-success",
  pending: "bg-warning/10 text-warning",
  blocked: "bg-error/10 text-error",
  neutral: "bg-primary-light text-primary",
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${badgeClasses[variant]}`}
    >
      {children}
    </span>
  );
}

