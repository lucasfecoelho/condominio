import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/page-header";

export default function ManagementPage() {
  return (
    <>
      <PageHeader title="Gestão" />
      <EmptyState description="As ferramentas de gestão serão adicionadas nas próximas etapas." />
    </>
  );
}
