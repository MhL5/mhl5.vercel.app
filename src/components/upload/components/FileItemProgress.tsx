import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import {
  formatBytes,
  formatTimeLeftInSeconds,
} from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import {
  RefreshCcw,
  TriangleAlertIcon,
  UploadCloudIcon,
  X,
} from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export type FileItemProgressProps = {
  className?: string;
  fileItem: FileItem;
  onCancel: () => void;
  onRetry: () => void;
  disabled?: boolean;
  messages?: {
    title: string;
    secondsRemaining: string;
    minutesRemaining: string;
    hoursRemaining: string;
    cancelUpload: string;

    retryLabel: string;
  };
};

export function FileItemProgress({
  className,
  onCancel,
  disabled,
  onRetry,
  fileItem,
  messages = {
    title: "Uploading...",
    secondsRemaining: "seconds remaining",
    minutesRemaining: "minutes remaining",
    hoursRemaining: "hours remaining",
    cancelUpload: "cancel upload",
    retryLabel: "Retry upload",
  },
}: FileItemProgressProps) {
  const details = [
    {
      label: "Progress",
      value: `${formatBytes(fileItem.uploadedBytes)}/${formatBytes(fileItem.file.size)} • ${fileItem.progressPercentage.toFixed(2)}%`,
    },
    {
      label: "Upload Speed",
      value: `${formatBytes(fileItem.uploadSpeedInSeconds)}/S • ${formatTimeLeftInSeconds(fileItem.timeLeftInSeconds)}`,
    },
  ];

  const uploadHasFailed = !!fileItem.error;

  return (
    <div
      data-slot="FileItemProgress"
      data-error={uploadHasFailed}
      role={uploadHasFailed ? "alert" : undefined}
      aria-live={uploadHasFailed ? "polite" : undefined}
      className={cn(
        "h-full space-y-3 rounded-md border p-3 data-[error=true]:bg-destructive/5 data-[error=true]:text-destructive",
        className,
      )}
    >
      <div className="flex gap-2.5">
        <div className="flex basis-full flex-col gap-2">
          <p title={fileItem.file.name} className="line-clamp-1 text-sm">
            {uploadHasFailed ? (
              <TriangleAlertIcon className="me-2 inline-block size-4" />
            ) : (
              <UploadCloudIcon className="me-2 inline-block size-4" />
            )}
            {fileItem.file.name} {fileItem.error}
          </p>
          <p className="grid grid-cols-[1fr_2fr] gap-1.25 text-xs leading-4 text-muted-foreground">
            {details.map(({ label, value }) => (
              <Fragment key={label + value}>
                <span className="inline-block w-24 font-medium capitalize">
                  {label}:
                </span>
                <span className="line-clamp-1">{value}</span>
              </Fragment>
            ))}
          </p>
        </div>

        {uploadHasFailed && (
          <Button
            size="icon-xs"
            variant="secondary"
            type="button"
            className="ms-auto mb-auto"
            onClick={onRetry}
            disabled={disabled}
            title={messages.retryLabel}
          >
            <RefreshCcw aria-hidden="true" />
          </Button>
        )}
        <Button
          size="icon-xs"
          type="button"
          variant="destructive"
          title={messages.cancelUpload}
          onClick={onCancel}
          disabled={disabled}
          className="mb-auto"
        >
          <X aria-hidden="true" />
        </Button>
      </div>

      <Progress value={fileItem.progressPercentage} max={100} />
    </div>
  );
}
