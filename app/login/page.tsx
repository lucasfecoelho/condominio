import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth-card";
import { PublicAuthShell } from "@/components/public-auth-shell";
import { getValidSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ reason?: string; status?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getValidSessionContext();
  const { reason, status } = await searchParams;

  if (session?.status === "active") {
    redirect("/app");
  }

  if (session?.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  return (
    <PublicAuthShell>
      <AuthCard
        message={
          status === "blocked" || session?.status === "blocked"
            ? "blocked"
            : reason === "session-expired"
              ? "session-expired"
              : undefined
        }
      />
    </PublicAuthShell>
  );
}
