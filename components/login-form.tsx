"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithPassword } from "@/app/login/actions";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { uiMessages } from "@/lib/ui/messages";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const result = await loginWithPassword({
      email,
      password,
    });

    if (!result.success) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    }

    setIsRedirecting(true);
    router.replace(result.nextPath);
    router.refresh();
  }

  return (
    <form className="mt-7 space-y-5 sm:mt-8" onSubmit={handleSubmit}>
      <Input
        autoComplete="username"
        id="email"
        label="E-mail"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="gestor@condominio.com"
        required
        type="email"
        value={email}
      />

      <PasswordInput
        autoComplete="current-password"
        id="password"
        label="Senha"
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Digite sua senha"
        required
        value={password}
      />

      {errorMessage ? (
        <Alert variant="error">{errorMessage}</Alert>
      ) : null}

      <Button
        className="w-full"
        isLoading={isLoading || isRedirecting}
        loadingLabel={
          isRedirecting ? uiMessages.redirecting : uiMessages.loggingIn
        }
        type="submit"
      >
        Entrar
      </Button>
    </form>
  );
}
