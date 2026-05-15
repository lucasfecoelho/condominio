import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { uiMessages } from "@/lib/ui/messages";

export default function AppLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center text-muted">
        <LoadingSpinner className="text-primary" />
        <p className="text-sm font-medium">{uiMessages.validatingAccess}</p>
      </div>
    </div>
  );
}
