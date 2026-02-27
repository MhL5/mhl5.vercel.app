"use client";

import { cn } from "@/lib/utils";
import { FileUpIcon } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";
import { toast } from "sonner";

import { formatBytes, validateFiles } from "./utils";

type Context = {
  source: "drag-drop" | "click";
};

export type DropZoneProps = (
  | {
      multiple: true;
      onFilesSelect: (files: File[], context: Context) => void;
    }
  | {
      multiple: false;
      onFileSelect: (file: File, context: Context) => void;
    }
) & {
  className?: string;
  disabled: boolean;
  accept: "image/*" | "video/*" | "audio/*";
  maxSize?: number;
  multiple: boolean;
  inputId?: string;
};

const DEFAULT_MAX_SIZE = 1000 * 1024 * 1024; // 1GB

export function DropZone(props: DropZoneProps) {
  const { disabled, accept, multiple, maxSize, className, inputId } = props;

  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles the drop event when files are dropped onto the drop zone.
   */
  function handleDrop(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (!files || files.length === 0) return;
    handleSelectFiles(files, { source: "drag-drop" });

    setIsDragging(false);
  }

  /**
   * Handles the click event when the user selects files using the file input.
   */
  function handleClick(e: ChangeEvent<HTMLInputElement, Element>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    handleSelectFiles(Array.from(files), { source: "click" });
  }

  /**
   * Validates the selected files and calls the appropriate callback based on the `multiple` prop.
   */
  function handleSelectFiles(files: File[], context: Context) {
    if (disabled) return;

    const { validFiles, errors } = validateFiles({
      files,
      maxSize: maxSize ?? DEFAULT_MAX_SIZE,
      accept: accept,
    });

    if (errors) errors.forEach(({ error }) => toast.error(error));
    if (!validFiles || validFiles.length === 0) return;

    if (multiple) props.onFilesSelect(validFiles, context);
    if (!multiple) {
      if (validFiles.length > 1)
        return toast.error(
          "Only one file can be uploaded at a time, please select one file at a time.",
        );
      props.onFileSelect(validFiles[0], context);
    }
  }

  return (
    <button
      type="button"
      onClick={() => {
        if (inputRef.current) inputRef.current.click();
      }}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.currentTarget.contains(e.relatedTarget as Node)) return;
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={handleDrop}
      data-disabled={disabled}
      data-dragging={isDragging}
      className={cn(
        "flex min-h-45 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-6 transition-colors hover:bg-primary/10 has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:border-ring has-[input:focus]:ring-[3px] has-[input:focus]:ring-ring/50 data-[disabled=true]:opacity-50 data-[dragging=true]:border-solid data-[dragging=true]:bg-primary/10",
        className,
      )}
      disabled={disabled}
    >
      <input
        type="file"
        onChange={handleClick}
        ref={inputRef}
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        id={inputId}
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
