"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/app/actions";
import { Button } from "@/components/ui/button";

type LogoutButtonProps = {
  variant?: "default" | "danger";
};

export function LogoutButton({ variant = "default" }: LogoutButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    await logout();

    router.replace("/login");
    router.refresh();
  }

  const className =
    variant === "danger"
      ? "w-full"
      : "";

  return (
    <Button
      className={className}
      isLoading={isLoading}
      loadingLabel="Saindo..."
      onClick={handleLogout}
      type="button"
      variant={variant === "danger" ? "danger" : "secondary"}
    >
      Sair
    </Button>
  );
}
