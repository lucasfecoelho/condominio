import Link from "next/link";
import { getButtonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getValidSessionContext } from "@/lib/auth/session";

export default async function NotFound() {
  const session = await getValidSessionContext();
  const href = session?.status === "active" ? "/app" : "/";
  const label = session?.status === "active" ? "Voltar para a área interna" : "Voltar ao início";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-xl p-6 text-center sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
          Página não encontrada
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          A página que você tentou acessar não existe ou foi movida.
        </p>
        <Link
          className={getButtonClassName("primary", "mt-6")}
          href={href}
        >
          {label}
        </Link>
      </Card>
    </main>
  );
}

