"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    href: "/app/visao-geral",
    label: "Visão geral",
    shortLabel: "Visão",
    icon: "overview",
  },
  {
    href: "/app/gestao",
    label: "Gestão",
    shortLabel: "Gestão",
    icon: "management",
  },
  {
    href: "/app/perfil",
    label: "Perfil",
    shortLabel: "Perfil",
    icon: "profile",
  },
  {
    href: "/app/configuracoes",
    label: "Configurações",
    shortLabel: "Config.",
    icon: "settings",
  },
] as const;

type AppNavigationProps = {
  variant: "desktop" | "mobile";
};

export function AppNavigation({ variant }: AppNavigationProps) {
  const pathname = usePathname();

  if (variant === "mobile") {
    return (
      <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-surface/95 px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4 gap-2">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href === "/app/visao-geral" && pathname === "/app");

            return (
              <Link
                className={`flex min-h-14 flex-col items-center justify-center rounded-2xl px-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-primary-light text-primary"
                    : "text-muted hover:text-primary"
                }`}
                href={item.href}
                key={item.href}
              >
                <NavigationIcon name={item.icon} />
                <span className="mt-1">{item.shortLabel}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <nav className="space-y-2">
      {items.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href === "/app/visao-geral" && pathname === "/app");

        return (
          <Link
            className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-white text-primary"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
            href={item.href}
            key={item.href}
          >
            <NavigationIcon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type NavigationIconProps = {
  name: (typeof items)[number]["icon"];
};

function NavigationIcon({ name }: NavigationIconProps) {
  if (name === "overview") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "management") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M4 19h16M6 19V8h12v11M9 8V5h6v3M9 12h2m2 0h2m-6 4h2m2 0h2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (name === "profile") {
    return (
      <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
        <path d="M20 21a8 8 0 10-16 0M12 13a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
      <path d="M12 15.5A3.5 3.5 0 1012 8.5a3.5 3.5 0 000 7zm8-3.5l2-1-2-3.5-2.2.4a8.7 8.7 0 00-1.3-.8L16 4h-4l-.5 2.1c-.5.2-.9.5-1.3.8L8 6.5 6 10l2 1a7.5 7.5 0 000 2L6 14l2 3.5 2.2-.4c.4.3.8.6 1.3.8L12 20h4l.5-2.1c.5-.2.9-.5 1.3-.8l2.2.4 2-3.5-2-1a7.5 7.5 0 000-2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}
