import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { FileItem } from "@/components/upload/hooks/useFileUpload";
import {
  formatBytes,
  formatTimeLeftInSeconds,
} from "@/components/upload/utils";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type FileItemProgressProps = {
  className?: string;
  fileItem: FileItem;
  onRemove: () => void;
  disabled?: boolean;
  messages?: {
    title: string;
    secondsRemaining: string;
    minutesRemaining: string;
    hoursRemaining: string;
    cancelUpload: string;
  };
};

export function FileItemProgress({
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
      className={cn("h-full space-y-2 rounded-md border p-3", className)}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-1 overflow-hidden">
          <p className="truncate text-sm">{fileItem.file.name}</p>
          <p className="truncate text-xs leading-4 text-muted-foreground">
            <span className="tracking-wide">{`${fileItem.progressPercentage.toFixed(2)}% • `}</span>
            <span>
              {formatTimeLeftInSeconds(fileItem.timeLeftInSeconds) || ""} {"•"}{" "}
              <span dir="auto">
                {formatBytes(fileItem.uploadSpeedInSeconds)}/S
              </span>
            </span>
          </p>
        </div>

        <Button
          size="icon-xs"
          variant="destructiveGhost"
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
