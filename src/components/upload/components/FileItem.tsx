import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FileItemIcon } from "@/components/upload/components/FileIcon";
import type { FileItem as FileItemType } from "@/components/upload/hooks/useFileUpload";
import {
  formatBytes,
  formatTimeLeftInSeconds,
} from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import { RefreshCcw, X } from "lucide-react";

type FileItemProps = {
  fileItem: FileItemType;

  onRemove: () => void;
  onRetry: () => void;

  disabled: boolean;
  className?: string;

  messages?: {
    error: FileItemErrorProps["messages"];
    progress: FileItemProgressProps["messages"];
    result: FileItemResultProps["messages"];
  };
};

function FileItem({
  onRemove,
  onRetry,
  disabled,
  className,
  fileItem,
  messages,
}: FileItemProps) {
  if (fileItem.error)
    return (
      <FileItemError
        fileItem={fileItem}
        onRetry={onRetry}
        onRemove={onRemove}
        disabled={disabled}
        className={className}
        messages={messages?.error}
      />
    );

  if (fileItem.progressPercentage !== 100)
    return (
      <FileItemProgress
        fileItem={fileItem}
        onRemove={onRemove}
        disabled={disabled}
        className={className}
        messages={messages?.progress}
      />
    );

  return (
    <FileItemResult
      fileItem={fileItem}
      onRemove={onRemove}
      disabled={disabled}
      className={className}
      messages={messages?.result}
    />
  );
}

type FileItemErrorProps = {
  className?: string;
  fileItem: FileItemType;
  onRetry: () => void;
  onRemove: () => void;
  disabled: boolean;
  messages?: {
    errorTitle: string;
    errorMessage: string;
    retryLabel: string;
    removeLabel: string;
  };
};

function FileItemError({
  className,
  onRetry,
  onRemove,
  disabled,
  fileItem,
  messages = {
    errorTitle: "Upload failed!",
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
        "flex items-center gap-2 rounded-lg border border-destructive p-3",
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 overflow-hidden">
        <p className="flex flex-wrap items-center gap-1 text-xs text-destructive">
          <span>{messages.errorTitle}</span>
          <span className="truncate">{fileItem.file.name}</span>
        </p>
        <p className="truncate text-xs leading-4 text-destructive/70">
          {fileItem.error}
        </p>
      </div>

      <Button
        size="icon-sm"
        variant="ghost"
        className="ms-auto"
        onClick={onRetry}
        disabled={disabled}
        aria-label={messages.retryLabel}
      >
        <RefreshCcw className="size-4" aria-hidden="true" />
      </Button>
      <Button
        size="icon-sm"
        variant="destructive"
        aria-label={messages.removeLabel}
        onClick={onRemove}
        disabled={disabled}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

type FileItemProgressProps = {
  className?: string;
  fileItem: FileItemType;
  onRemove: () => void;
  disabled: boolean;
  messages?: {
    title: string;
    secondsRemaining: string;
    minutesRemaining: string;
    hoursRemaining: string;
    cancelUpload: string;
  };
};

function FileItemProgress({
  className,
  onRemove,
  disabled,
  fileItem,
  messages = {
    title: "Uploading...",
    secondsRemaining: "seconds remaining",
    minutesRemaining: "minutes remaining",
    hoursRemaining: "hours remaining",
    cancelUpload: "cancel upload",
  },
}: FileItemProgressProps) {
  return (
    <div
      data-slot="FileItemProgress"
      className={cn("h-full space-y-2 border p-3", className)}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="flex items-center gap-1 text-sm">
            <span>{messages.title}</span>
            <span className="truncate">{fileItem.file.name}</span>
          </p>
          <p className="truncate text-xs leading-4 text-muted-foreground">
            <span className="tracking-wide">{`${fileItem.progressPercentage.toFixed(2)}% • `}</span>
            <span>
              {formatTimeLeftInSeconds(fileItem.timeLeftInSeconds) || ""} {"•"}{" "}
              <span dir="auto">{formatBytes(fileItem.uploadSpeed)}</span>
            </span>
          </p>
        </div>

        <Button
          size="icon-sm"
          variant="destructive"
          aria-label={messages.cancelUpload}
          onClick={onRemove}
          disabled={disabled}
          className="mb-auto"
        >
          <X className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <Progress value={fileItem.progressPercentage} max={100} />
    </div>
  );
}

type FileItemResultProps = {
  fileItem: FileItemType;

  onRemove: () => void;
  disabled: boolean;
  className?: string;
  messages?: {
    delete: string;
  };
};

function FileItemResult({
  onRemove,
  disabled,
  className,
  fileItem,
  messages = {
    delete: "delete",
  },
}: FileItemResultProps) {
  return (
    <div
      data-slot="FileItemResult"
      className={cn(
        "flex items-center gap-3 overflow-hidden rounded-lg border p-3",
        className,
      )}
    >
      <div className="[&_svg:size-5] flex size-10 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground [&_svg]:text-foreground">
        <FileItemIcon
          fileName={fileItem.file.name}
          fileType={fileItem.file.type}
        />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-[13px] font-medium">{fileItem.file.name}</p>
        {fileItem.file.size && (
          <p className="text-xs text-muted-foreground">
            {formatBytes(fileItem.file.size)}
          </p>
        )}
      </div>

      <Button
        size="icon-sm"
        variant="destructive"
        aria-label={messages?.delete}
        className="ms-auto"
        onClick={onRemove}
        disabled={disabled}
      >
        <X className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

export { FileItem, FileItemError, FileItemProgress, FileItemResult };
