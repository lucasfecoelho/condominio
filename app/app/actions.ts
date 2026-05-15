"use server";

import { clearAppSession } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient();

  await supabase.auth.signOut();
  await clearAppSession();
}

