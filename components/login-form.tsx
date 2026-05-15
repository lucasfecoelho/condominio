"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { loginWithPassword } from "@/app/login/actions";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

    router.replace(result.nextPath);
    router.refresh();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="email">
          E-mail
        </label>
        <input
          autoComplete="username"
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 text-base text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
          id="email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="gestor@condominio.com"
          required
          type="email"
          value={email}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700" htmlFor="password">
          Senha
        </label>
        <div className="relative">
          <input
            autoComplete="current-password"
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 pr-14 text-base text-ink outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Digite sua senha"
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
        {isLoading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
