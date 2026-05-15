import { LogoutButton } from "@/components/logout-button";
import { requireActiveSessionUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AppPage() {
  await requireActiveSessionUser();

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl rounded-[2rem] border border-border bg-surface/95 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-6 inline-flex rounded-full bg-primary-light px-3 py-1 text-sm font-medium text-primary">
              Área autenticada
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Bem-vindo ao Condomínio
            </h1>
          </div>

          <LogoutButton />
        </div>

        <p className="mt-3 text-base leading-7 text-muted sm:text-lg">
          A estrutura inicial do aplicativo está pronta para receber as próximas funcionalidades.
        </p>

        <div className="mt-8 rounded-3xl border border-border bg-primary-light p-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
            Primeira versão
          </p>
          <p className="mt-3 text-sm leading-6 text-ink sm:text-base">
            Esta é a primeira versão da área interna. As funcionalidades de gestão serão adicionadas nas próximas etapas.
          </p>
        </div>
      </section>
    </main>
  );
}
