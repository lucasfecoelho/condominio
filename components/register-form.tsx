"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { registerWithPassword } from "@/app/cadastro/actions";
import { Alert } from "@/components/ui/alert";
import { Button, getButtonClassName } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { uiMessages } from "@/lib/ui/messages";

export function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    if (password.length < 12) {
      setErrorMessage("A senha deve ter pelo menos 12 caracteres.");
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("As senhas não coincidem.");
      setIsLoading(false);
      return;
    }

    const result = await registerWithPassword({
      fullName,
      email,
      password,
      passwordConfirmation,
    });

    if (!result.success) {
      setErrorMessage(result.message);
      setIsLoading(false);
      return;
    }

    setFullName("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setMessage(uiMessages.registrationSubmitted);
    setIsLoading(false);
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <Input
        autoComplete="name"
        id="register-name"
        label="Nome completo"
        name="fullName"
        onChange={(event) => setFullName(event.target.value)}
        placeholder="Seu nome completo"
        required
        type="text"
        value={fullName}
      />

      <Input
        autoComplete="username"
        id="register-email"
        label="E-mail"
        name="email"
        onChange={(event) => setEmail(event.target.value)}
        placeholder="gestor@condominio.com"
        required
        type="email"
        value={email}
      />

      <PasswordInput
        autoComplete="new-password"
        helperText="Use pelo menos 12 caracteres."
        id="register-password"
        label="Senha"
        minLength={12}
        name="password"
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Crie uma senha"
        required
        value={password}
      />

      <PasswordInput
        autoComplete="new-password"
        id="register-password-confirmation"
        label="Confirmar senha"
        minLength={12}
        name="passwordConfirmation"
        onChange={(event) => setPasswordConfirmation(event.target.value)}
        placeholder="Repita a senha"
        required
        value={passwordConfirmation}
      />

      {message ? (
        <Alert variant="success">{message}</Alert>
      ) : null}

      {errorMessage ? (
        <Alert variant="error">{errorMessage}</Alert>
      ) : null}

      <Button
        className="w-full"
        isLoading={isLoading}
        loadingLabel={uiMessages.creatingAccount}
        type="submit"
      >
        Criar conta
      </Button>

      <Link
        className={getButtonClassName("secondary", "w-full")}
        href="/"
      >
        Já tenho conta
      </Link>
    </form>
  );
}
