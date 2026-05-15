import type { ReactNode } from "react";
import { AppNavigation } from "@/components/app-navigation";
import { LogoutButton } from "@/components/logout-button";
import type { AppProfile } from "@/lib/auth/profile";

type AppShellProps = {
  children: ReactNode;
  profile: AppProfile | null;
};

export function AppShell({ children, profile }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="hidden min-h-dvh flex-col bg-primary px-5 py-6 text-white lg:sticky lg:top-0 lg:flex lg:h-dvh">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-white/60">
            Condomínio
          </p>
          <p className="mt-3 text-lg font-semibold">
            Área interna
          </p>
        </div>

        <div className="mt-10">
          <AppNavigation variant="desktop" />
        </div>

        <div className="mt-auto space-y-4 pt-8">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
            <p className="truncate text-sm font-medium">
              {profile?.full_name ?? "Usuário"}
            </p>
            <p className="mt-1 truncate text-sm text-white/65">
              {profile?.email ?? "perfil pendente"}
            </p>
          </div>

          <LogoutButton variant="danger" />
        </div>
      </aside>

      <div className="min-h-dvh pb-24 lg:pb-0">
        <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </div>
      </div>

      <AppNavigation variant="mobile" />
    </div>
  );
}
