import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type EmptyStateProps = {
  description: string;
  title?: string;
};

export function EmptyState({
  description,
  title = "Em breve",
}: EmptyStateProps) {
  return (
    <Card className="mt-8 p-5 sm:p-6">
      <Badge>{title}</Badge>
      <p className="mt-4 max-w-3xl text-base leading-7 text-ink">
        {description}
      </p>
    </Card>
  );
}

