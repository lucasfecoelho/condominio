import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { requireActiveSessionContext } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function AuthenticatedAppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireActiveSessionContext();

  return <AppShell profile={session.profile}>{children}</AppShell>;
}

