"use client";

import { X } from "lucide-react";
import {
  type ClipboardEvent,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
} & Omit<ComponentProps<typeof Input>, "value" | "onChange">;

export function TagsInput({
  value = [],
  onChange,
  onBlur,
  onKeyDown,
  onPaste,
  className,
  disabled,
  placeholder = "Press Enter or a comma to add a tag",
  ...props
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  function addTag(tag: string) {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check for duplicates
    if (value.includes(trimmedTag)) return setInputValue("");

    onChange?.([...value, trimmedTag]);
    setInputValue("");
  }

  function addTags(tags: string[]) {
    const trimmedTags = tags.map((tag) => tag.trim());
    if (!trimmedTags.length) return;
    // Check for duplicates
    const newTags = trimmedTags.filter((tag) => !value.includes(tag));
    if (!newTags.length) return;

    onChange?.([...value, ...newTags]);
    setInputValue("");
  }

  function removeTag(indexToRemove: number) {
    onChange?.([
      ...value.slice(0, indexToRemove),
      ...value.slice(indexToRemove + 1),
    ]);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
      return;
    }

    if (e.key === "Backspace" && !inputValue && value.length > 0)
      return removeTag(value.length - 1);

    onKeyDown?.(e);
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    if (!inputValue.trim()) return;
    addTag(inputValue);
    onBlur?.(e);
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    e.stopPropagation();
    const text = e.clipboardData.getData("text");
    if (!text || typeof text !== "string") return;
    const tags = text.split(",");
    if (!tags.length) return;
    addTags(tags);

    onPaste?.(e);
  }

  return (
    <div
      className={cn(
        "min-h-10.5 w-full cursor-text rounded-lg border bg-background px-3 py-2 text-sm",
        "flex flex-wrap items-center gap-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "[&:has([aria-invalid=true])]:border-destructive [&:has([aria-invalid=true])]:ring-destructive/20 dark:[&:has([aria-invalid=true])]:ring-destructive/40",
      )}
    >
      {value.map((tag, index) => (
        <span
          key={tag + index.toString()}
          className="group inline-flex items-center gap-2 rounded-md bg-primary/10 py-1 pr-1 pl-2.5 font-medium text-primary text-sm transition-colors hover:bg-primary/20"
        >
          <span>{tag}</span>
          {!disabled && (
            <Button
              variant="destructiveGhost"
              size="icon"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(index);
              }}
              className="size-5"
              title={`click to remove "${tag}" tag`}
            >
              <X />
            </Button>
          )}
        </span>
      ))}

      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onPaste={handlePaste}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "h-auto min-w-[120px] flex-1 rounded-none border-none bg-transparent p-0 outline-none placeholder:text-muted-foreground focus-visible:border-none focus-visible:ring-0 disabled:cursor-not-allowed dark:bg-transparent",
          className,
        )}
        {...props}
      />
    </div>
  );
}
