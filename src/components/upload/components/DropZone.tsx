"use client";

import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { FileUpIcon } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentProps,
  type DragEvent,
  type ReactNode,
  createContext,
  use,
  useRef,
  useState,
} from "react";

import { formatBytes, validateFiles } from "../utils";

type DropZoneError = Array<{ message: string }>;

type DropZoneContextValue = {
  errors: DropZoneError;
  processErrors: (error: DropZoneError) => void;
  processFiles: (files: File[]) => void;

  isInvalid?: boolean;
  disabled?: boolean;

  accept: "image/*" | "video/*" | "audio/*";
  multiple: boolean;
  maxSize?: number;
};

const DropZoneContext = createContext<DropZoneContextValue | null>(null);

export type DropZoneProps = {
  onDropRejected?: (error: DropZoneError) => void;
  onDropAccepted: (files: File[]) => void;

  children: ReactNode;

  isInvalid?: DropZoneContextValue["isInvalid"];
  disabled?: DropZoneContextValue["disabled"];

  accept: DropZoneContextValue["accept"];
  multiple: DropZoneContextValue["multiple"];
  maxSize?: DropZoneContextValue["maxSize"];
};

function DropZone({
  children,
  onDropRejected,
  disabled,
  isInvalid,
  accept,
  multiple,
  onDropAccepted,
  maxSize,
}: DropZoneProps) {
  const [errors, setErrors] = useState<DropZoneError>([]);

  function processErrors(error: DropZoneError | null) {
    if (!error) return setErrors([]);
    setErrors(error);
    onDropRejected?.(error);
  }

  /**
   * Validates the selected files
   */
  function processFiles(files: File[]) {
    if (disabled) return;

    const { acceptedFiles, rejectedFiles } = validateFiles({
      files,
      maxSize: maxSize || Infinity,
      accept: accept,
    });

    processErrors(rejectedFiles.flatMap(({ error }) => error));

    if (!acceptedFiles || acceptedFiles.length === 0) return;

    if (multiple) onDropAccepted(acceptedFiles);
    if (!multiple) {
      if (acceptedFiles.length > 1)
        return processErrors?.([
          {
            message:
              "Only one file can be uploaded at a time, please select one file at a time.",
          },
        ]);
      onDropAccepted(acceptedFiles);
    }
  }

  return (
    <DropZoneContext
      value={{
        errors,
        processErrors,
        disabled,
        isInvalid: isInvalid || errors.length > 0,
        processFiles,
        accept,
        multiple,
        maxSize,
      }}
    >
      {children}
    </DropZoneContext>
  );
}

function useDropZone() {
  const context = use(DropZoneContext);
  if (!context)
    throw new Error("DropZoneContext was called outside of its provider!");
  return context;
}

type DropZoneContentProps = {
  inputProps?: Omit<
    ComponentProps<"input">,
    "ref" | "accept" | "multiple" | "disabled"
  >;
  className?: string;
};

function DropZoneContent({
  className,
  inputProps: {
    className: inputClassName,
    onChange: inputOnChange,
    ...inputProps
  } = {},
}: DropZoneContentProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { disabled, isInvalid, processFiles, accept, multiple, maxSize } =
    useDropZone();

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

function DropZoneError({
  className,
  ...props
}: ComponentProps<typeof FieldError>) {
  const { errors } = useDropZone();

  if (!errors) return null;
  return (
    <FieldError
      className={cn(
        "my-1 flex-wrap text-start break-all [&_ul]:flex-wrap",
        className,
      )}
      errors={errors}
      {...props}
    />
  );
}

export { DropZone, DropZoneContent, DropZoneError };
