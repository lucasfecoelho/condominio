import { redirect } from "next/navigation";
import { PublicAuthShell } from "@/components/public-auth-shell";
import { RegisterForm } from "@/components/register-form";
import { getValidSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function RegisterPage() {
  const session = await getValidSessionContext();

  if (session?.status === "active") {
    redirect("/app");
  }

  if (session?.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  if (session?.status === "blocked") {
    redirect("/login?status=blocked");
  }

  return (
    <PublicAuthShell>
      <div className="w-full max-w-md rounded-[2rem] border border-border bg-surface p-5 shadow-soft sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
          Novo acesso
        </p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
          Criar conta
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          Envie seus dados para análise de acesso ao Condomínio.
        </p>

        <RegisterForm />
      </div>
    </PublicAuthShell>
  );
}

