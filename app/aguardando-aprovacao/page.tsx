import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { getValidSessionContext } from "@/lib/auth/session";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { uiMessages } from "@/lib/ui/messages";

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
    redirect("/acesso-bloqueado");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
              Aguardando aprovação
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">
              Cadastro recebido
            </h1>
          </div>

          <LogoutButton />
        </div>

        <Alert className="mt-5" variant="warning">
          {uiMessages.accessPending}
        </Alert>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
          Assim que for liberado, você poderá  ter acessao ao sistema normalmente.
        </p>
      </Card>
    </main>
  );
}
