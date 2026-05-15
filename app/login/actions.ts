"use server";

import { createClient } from "@/lib/supabase/server";
import { clearAppSession, startAppSession } from "@/lib/auth/session";
import { getProfileForUser, normalizeEmail } from "@/lib/auth/profile";
import { uiMessages } from "@/lib/ui/messages";

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
    email: normalizeEmail(email),
    password,
  });

  if (error) {
    return {
      success: false,
      message: uiMessages.invalidLogin,
    };
  }

  const profile = await getProfileForUser(data.user, supabase);

  if (!profile) {
    await supabase.auth.signOut();
    await clearAppSession();

    return {
      success: false,
      message: uiMessages.profileIncomplete,
    };
  }

  await startAppSession();

  const status = profile.status;

  if (status === "active") {
    return { success: true, nextPath: "/app" };
  }

  if (status === "pending") {
    return { success: true, nextPath: "/aguardando-aprovacao" };
  }

  return { success: true, nextPath: "/acesso-bloqueado" };
}
