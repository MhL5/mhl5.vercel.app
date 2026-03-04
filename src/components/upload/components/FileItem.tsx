import {
  FileItemError,
  type FileItemErrorProps,
} from "@/components/upload/components/FileItemError";
import {
  FileItemProgress,
  type FileItemProgressProps,
} from "@/components/upload/components/FileItemProgress";
import {
  FileItemResult,
  type FileItemResultProps,
} from "@/components/upload/components/FileItemResult";
import type { FileItem as FileItemType } from "@/components/upload/hooks/useFileUpload";

type FileItemProps = {
  fileItem: FileItemType;

  onRemove: () => void;
  onRetry: () => void;
  onDelete?: () => void;

  disabled?: boolean;
  className?: string;

  messages?: {
    error: FileItemErrorProps["messages"];
    progress: FileItemProgressProps["messages"];
    result: FileItemResultProps["messages"];
  };
};

export function FileItem({
  onRemove,
  onRetry,
  disabled,
  className,
  fileItem,
  messages,
  onDelete,
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
      onDelete={onDelete}
      disabled={disabled}
      className={className}
      messages={messages?.result}
    />
  );
}
