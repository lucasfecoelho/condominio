import type { ProfileStatus } from "@/lib/auth/profile";
import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: ProfileStatus;
};

const statusLabels: Record<ProfileStatus, string> = {
  active: "Ativo",
  pending: "Pendente",
  blocked: "Bloqueado",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return <Badge variant={status}>{statusLabels[status]}</Badge>;
}
