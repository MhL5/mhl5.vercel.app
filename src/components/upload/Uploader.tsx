"use client";

import { DropZone } from "@/components/upload/components/DropZone";
import { FileItemProgress } from "@/components/upload/components/FileItemProgress";
import {
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
  multiple,
  ...props
}: UploaderDropZoneProps) {
  const { handleAdd, disabled, isInvalid, files } = useUploaderContext();

  const singleUploadProgressPercentage = files?.[0]?.progressPercentage;
  const isSingleUploadInProgress =
    multiple === false &&
    singleUploadProgressPercentage < 100 &&
    singleUploadProgressPercentage > 0;

  return (
    <DropZone
      onDropAccepted={(file) => {
        onDropAccepted?.(file);
        handleAdd(file);
      }}
      disabled={disabled || disabledProp || isSingleUploadInProgress}
      isInvalid={isInvalid || isInvalidProp}
      multiple={multiple}
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

type UploaderFileItemProgressProps = PartialPick<
  ComponentProps<typeof FileItemProgress>,
  "onCancel" | "onRetry"
>;

function UploaderFileItemProgress({
  disabled: disabledProp,
  fileItem,
  onCancel,
  onRetry,
  ...props
}: UploaderFileItemProgressProps) {
  const { disabled, handleRemove, handleRetry } = useUploaderContext();

  return (
    <FileItemProgress
      disabled={disabledProp || disabled}
      fileItem={fileItem}
      onCancel={() => {
        onCancel?.();
        handleRemove(fileItem.id);
      }}
      onRetry={() => {
        onRetry?.();
        handleRetry(fileItem.id);
      }}
      {...props}
    />
  );
}

export {
  Uploader,
  UploaderDropZone,
  UploaderFileItemProgress,
  UploaderFilesList,
  type UploaderContextValue,
};
