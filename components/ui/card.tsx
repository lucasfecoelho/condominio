import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <section
      className={`rounded-[2rem] border border-border bg-surface shadow-soft ${className}`}
      {...props}
    />
  );
}

