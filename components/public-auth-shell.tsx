import type { ReactNode } from "react";
import { CondominioIllustration } from "@/components/condominio-illustration";

type PublicAuthShellProps = {
  children: ReactNode;
};

export function PublicAuthShell({ children }: PublicAuthShellProps) {
  return (
    <main className="min-h-dvh bg-background lg:grid lg:h-dvh lg:min-h-0 lg:grid-cols-[11fr_9fr] lg:overflow-hidden">
      <section className="relative overflow-hidden bg-primary px-5 py-6 text-white sm:px-8 sm:py-8 lg:flex lg:min-h-0 lg:flex-col lg:justify-between lg:px-12 lg:py-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),_transparent_32%),linear-gradient(135deg,_rgba(15,39,66,1),_rgba(22,58,95,0.94))]" />

        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-white/70">
            Condomínio
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight sm:text-4xl lg:mt-5 lg:text-5xl">
            Gestão condominial simples, segura e organizada.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:mt-4 sm:text-base">
            Acesse informações e recursos em um ambiente protegido, preparado
            para uso no celular e no computador.
          </p>
        </div>

        <div className="relative z-10 mt-6 hidden sm:block lg:mt-8">
          <CondominioIllustration />
        </div>
      </section>

      <section className="flex items-center justify-center bg-background px-4 py-5 sm:px-6 sm:py-8 lg:min-h-0 lg:px-10">
        {children}
      </section>
    </main>
  );
}
