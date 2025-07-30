import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface ErrorMessageProps {
  title: string;
  description: string;
  redirectTo?: string;
  buttonLabel?: string;
}

export function ErrorMessage({
  title,
  description,
  redirectTo,
  buttonLabel = "Voltar",
}: ErrorMessageProps) {
  const router = useRouter();

  const handleRedirect = () => {
    if (redirectTo) {
      router.push(redirectTo);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 rounded-xl border border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950 shadow-sm">
      <div className="mb-4">
        <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-2xl font-bold text-red-800 dark:text-red-300">{title}</h2>
      <p className="text-sm text-red-700 dark:text-red-400 mt-2">{description}</p>

      {redirectTo && (
        <Button
          onClick={handleRedirect}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white"
        >
          {buttonLabel}
        </Button>
      )}
    </div>
  );
}
