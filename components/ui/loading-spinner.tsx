type LoadingSpinnerProps = {
  className?: string;
};

export function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-r-transparent ${className}`}
    />
  );
}

