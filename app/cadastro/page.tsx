import { redirect } from "next/navigation";
import { PublicAuthShell } from "@/components/public-auth-shell";
import { RegisterForm } from "@/components/register-form";
import { getValidSessionContext } from "@/lib/auth/session";
import { Card } from "@/components/ui/card";

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
      <Card className="w-full max-w-md p-5 sm:p-8">
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
      </Card>
    </PublicAuthShell>
  );
}
