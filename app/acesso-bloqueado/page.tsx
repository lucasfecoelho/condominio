import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/logout-button";
import { getValidSessionContext } from "@/lib/auth/session";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { uiMessages } from "@/lib/ui/messages";

export const dynamic = "force-dynamic";

export default async function BlockedAccessPage() {
  const session = await getValidSessionContext();

  if (!session) {
    redirect("/login?status=blocked");
  }

  if (!session.profile || !session.status) {
    redirect("/login?reason=profile-incomplete");
  }

  if (session.status === "active") {
    redirect("/app");
  }

  if (session.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex rounded-full bg-error/10 px-3 py-1 text-sm font-medium text-error">
              Acesso bloqueado
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">
              Acesso bloqueado
            </h1>
          </div>

          <LogoutButton />
        </div>

        <Alert className="mt-5" variant="error">
          {uiMessages.accessBlocked}
        </Alert>
      </Card>
    </main>
  );
}
