"use server";

import { createClient } from "@/lib/supabase/server";
import { uiMessages } from "@/lib/ui/messages";

type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

type RegisterResult =
  | { success: true }
  | { success: false; message: string };

export async function registerWithPassword({
  fullName,
  email,
  password,
  passwordConfirmation,
}: RegisterInput): Promise<RegisterResult> {
  if (fullName.trim().length < 3) {
    return {
      success: false,
      message: "Informe seu nome completo.",
    };
  }

  if (password.length < 12) {
    return {
      success: false,
      message: "A senha deve ter pelo menos 12 caracteres.",
    };
  }

  if (password !== passwordConfirmation) {
    return {
      success: false,
      message: "As senhas não coincidem.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName.trim(),
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: uiMessages.genericError,
    };
  }

  await supabase.auth.signOut();

  return { success: true };
}
