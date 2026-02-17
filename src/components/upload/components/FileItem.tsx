import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { RefreshCcw, X } from "lucide-react";

import { formatBytes } from "../utils";

type FileItemProps = {
  file: File;

  progress: number;
  error?: string;
  uploadSpeed: number;

  onRemove: () => void;
  onRetry: () => void;

  disabled: boolean;
  className?: string;
};

export function FileItem({
  error,
  progress,
  uploadSpeed,
  onRemove,
  onRetry,
  disabled,
  className,
  file,
}: FileItemProps) {
  function calculateRemainingUploadTime() {
    if (!uploadSpeed || progress === 0) return null;

    const totalBytes = file.size;
    const uploadedBytes = (progress / 100) * totalBytes;
    const remainingBytes = totalBytes - uploadedBytes;
    const remainingSeconds = remainingBytes / uploadSpeed;

    if (remainingSeconds < 60)
      return `${Math.round(remainingSeconds)} seconds remaining`;
    if (remainingSeconds < 3600)
      return `${Math.round(remainingSeconds / 60)} minutes remaining`;
    return `${Math.round(remainingSeconds / 3600)} hours remaining`;
  }

  if (error)
    return (
      <div
        role="alert"
        className={cn(
          "flex items-center gap-2 rounded-lg border border-destructive p-3",
          className,
        )}
      >
        <div className="flex flex-col gap-0.5 overflow-hidden">
          <p className="flex flex-wrap items-center gap-1 text-xs text-destructive">
            <span> Upload failed!</span>
            <span className="truncate">{file.name}</span>
          </p>
          <p className="truncate text-xs leading-4 text-destructive/70">
            {error}
          </p>
        </div>

        <Button
          size="icon-sm"
          variant="ghost"
          className="ms-auto"
          onClick={onRetry}
          disabled={disabled}
          aria-label="retry upload"
        >
          <RefreshCcw className="size-4" aria-hidden="true" />
        </Button>
        <Button
          size="icon-sm"
          variant="destructive"
          aria-label="cancel upload"
          onClick={onRemove}
          disabled={disabled}
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>
    );

  const remainingTime = calculateRemainingUploadTime() || "";

  return (
    <div className={cn("h-full space-y-2 border p-3", className)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="flex items-center gap-1 text-sm">
            <span>Uploading...</span>
            <span className="truncate">{file.name}</span>
          </p>
          <p className="truncate text-xs leading-4 text-muted-foreground">
            <span className="tracking-wide">{`${progress.toFixed(2)}% • `}</span>
            <span>
              {remainingTime} {"•"} {formatBytes(uploadSpeed)}
            </span>
          </p>
        </div>

        <Button
          size="icon-sm"
          variant="destructive"
          aria-label="cancel upload"
          onClick={onRemove}
          disabled={disabled}
          className="mb-auto"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <Progress value={progress} max={100} />
    </div>
  );
}
