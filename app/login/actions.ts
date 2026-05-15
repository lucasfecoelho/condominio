"use server";

import { createClient } from "@/lib/supabase/server";
import { startAppSession } from "@/lib/auth/session";
import { getUserAccessStatus } from "@/lib/auth/access-status";

type LoginInput = {
  email: string;
  password: string;
};

type LoginResult =
  | { success: true; nextPath: string }
  | { success: false; message: string };

export async function loginWithPassword({
  email,
  password,
}: LoginInput): Promise<LoginResult> {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      success: false,
      message: "Não foi possível entrar. Verifique seu e-mail e senha.",
    };
  }

  await startAppSession();

  const status = getUserAccessStatus(data.user);

  if (status === "active") {
    return { success: true, nextPath: "/app" };
  }

  if (status === "pending") {
    return { success: true, nextPath: "/aguardando-aprovacao" };
  }

  return { success: true, nextPath: "/login?status=blocked" };
}
