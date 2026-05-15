import { AuthCard } from "@/components/auth-card";
import { PublicAuthShell } from "@/components/public-auth-shell";

export default function Home() {
  return (
    <PublicAuthShell>
      <AuthCard />
    </PublicAuthShell>
  );
}
