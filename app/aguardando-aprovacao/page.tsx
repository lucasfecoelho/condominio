import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { getValidSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function WaitingApprovalPage() {
  const session = await getValidSessionContext();

  if (!session) {
    redirect("/");
  }

  if (session.status === "active") {
    redirect("/app");
  }

  if (session.status === "blocked") {
    redirect("/login?status=blocked");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <section className="w-full max-w-xl rounded-[2rem] border border-border bg-surface p-6 shadow-soft sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
              Aguardando aprovação
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">
              Seu acesso está em análise
            </h1>
          </div>

          <LogoutButton />
        </div>

        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Cadastro realizado. Seu acesso será analisado antes da liberação.
        </p>
      </section>
    </main>
  );
}

