"use client";

import { InfoIcon, Plus, X } from "lucide-react";
import {
  type ChangeEvent,
  type ClipboardEvent,
  type ComponentProps,
  createContext,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  use,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type TagsInputContextType = {
  value: string[];
  onChange: (tags: string[]) => void;

  inputValue: string;
  setInputValue: (value: string) => void;
  error: string | null;

  addTag: (tag: string) => void;
  addTags: (tags: string[]) => void;
  removeTag: (indexToRemove: number) => void;
  disabled?: boolean;
};

const TagsInputContext = createContext<TagsInputContextType | null>(null);

type TagsInputProviderProps = {
  value: TagsInputContextType["value"];
  onChange: TagsInputContextType["onChange"];

  disabled: TagsInputContextType["disabled"];
  children: ReactNode;

  validate?: (tag: string) => boolean;
  validateMessage?: (tag: string | string[]) => string;
  maxTags?: number;
};

function TagsInput({
  value,
  onChange,
  children,
  validate,
  validateMessage,
  disabled,
  maxTags,
}: TagsInputProviderProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTag: TagsInputContextType["addTag"] = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check max tags limit
    if (maxTags && value.length >= maxTags) {
      setError(
        `You can add up to ${maxTags} tag${maxTags === 1 ? "" : "s"} only`,
      );
      return setInputValue("");
    }

    // Check for duplicates
    if (value.includes(trimmedTag)) {
      setError(`"${trimmedTag}" already exists`);
      return setInputValue("");
    }

    // Validate tag if validate function is provided
    if (validate && !validate(trimmedTag)) {
      setError(
        validateMessage
          ? validateMessage(trimmedTag)
          : `"${trimmedTag}" is invalid`,
      );
      return setInputValue("");
    }

    setError(null);
    onChange?.([trimmedTag, ...value]);
    setInputValue("");
  };

  const addTags: TagsInputContextType["addTags"] = (tags) => {
    if (!tags.length) return;

    const trimmedTags = tags.map((tag) => tag.trim());
    if (!trimmedTags.length) return;

    // Filter empty strings, duplicates, and invalid tags
    let newTags = trimmedTags.filter((tag) => tag && !value.includes(tag));
    // Apply validation if provided
    const invalidTags: string[] = [];
    if (validate)
      newTags = newTags.filter((tag) => {
        if (validate(tag)) return true;
        invalidTags.push(tag);
        return false;
      });

    if (!newTags.length)
      return setError(
        validateMessage ? validateMessage(invalidTags) : "No valid tags to add",
      );

    if (maxTags) {
      const remainingSlots = maxTags - value.length;
      newTags = newTags.slice(0, remainingSlots);
      if (!newTags.length)
        return setError(
          `You have reached the maximum number of tags (${maxTags})`,
        );
    }

    onChange?.([...newTags, ...value]);
    setError(null);
    setInputValue("");
  };

  const removeTag: TagsInputContextType["removeTag"] = (indexToRemove) => {
    onChange?.([
      ...value.slice(0, indexToRemove),
      ...value.slice(indexToRemove + 1),
    ]);
  };

  return (
    <TagsInputContext
      value={{
        value,
        onChange,
        inputValue,
        setInputValue,
        addTag,
        addTags,
        removeTag,
        disabled,
        error,
      }}
    >
      {children}
    </TagsInputContext>
  );
}

function useTagsInput() {
  const context = use(TagsInputContext);
  if (!context)
    throw new Error("useTagsInput must be used within a TagsInputProvider");
  return context;
}

function TagsInputInput({
  onKeyDown,
  onBlur,
  onPaste,
  onChange,
  disabled: disabledProp,
  ...props
}: ComponentProps<typeof Input>) {
  const {
    inputValue,
    setInputValue,
    addTag,
    addTags,
    removeTag,
    value,
    disabled,
  } = useTagsInput();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    onChange?.(e);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeTag(value.length - 1);
    }

    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    }

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
    if (!text) return;

    addTags(text.split(","));
    onPaste?.(e);
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        {...props}
        disabled={disabled || disabledProp}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onPaste={handlePaste}
      />

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="sm" type="button" onClick={() => addTag(inputValue)}>
            <Plus />
          </Button>
        </TooltipTrigger>

        <TooltipContent>
          <p>Click to add tag &quot;{inputValue}&quot;</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

type TagsInputListProps = {
  children: (value: string[]) => ReactNode;
} & Omit<ComponentProps<"ul">, "children">;

function TagsInputList({ children, className, ...props }: TagsInputListProps) {
  const { value } = useTagsInput();

  return (
    <ul className={cn("flex flex-wrap gap-2", className)} {...props}>
      {children(value)}
    </ul>
  );
}

type TagsInputTagProps = {
  value: TagsInputContextType["value"][number];
} & ComponentProps<"li">;

function TagsInputTag({
  children,
  value,
  className,
  ...props
}: TagsInputTagProps) {
  const { removeTag, value: contextValue, disabled } = useTagsInput();

  function handleClick() {
    const valueIndex = contextValue.indexOf(value);
    if (valueIndex === -1) return;
    removeTag(valueIndex);
  }

  return (
    <li
      className={cn(
        "group inline-flex items-center gap-2 rounded-md bg-primary/10 py-1 pr-1 pl-2.5 font-medium text-primary text-sm transition-colors hover:bg-primary/20",
        className,
      )}
      {...props}
    >
      {children}

      <Button
        variant="destructive"
        size="icon"
        disabled={disabled}
        type="button"
        onClick={handleClick}
        className="size-5"
        title={`click to remove the tag`}
      >
        <X />
      </Button>
    </li>
  );
}

function TagsInputInfo() {
  return (
    <Tooltip>
      <TooltipTrigger aria-label="Info">
        <InfoIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>
        <p>
          You can add tags by typing and pressing{" "}
          <Kbd className="mx-1">Enter</Kbd>, <Kbd className="mx-1">,</Kbd>, or
          by clicking the add button.
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

function TagsInputErrorMessage() {
  const { error } = useTagsInput();

  if (!error) return null;
  return (
    <p
      className="font-medium text-destructive text-sm"
      role="alert"
      aria-live="polite"
    >
      {error}
    </p>
  );
}

export {
  TagsInput,
  TagsInputErrorMessage,
  TagsInputInfo,
  TagsInputInput,
  TagsInputList,
  TagsInputTag,
};
