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

  onCancel: () => void;
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

export function FileItem({ fileItem, messages, ...props }: FileItemProps) {
  if (fileItem.error)
    return (
      <FileItemError
        fileItem={fileItem}
        messages={messages?.error}
        {...props}
      />
    );

  if (fileItem.progressPercentage !== 100)
    return (
      <FileItemProgress
        fileItem={fileItem}
        messages={messages?.progress}
        {...props}
      />
    );

  return (
    <FileItemResult
      fileItem={fileItem}
      messages={messages?.result}
      {...props}
    />
  );
}
