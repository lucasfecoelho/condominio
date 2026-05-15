type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header>
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

