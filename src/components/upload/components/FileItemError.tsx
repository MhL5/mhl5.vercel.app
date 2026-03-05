import { Button } from "@/components/ui/button";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import { RefreshCcw, X } from "lucide-react";

export type FileItemErrorProps = {
  className?: string;
  fileItem: FileItem;
  onRetry: () => void;
  onCancel: () => void;
  disabled?: boolean;
  messages?: {
    errorMessage: string;
    retryLabel: string;
    removeLabel: string;
  };
};

export function FileItemError({
  className,
  onRetry,
  onCancel,
  disabled,
  fileItem,
  messages = {
    errorMessage: "Error message",
    retryLabel: "Retry upload",
    removeLabel: "Cancel upload",
  },
}: FileItemErrorProps) {
  return (
    <div
      data-slot="FileItemError"
      role="alert"
      className={cn(
        "flex items-center gap-2 rounded-md border border-destructive p-3",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="truncate text-sm font-medium text-destructive">
          {fileItem.file.name}
        </p>
        <p className="truncate text-xs leading-4 text-destructive">
          {fileItem.error}
        </p>
      </div>

      <Button
        size="icon-xs"
        variant="ghost"
        type="button"
        className="ms-auto"
        onClick={onRetry}
        disabled={disabled}
        title={messages.retryLabel}
      >
        <RefreshCcw className="size-4" aria-hidden="true" />
      </Button>
      <Button
        size="icon-xs"
        type="button"
        variant="destructiveGhost"
        title={messages.removeLabel}
        onClick={onCancel}
        disabled={disabled}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
