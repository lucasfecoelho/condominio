"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4 py-8">
      <Card className="w-full max-w-xl p-6 text-center sm:p-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-error">
          Erro
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
          Algo deu errado
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Ocorreu um erro inesperado. Tente novamente.
        </p>
        <Button className="mt-6" onClick={() => reset()} type="button">
          Tentar novamente
        </Button>
      </Card>
    </main>
  );
}
