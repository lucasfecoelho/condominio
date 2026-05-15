"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/app/actions";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    await logout();

    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm font-medium text-muted transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-70"
      disabled={isLoading}
      onClick={handleLogout}
      type="button"
    >
      {isLoading ? "Saindo..." : "Sair"}
    </button>
  );
}
