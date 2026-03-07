import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import { formatBytes } from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import { formatSeconds } from "@/registry/utils/formatters/formatters";
import { RefreshCcw, X } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

export type FileItemProgressProps = {
  className?: string;
  fileItem: FileItem;
  onCancel: (id: FileItem["id"]) => void;
  onRetry: (id: FileItem["id"]) => void;
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
  disabled,
  onCancel,
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
      value: (
        <>
          <span>{`${formatBytes(fileItem.uploadedBytes)}/${formatBytes(fileItem.file.size)}`}</span>

          <span className="@max-xs:hidden">
            {` • `}
            {`${fileItem.progressPercentage.toFixed(2)}%`}
          </span>
        </>
      ),
    },
    {
      label: "Speed",
      value: `${formatBytes(fileItem.uploadSpeedInSeconds)}/S`,
    },
    {
      label: "Time Left",
      value: formatSeconds(fileItem.timeLeftInSeconds),
    },
  ] as const;

  const uploadHasFailed = !!fileItem.error;

  return (
    <div
      data-slot="FileItemProgress"
      data-error={uploadHasFailed}
      className={cn(
        "@container h-full space-y-3 rounded-md border p-3 data-[error=true]:bg-destructive/5 data-[error=true]:text-destructive",
        className,
      )}
    >
      <div className="grid grid-cols-[1fr_auto] gap-2.5">
        <div className="flex flex-col gap-2 overflow-hidden">
          <p
            title={fileItem.file.name}
            className="truncate text-sm font-medium"
            role={uploadHasFailed ? "alert" : undefined}
            aria-live={uploadHasFailed ? "polite" : undefined}
          >
            {fileItem.file.name}
          </p>

          <div className="h-15">
            {fileItem.error ? (
              <FieldError
                className="line-clamp-3"
                errors={[
                  {
                    message: fileItem.error,
                  },
                ]}
              />
            ) : (
              <p className="grid grid-cols-[auto_1fr] gap-1.5 text-xs leading-4 text-muted-foreground">
                {details.map(({ label, value }) => (
                  <Fragment key={label + value}>
                    <span className="inline-block font-medium capitalize">
                      {label}:
                    </span>
                    <span className="line-clamp-1">{value}</span>
                  </Fragment>
                ))}
              </p>
            )}
          </div>
        </div>

        <div className="ms-auto mb-auto grid gap-2">
          <Button
            size="icon-xs"
            type="button"
            variant="destructive"
            title={messages.cancelUpload}
            onClick={() => onCancel(fileItem.id)}
            disabled={disabled}
          >
            <X aria-hidden="true" />
          </Button>

          {uploadHasFailed && (
            <Button
              size="icon-xs"
              variant="secondary"
              type="button"
              onClick={() => onRetry(fileItem.id)}
              disabled={disabled}
              title={messages.retryLabel}
            >
              <RefreshCcw aria-hidden="true" />
            </Button>
          )}
        </div>
      </div>

      <Progress value={fileItem.progressPercentage} max={100} />
    </div>
  );
}
