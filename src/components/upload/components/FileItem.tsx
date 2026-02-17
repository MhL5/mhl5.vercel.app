import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { RefreshCcw, X } from "lucide-react";

import { formatBytes } from "../utils";
import { FileIconComponent } from "./FileIcon";

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

function FileItem({
  error,
  progress,
  uploadSpeed,
  onRemove,
  onRetry,
  disabled,
  className,
  file,
}: FileItemProps) {
  if (error)
    return (
      <FileItemError
        error={error}
        fileName={file.name}
        onRetry={onRetry}
        onRemove={onRemove}
        disabled={disabled}
        className={className}
      />
    );

  if (progress !== 100)
    return (
      <FileItemProgress
        fileName={file.name}
        progress={progress}
        fileSize={file.size}
        uploadSpeed={uploadSpeed}
        onRemove={onRemove}
        disabled={disabled}
        className={className}
      />
    );

  return (
    <FileItemResult
      fileName={file.name}
      fileSize={file.size}
      fileType={file.type}
      onRemove={onRemove}
      disabled={disabled}
      className={className}
    />
  );
}

function FileItemError({
  className,
  error,
  onRetry,
  onRemove,
  disabled,
  fileName,
}: {
  className?: string;
  error: string;
  fileName: string;
  onRetry: () => void;
  onRemove: () => void;
  disabled: boolean;
}) {
  return (
    <div
      data-slot="FileItemError"
      role="alert"
      className={cn(
        "flex items-center gap-2 rounded-lg border border-destructive p-3",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="flex flex-wrap items-center gap-1 text-xs text-destructive">
          <span> Upload failed!</span>
          <span className="truncate">{fileName}</span>
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
}

function FileItemProgress({
  className,
  progress,
  uploadSpeed,
  onRemove,
  disabled,
  fileName,
  fileSize,
}: {
  className?: string;
  progress: number;
  uploadSpeed: number;
  onRemove: () => void;
  disabled: boolean;
  fileName: string;
  fileSize: number;
}) {
  function calculateRemainingUploadTime() {
    if (!uploadSpeed || progress === 0) return null;

    const totalBytes = fileSize;
    const uploadedBytes = (progress / 100) * totalBytes;
    const remainingBytes = totalBytes - uploadedBytes;
    const remainingSeconds = remainingBytes / uploadSpeed;

    if (remainingSeconds < 60)
      return `${Math.round(remainingSeconds)} seconds remaining`;
    if (remainingSeconds < 3600)
      return `${Math.round(remainingSeconds / 60)} minutes remaining`;
    return `${Math.round(remainingSeconds / 3600)} hours remaining`;
  }

  return (
    <div
      data-slot="FileItemProgress"
      className={cn("h-full space-y-2 border p-3", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="flex items-center gap-1 text-sm">
            <span>Uploading...</span>
            <span className="truncate">{fileName}</span>
          </p>
          <p className="truncate text-xs leading-4 text-muted-foreground">
            <span className="tracking-wide">{`${progress.toFixed(2)}% • `}</span>
            <span>
              {calculateRemainingUploadTime() || ""} {"•"}{" "}
              {formatBytes(uploadSpeed)}
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

function FileItemResult({
  fileName,
  fileType,
  fileSize,
  onRemove,
  disabled,
  className,
}: {
  fileName: string;
  fileType: string;
  fileSize?: number;

  onRemove: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <div
      data-slot="FileItemResult"
      className={cn(
        "flex items-center gap-3 overflow-hidden rounded-lg border p-3",
        className,
      )}
    >
      <div className="[&_svg:size-5] flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:text-foreground">
        <FileIconComponent fileName={fileName} fileType={fileType} />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-[13px] font-medium">{fileName}</p>
        {fileSize && (
          <p className="text-xs text-muted-foreground">
            {formatBytes(fileSize)}
          </p>
        )}
      </div>

      <Button
        size="icon-sm"
        variant="destructive"
        aria-label="remove upload"
        className="ms-auto"
        onClick={onRemove}
        disabled={disabled}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export { FileItemError, FileItemProgress, FileItemResult, FileItem };
