import Link from "next/link";
import { LoginForm } from "@/components/login-form";

type AuthCardProps = {
  blockedMessage?: boolean;
};

export function AuthCard({ blockedMessage = false }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-[2rem] border border-border bg-surface p-5 shadow-soft sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
        Acesso seguro
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
        Acesse sua conta
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
        Entre para continuar no Condomínio.
      </p>

      {blockedMessage ? (
        <p className="mt-5 rounded-2xl bg-error/10 px-4 py-3 text-sm text-error">
          Seu acesso está bloqueado no momento. Entre em contato com a
          administração para mais informações.
        </p>
      ) : null}

      <LoginForm />

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted">
          Ainda não tem acesso?
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <Link
        className="flex w-full items-center justify-center rounded-2xl border border-primary px-4 py-3 text-base font-medium text-primary transition hover:bg-primary-light"
        href="/cadastro"
      >
        Criar conta
      </Link>
    </div>
  );
}

