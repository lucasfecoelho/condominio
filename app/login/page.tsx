import { redirect } from "next/navigation";
import { AuthCard } from "@/components/auth-card";
import { PublicAuthShell } from "@/components/public-auth-shell";
import { getValidSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getValidSessionContext();
  const { status } = await searchParams;

  if (session?.status === "active") {
    redirect("/app");
  }

  if (session?.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  return (
    <PublicAuthShell>
      <AuthCard blockedMessage={status === "blocked" || session?.status === "blocked"} />
    </PublicAuthShell>
  );
}
