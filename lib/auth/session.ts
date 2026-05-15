import "server-only";

import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  APP_LOGIN_AT_COOKIE,
  APP_SESSION_MAX_AGE_SECONDS,
  hasAppSessionExpired,
} from "@/lib/auth/session-policy";
import { getUserAccessStatus, type AccessStatus } from "@/lib/auth/access-status";
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
  status: AccessStatus;
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

  return {
    user,
    status: getUserAccessStatus(user),
  };
}

export async function getValidSessionUser(): Promise<User | null> {
  const session = await getValidSessionContext();
  return session?.user ?? null;
}

export async function requireValidSessionUser() {
  const user = await getValidSessionUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function requireActiveSessionUser() {
  const session = await getValidSessionContext();

  if (!session) {
    redirect("/");
  }

  if (session.status === "pending") {
    redirect("/aguardando-aprovacao");
  }

  if (session.status === "blocked") {
    redirect("/login?status=blocked");
  }

  return session.user;
}
