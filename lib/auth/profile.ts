import "server-only";

import type { SupabaseClient, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export type ProfileStatus = "active" | "pending" | "blocked";
export type ProfileRole = "admin" | "user";

export type AppProfile = {
  id: string;
  full_name: string;
  email: string;
  role: ProfileRole;
  status: ProfileStatus;
  created_at: string;
  approved_at: string | null;
};

type ProfileRow = AppProfile;

export function normalizeProfileStatus(status?: string | null): ProfileStatus {
  if (status === "active" || status === "pending" || status === "blocked") {
    return status;
  }

  return "pending";
}

export async function getProfileForUser(
  user: User,
  client?: SupabaseClient,
): Promise<AppProfile | null> {
  const supabase = client ?? (await createClient());
  const { data, error } = await supabase
    .from("app_profiles")
    .select("id, full_name, email, role, status, created_at, approved_at")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  if (error || !data) {
    return null;
  }

  return {
    ...data,
    status: normalizeProfileStatus(data.status),
  };
}

