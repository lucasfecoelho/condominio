"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { registerWithPassword } from "@/app/cadastro/actions";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    const result = await registerWithPassword({ email, password });

    if (!result.success) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    }

    setEmail("");
    setPassword("");
    setMessage("Cadastro realizado. Seu acesso será analisado antes da liberação.");
    setIsLoading(false);
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="register-email">
          E-mail
        </label>
        <input
          autoComplete="username"
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          id="register-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="gestor@condominio.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-ink" htmlFor="register-password">
          Senha
        </label>
        <div className="relative">
          <input
            autoComplete="new-password"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 pr-14 text-base text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            id="register-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Crie uma senha"
            required
            type={isPasswordVisible ? "text" : "password"}
            value={password}
          />
          <button
            aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted transition hover:text-primary"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            {isPasswordVisible ? "◉" : "◎"}
          </button>
        </div>
      </div>

      {message ? (
        <p
          aria-live="polite"
          className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-success"
        >
          {message}
        </p>
      ) : null}

      {errorMessage ? (
        <p
          aria-live="polite"
          className="rounded-2xl bg-error/10 px-4 py-3 text-sm text-error"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        className="flex w-full items-center justify-center rounded-2xl bg-primary px-4 py-3 text-base font-medium text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isLoading}
        type="submit"
      >
        {isLoading ? "Enviando..." : "Criar conta"}
      </button>

      <Link
        className="flex w-full items-center justify-center rounded-2xl border border-border px-4 py-3 text-base font-medium text-muted transition hover:border-primary hover:text-primary"
        href="/"
      >
        Voltar para login
      </Link>
    </form>
  );
}

