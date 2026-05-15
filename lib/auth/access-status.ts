import type { User } from "@supabase/supabase-js";

export type AccessStatus = "active" | "pending" | "blocked";

export function getUserAccessStatus(user: User): AccessStatus {
  const status = user.app_metadata?.status;

  if (status === "active" || status === "pending" || status === "blocked") {
    return status;
  }

  return "pending";
}

