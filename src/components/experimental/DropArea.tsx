import { cn } from "@/lib/utils";
import { FileUpIcon } from "lucide-react";
import { type ChangeEvent, type DragEvent, useRef, useState } from "react";

type DropAreaProps = {
  onDrop: (e: DragEvent<HTMLElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  className?: string;
};

/**
 * @example
 * <DropArea
 *   className="my-8 w-full"
 *   onDrop={(e) => {
 *     handleAddMd(e.dataTransfer.files);
 *   }}
 *   onChange={(e) => {
 *     handleAddMd(e.target.files);
 *   }}
 *   disabled={false}
 * />
 */
export default function DropArea({
  onDrop,
  onChange,
  disabled,
  className,
}: DropAreaProps) {
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
        multiple
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
        <p className="mb-2 text-xs text-muted-foreground">
          Drag & drop or click to browse
        </p>
      </div>
    </button>
  );
}
