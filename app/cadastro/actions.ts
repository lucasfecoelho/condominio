"use server";

import { createClient } from "@/lib/supabase/server";

type RegisterInput = {
  email: string;
  password: string;
};

type RegisterResult =
  | { success: true }
  | { success: false; message: string };

export async function registerWithPassword({
  email,
  password,
}: RegisterInput): Promise<RegisterResult> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        requested_access_status: "pending",
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: "Não foi possível concluir o cadastro. Tente novamente.",
    };
  }

  await supabase.auth.signOut();

  return { success: true };
}

