import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/page-header";

export default function OverviewPage() {
  return (
    <>
      <PageHeader title="Visão geral" />
      <EmptyState description="Os indicadores do condomínio aparecerão aqui quando as funcionalidades forem configuradas." />
    </>
  );
}
