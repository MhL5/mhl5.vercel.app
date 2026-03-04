"use client";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { FileUpIcon } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

import { formatBytes, validateFiles } from "../utils";

type DropZoneError = Array<{ message: string }>;

export type DropZoneProps = {
  onDropAccepted: (files: File[]) => void;
  onDropRejected: (error: DropZoneError) => void;

  accept: "image/*" | "video/*" | "audio/*";
  multiple: boolean;
  inputId: string;

  className?: string;
  disabled?: boolean;
  maxSize?: number;
  isInvalid?: boolean;
};

const DEFAULT_MAX_SIZE = 1000 * 1024 * 1024; // 1GB

export function DropZone({
  disabled,
  isInvalid,
  accept,
  multiple,
  maxSize = DEFAULT_MAX_SIZE,
  className,
  inputId,
  onDropAccepted,
  onDropRejected,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<DropZoneError | null>(null);

  /**
   * Handles the drop event when files are dropped onto the drop zone.
   */
  function handleDrop(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (!files || files.length === 0) return;
    handleSelectedFiles(files);

    setIsDragging(false);
  }

  /**
   * Handles the click event when the user selects files using the file input.
   */
  function handleClick(e: ChangeEvent<HTMLInputElement, Element>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    handleSelectedFiles(Array.from(files));
  }

  function handleError(error: DropZoneError | null) {
    if (!error) return setErrors(null);
    setErrors(error);
    onDropRejected?.(error);
  }

  /**
   * Validates the selected files
   */
  function handleSelectedFiles(files: File[]) {
    if (disabled) return;

    const { acceptedFiles, rejectedFiles } = validateFiles({
      files,
      maxSize: maxSize ?? DEFAULT_MAX_SIZE,
      accept: accept,
    });

    handleError(rejectedFiles.flatMap(({ error }) => error));

    if (!acceptedFiles || acceptedFiles.length === 0) return;

    if (multiple) onDropAccepted(acceptedFiles);
    if (!multiple) {
      if (acceptedFiles.length > 1) {
        return handleError?.([
          {
            message:
              "Only one file can be uploaded at a time, please select one file at a time.",
          },
        ]);
      }
      onDropAccepted(acceptedFiles);
    }
  }

  return (
    <Button
      variant="ghost"
      type="button"
      onDrop={handleDrop}
      data-dragging={isDragging}
      data-invalid={isInvalid}
      tabIndex={-1}
      disabled={disabled}
      className={cn(
        "flex h-fit min-h-45 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border p-6 whitespace-normal transition-none",
        "has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
        "data-[dragging=true]:border-primary/10 data-[dragging=true]:bg-primary/10",
        "data-[invalid=true]:border-destructive data-[invalid=true]:text-destructive data-[invalid=true]:[&_p]:text-destructive",
        className,
      )}
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

      <div className="flex flex-col flex-wrap items-center justify-center text-center">
        <div
          className="mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border bg-background"
          aria-hidden="true"
        >
          <FileUpIcon className="size-4 opacity-60" />
        </div>
        <p className="mb-1.5 text-sm font-medium text-foreground">
          Upload files
        </p>
        <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
          Drag & drop or click to browse.
          <br />
          <span>
            {`Max size: ${maxSize ? formatBytes(maxSize) : "N/A"}. `}
            {`Accepted types: ${accept ? accept : "Any"}.`}
          </span>
        </p>
        {errors && <FieldError className="mt-1" errors={errors} />}
      </div>
    </Button>
  );
}
