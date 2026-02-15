"use client";

import { cn } from "@/lib/utils";
import { FileUpIcon } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { formatBytes, validateFile } from "./utils";

type BaseProps = {
  className?: string;
  disabled: boolean;
  accept: "image/*" | "video/*" | "audio/*" | "image/*,video/*,audio/*";
  maxSize?: number;
  multiple: boolean;
};

type DropZoneProps = (
  | {
      onDrop: (files: File[]) => void;
      onChange: (files: File[]) => void;
      multiple: true;
    }
  | {
      onDrop: (files: File) => void;
      onChange: (files: File) => void;
      multiple: false;
    }
) &
  BaseProps;

const DEFAULT_MAX_SIZE = 1000 * 1024 * 1024; // 1GB

export default function DropZone({
  onDrop,
  onChange,
  disabled,
  accept,
  multiple,
  maxSize = DEFAULT_MAX_SIZE,
  className,
}: DropZoneProps) {
  function validateFiles(files: File[]) {
    if (files.length === 0) {
      toast.error("No files to validate");
      return null;
    }

    const validFiles = files.filter((file) => {
      const error = validateFile({ file, maxSize, accept });
      if (error) {
        toast.error(error);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return null;

    return validFiles;
  }

  return (
    <DropZoneInternal
      onDrop={(e) => {
        const files = Array.from(e.dataTransfer.files);

        const validFiles = validateFiles(files);
        if (!validFiles) return;

        if (multiple) onDrop(validFiles);
        else onDrop(validFiles[0]);
      }}
      onChange={(e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const validFiles = validateFiles(Array.from(files));
        if (!validFiles) return;

        if (multiple) onChange(validFiles);
        else onChange(validFiles[0]);
      }}
      disabled={disabled}
      accept={accept}
      multiple={multiple}
      maxSize={maxSize}
      className={className}
    />
  );
}

type DropZoneInternalProps = BaseProps & {
  onDrop: (e: DragEvent<HTMLElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

/**
 * for simplicity this component is internal
 * it only handles drag drop and click to browse
 */
function DropZoneInternal({
  onDrop,
  onChange,
  disabled,
  accept,
  multiple,
  maxSize,
  className,
}: DropZoneInternalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDragEnter(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;

    setIsDragging(false);
  }

  function handleClick() {
    if (inputRef.current) inputRef.current.click();
  }

  function handleDragOver(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleDrop(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;
    onDrop(e);

    setIsDragging(false);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      data-disabled={disabled}
      data-dragging={isDragging}
      className={cn(
        "flex min-h-45 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary p-6 transition-colors hover:bg-primary/10 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[disabled=true]:opacity-50 data-[dragging=true]:border-solid data-[dragging=true]:bg-primary/10",
        className,
      )}
    >
      <input
        type="file"
        onChange={onChange}
        ref={inputRef}
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        className="sr-only"
        aria-label="Drop files here"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div
          className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          aria-hidden="true"
        >
          <FileUpIcon className="size-4 opacity-60" />
        </div>
        <p className="mb-1.5 text-sm font-medium">Upload files</p>
        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
          Drag & drop or click to browse.
          <br />
          <span>
            {`Max size: ${maxSize ? formatBytes(maxSize) : "N/A"}. `}
            {`Accepted types: ${accept ? accept : "Any"}.`}
          </span>
        </p>
      </div>
    </button>
  );
}
