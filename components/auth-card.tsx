import Link from "next/link";
import { LoginForm } from "@/components/login-form";
import { Alert } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { getButtonClassName } from "@/components/ui/button";
import { uiMessages } from "@/lib/ui/messages";

type AuthCardProps = {
  message?: "blocked" | "profile-incomplete" | "session-expired";
};

export function AuthCard({ message }: AuthCardProps) {
  return (
    <Card className="w-full max-w-md p-5 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-secondary">
        Acesso seguro
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">
        Acesse sua conta
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
        Entre para continuar no Condomínio.
      </p>

      {message ? (
        <Alert
          className="mt-5"
          variant={message === "blocked" ? "error" : "warning"}
        >
          {message === "blocked"
            ? uiMessages.accessBlocked
            : message === "profile-incomplete"
              ? uiMessages.profileIncomplete
              : uiMessages.sessionExpired}
        </Alert>
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
        className={getButtonClassName(
          "secondary",
          "w-full border-primary text-primary hover:bg-primary-light",
        )}
        href="/cadastro"
      >
        Criar conta
      </Link>
    </Card>
  );
}
