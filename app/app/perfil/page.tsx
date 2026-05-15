import { LogoutButton } from "@/components/logout-button";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card } from "@/components/ui/card";
import { requireActiveSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await requireActiveSessionContext();
  const { profile, user } = session;

  return (
    <>
      <PageHeader title="Perfil" />

      <Card className="mt-8 p-5 sm:p-6">
        <dl className="grid gap-5 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Nome</dt>
            <dd className="mt-1 text-base font-medium text-ink">
              {profile?.full_name ?? "Não informado"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">E-mail</dt>
            <dd className="mt-1 text-base font-medium text-ink">
              {profile?.email ?? user.email ?? "Não informado"}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Status</dt>
            <dd className="mt-2">
              <StatusBadge status={session.status} />
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Perfil de acesso</dt>
            <dd className="mt-1 text-base font-medium capitalize text-ink">
              {profile?.role ?? "user"}
            </dd>
          </div>
        </dl>

        <div className="mt-8 border-t border-border pt-5">
          <LogoutButton variant="danger" />
        </div>
      </Card>
    </>
  );
}
