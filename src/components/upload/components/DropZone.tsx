"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/registry/utils/formatters/formatters";
import { FileUpIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
  useRef,
  useState,
} from "react";

import { validateFiles } from "../utils";

type DropZoneError = Array<{ message: string }>;

export type DropZoneProps = {
  /** optional input element props, excluding ref, accept, multiple, and disabled */
  inputProps?: Omit<
    ComponentProps<"input">,
    "ref" | "accept" | "multiple" | "disabled"
  >;

  /** Callback fired when files are rejected during drop */
  onDropRejected: (error: DropZoneError) => void;
  /** Callback fired when files are accepted */
  onDropAccepted: (files: File[]) => void;

  /** Optional CSS class name to apply to the component */
  className?: string;

  /** Indicates whether the drop zone has an invalid state */
  "aria-invalid": boolean;
  /**  Disables the drop zone interaction */
  disabled: boolean;

  /** The type of files accepted by the drop zone, you can add more types if you need */
  accept: "image/*" | "video/*" | "audio/*";
  /** Whether multiple files can be accepted at once */
  multiple: boolean;
  /** Maximum file size in bytes allowed */
  maxSize?: number;
};

/**
 * # DropZone
 *
 * handles drag drop, click to browse and validating files.
 *
 * @example
 * ```
 *  <DropZone
 *    multiple={true}
 *    accept="image/*"
 *    onDropAccepted={handleAdd}
 *    onDropRejected={(errors) => {
 *      field.setErrorMap({ onChange: errors });
 *      field.handleBlur();
 *    }}
 *    disabled={isSubmitting}
 *    aria-invalid={isInvalid}
 *    className="w-full"
 *    inputProps={{id: "input-id","aria-describedby": "example-id","aria-invalid": false}}
 *  />
 * ```
 */
function DropZone({
  onDropAccepted,
  onDropRejected,
  accept,
  multiple,
  disabled,
  maxSize,
  className,
  inputProps: {
    className: inputClassName,
    onChange: inputOnChange,
    "aria-invalid": inputAriaInvalid,
    ...inputProps
  } = {},
  "aria-invalid": ariaInvalid,
}: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function processErrors(error: DropZoneError | null) {
    if (!error) return;
    onDropRejected?.(error);
  }

  /**
   * Validates the selected files
   */
  function processFiles(files: File[]) {
    if (disabled) return;
    if (!multiple && files.length > 1)
      return processErrors?.([
        {
          message:
            "Only one file can be uploaded at a time, please select one file at a time.",
        },
      ]);

    const { acceptedFiles, rejectedFiles } = validateFiles({
      files,
      maxSize: maxSize || Infinity,
      accept: accept,
    });

    processErrors(rejectedFiles.flatMap(({ error }) => error));

    if (!acceptedFiles || acceptedFiles.length === 0) return;

    onDropAccepted(acceptedFiles);
  }

  /**
   * Handles the drop event when files are dropped onto the drop zone.
   */
  function handleDrop(e: DragEvent<HTMLElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (!files || files.length === 0) return;

    processFiles(files);
  }

  /**
   * Handles the click event when the user selects files using the file input.
   */
  function handleInputChange(e: ChangeEvent<HTMLInputElement, Element>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    processFiles(Array.from(files));
  }

  return (
    <Button
      variant="ghost"
      type="button"
      data-slot="DropZoneContent"
      tabIndex={-1}
      disabled={disabled}
      data-dragging={isDragging}
      aria-invalid={ariaInvalid}
      className={cn(
        "flex h-fit min-h-45 cursor-pointer flex-col items-center justify-center border-2 border-dashed border-border p-6 whitespace-normal transition-none",
        "has-[input:focus-visible]:border-ring has-[input:focus-visible]:ring-[3px] has-[input:focus-visible]:ring-ring/50",
        "aria-[invalid=true]:border-destructive aria-[invalid=true]:bg-destructive/5 aria-[invalid=true]:text-destructive aria-[invalid=true]:[&_p]:text-destructive",
        "data-[dragging=true]:border-primary/10 data-[dragging=true]:bg-primary/10",
        className,
      )}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
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
        aria-invalid={ariaInvalid || inputAriaInvalid}
        onChange={(e) => {
          inputOnChange?.(e);
          handleInputChange(e);
        }}
        ref={inputRef}
        disabled={disabled}
        multiple={multiple}
        accept={accept}
        className={cn("sr-only", inputClassName)}
        aria-label="Drop files here"
        {...inputProps}
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
      </div>
    </Button>
  );
}

export { DropZone };
