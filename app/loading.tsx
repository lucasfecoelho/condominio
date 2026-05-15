import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { uiMessages } from "@/lib/ui/messages";

export default function Loading() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-4 text-center text-muted">
        <LoadingSpinner className="text-primary" />
        <p className="text-sm font-medium">{uiMessages.loadingSession}</p>
      </div>
    </main>
  );
}
