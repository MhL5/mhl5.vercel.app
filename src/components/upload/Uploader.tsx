"use client";

import { DropZone } from "@/components/upload/components/DropZone";
import { FileItemError } from "@/components/upload/components/FileItemError";
import { FileItemProgress } from "@/components/upload/components/FileItemProgress";
import { FileItemResult } from "@/components/upload/components/FileItemResult";
import {
  type FileItem,
  type UseFileUploadOptions,
  useFileUpload,
} from "@/components/upload/hooks/useFileUpload";
import { cn } from "@/lib/utils";
import type { PartialPick } from "@/registry/types/PartialPick/PartialPick";
import { type ComponentProps, type ReactNode, createContext, use } from "react";

type UploaderContextValue = {
  disabled?: boolean;
  isInvalid?: boolean;
} & ReturnType<typeof useFileUpload>;

const UploaderContext = createContext<UploaderContextValue | null>(null);

type UploaderProps<T> = {
  children: ReactNode;
  uploadHandler: UseFileUploadOptions<T>["uploadHandler"];
  onUploadComplete: UseFileUploadOptions<T>["onUploadComplete"];

  disabled?: UploaderContextValue["disabled"];
  isInvalid?: UploaderContextValue["isInvalid"];
};

function Uploader<T>({
  children,
  onUploadComplete,
  uploadHandler,
  disabled,
  isInvalid,
}: UploaderProps<T>) {
  const fileUpload = useFileUpload({ onUploadComplete, uploadHandler });

  return (
    <UploaderContext value={{ ...fileUpload, disabled, isInvalid }}>
      {children}
    </UploaderContext>
  );
}

function useUploaderContext() {
  const context = use(UploaderContext);
  if (!context)
    throw new Error("UploaderContext was called outside of its provider!");
  return context;
}

type UploaderDropZoneProps = PartialPick<
  ComponentProps<typeof DropZone>,
  "onDropAccepted"
>;

function UploaderDropZone({
  onDropAccepted,
  isInvalid: isInvalidProp,
  disabled: disabledProp,
  ...props
}: UploaderDropZoneProps) {
  const { handleAdd, disabled, isInvalid } = useUploaderContext();

  return (
    <DropZone
      onDropAccepted={(file) => {
        onDropAccepted?.(file);
        handleAdd(file);
      }}
      disabled={disabled || disabledProp}
      isInvalid={isInvalid || isInvalidProp}
      {...props}
    />
  );
}

type UploaderFileItemsListProps = Omit<ComponentProps<"ul">, "children"> & {
  children: (files: ReturnType<typeof useFileUpload>["files"]) => ReactNode;
};

function UploaderFilesList({
  children,
  className,
  ...props
}: UploaderFileItemsListProps) {
  const { files } = useUploaderContext();

  return (
    <ul className={cn("flex flex-col gap-3", className)} {...props}>
      {children(files)}
    </ul>
  );
}

type UploaderFileItemProps = {
  fileItem: FileItem;

  disabled?: boolean;
  className?: string;

  messages?: {
    error: ComponentProps<typeof FileItemError>["messages"];
    progress: ComponentProps<typeof FileItemProgress>["messages"];
    result: ComponentProps<typeof FileItemResult>["messages"];
  };
};

function UploaderFileItem({
  disabled: disabledProp,
  fileItem,
  messages,
  ...props
}: UploaderFileItemProps) {
  const { disabled, handleRemove, handleRetry } = useUploaderContext();

  const onCancelUpload = () => handleRemove(fileItem.id);
  const isWorking = disabledProp || disabled;

  if (fileItem.error)
    return (
      <FileItemError
        fileItem={fileItem}
        onRetry={() => handleRetry(fileItem.id)}
        onRemove={onCancelUpload}
        disabled={isWorking}
        messages={messages?.error}
        {...props}
      />
    );

  if (fileItem.progressPercentage !== 100)
    return (
      <FileItemProgress
        fileItem={fileItem}
        onRemove={onCancelUpload}
        disabled={isWorking}
        messages={messages?.progress}
        {...props}
      />
    );

  return (
    <FileItemResult
      fileItem={fileItem}
      disabled={isWorking}
      messages={messages?.result}
      {...props}
    />
  );
}

export {
  Uploader,
  UploaderDropZone,
  UploaderFileItem,
  UploaderFilesList,
  type UploaderContextValue,
};
