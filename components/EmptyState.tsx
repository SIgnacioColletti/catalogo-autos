import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// ==============================================
// COMPONENTE DE ESTADO VACÍO REUTILIZABLE
// ==============================================

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <Icon className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mb-6">{description}</p>
      {actionLabel && (actionHref || onAction) && (
        <>
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </>
      )}
    </div>
  );
};
