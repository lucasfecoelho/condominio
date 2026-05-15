"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ensurePendingProfileForSignupUser,
  hasProfileForEmail,
  normalizeEmail,
} from "@/lib/auth/profile";
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
  const normalizedEmail = normalizeEmail(email);

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

  try {
    if (await hasProfileForEmail(normalizedEmail, supabase)) {
      return {
        success: false,
        message: uiMessages.duplicateRegistration,
      };
    }
  } catch {
    return {
      success: false,
      message: uiMessages.genericError,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: normalizedEmail,
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
      message:
        error.code === "user_already_exists"
          ? uiMessages.duplicateRegistration
          : uiMessages.genericError,
    };
  }

  if (!data.user) {
    return {
      success: false,
      message: uiMessages.genericError,
    };
  }

  try {
    // Auth pode criar o usuário antes da persistência do perfil. Nunca exibimos
    // sucesso sem confirmar o perfil, para não deixar um usuário Auth sem perfil
    // parecer um cadastro concluído.
    const profileCreated = await ensurePendingProfileForSignupUser(
      {
        email: normalizedEmail,
        fullName,
        userId: data.user.id,
      },
      supabase,
    );

    if (!profileCreated) {
      return {
        success: false,
        message: uiMessages.profileIncomplete,
      };
    }
  } catch {
    return {
      success: false,
      message: uiMessages.profileIncomplete,
    };
  }

  await supabase.auth.signOut();

  return { success: true };
}
