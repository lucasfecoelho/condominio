import { EmptyState } from "@/components/ui/empty-state";
import { PageHeader } from "@/components/page-header";

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Configurações" />
      <EmptyState description="As configurações do sistema serão adicionadas conforme o app evoluir." />
    </>
  );
}
