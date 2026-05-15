import { PageHeader } from "@/components/page-header";
import { EmptyState } from "@/components/ui/empty-state";

export default function AppPage() {
  return (
    <>
      <PageHeader
        eyebrow="Início"
        title="Bem-vindo ao Condomínio"
        subtitle="A estrutura inicial do aplicativo está pronta para receber as próximas funcionalidades."
      />

      <EmptyState description="Nenhuma funcionalidade de gestão foi adicionada ainda. Esta área será usada para centralizar os recursos do sistema." />
    </>
  );
}
