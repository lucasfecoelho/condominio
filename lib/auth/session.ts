import "server-only";

import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  APP_LOGIN_AT_COOKIE,
  APP_SESSION_MAX_AGE_SECONDS,
  hasAppSessionExpired,
} from "@/lib/auth/session-policy";
import {
  getProfileForUser,
  type AppProfile,
  type ProfileStatus,
} from "@/lib/auth/profile";
import { createClient } from "@/lib/supabase/server";

function getCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: APP_SESSION_MAX_AGE_SECONDS,
  };
}

export async function startAppSession() {
  const cookieStore = await cookies();

  cookieStore.set(
    APP_LOGIN_AT_COOKIE,
    new Date().toISOString(),
    getCookieOptions(),
  );
}

export async function clearAppSession() {
  const cookieStore = await cookies();
  cookieStore.delete(APP_LOGIN_AT_COOKIE);
}

export type ValidSessionContext = {
  user: User;
  profile: AppProfile | null;
  status: ProfileStatus | null;
};

export type ActiveSessionContext = {
  user: User;
  profile: AppProfile;
  status: "active";
};

export async function getValidSessionContext(): Promise<ValidSessionContext | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const cookieStore = await cookies();
  const loginStartedAt = cookieStore.get(APP_LOGIN_AT_COOKIE)?.value;

  if (hasAppSessionExpired(loginStartedAt)) {
    await supabase.auth.signOut();
    await clearAppSession();
    return null;
  }

  const profile = await getProfileForUser(user, supabase);

  return {
    user,
    profile,
    status: profile?.status ?? null,
  };
}

export async function requireActiveSessionContext(): Promise<ActiveSessionContext> {
  const session = await getValidSessionContext();

  if (!session) {
    redirect("/");
  }

  if (!session.profile || !session.status) {
    redirect("/login?reason=profile-incomplete");
  }

  if (session.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  if (session.status === "blocked") {
    redirect("/acesso-bloqueado");
  }

  return {
    ...session,
    profile: session.profile,
    status: "active",
  };
}
