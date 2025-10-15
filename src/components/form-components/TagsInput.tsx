"use client";

import { X } from "lucide-react";
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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type TagsInputContextType = {
  value: string[];
  onChange: (tags: string[]) => void;

  inputValue: string;
  setInputValue: (value: string) => void;

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
  maxTags?: number;
};

function TagsInput({
  value,
  onChange,
  children,
  disabled,
  validate,
  maxTags,
}: TagsInputProviderProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag: TagsInputContextType["addTag"] = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check max tags limit
    if (maxTags && value.length >= maxTags) {
      toast.error(`You have reached the maximum number of tags (${maxTags})`);
      return setInputValue("");
    }

    // Check for duplicates
    if (value.includes(trimmedTag)) {
      toast.error("Tag already exists");
      return setInputValue("");
    }

    // Validate tag if validate function is provided
    if (validate && !validate(trimmedTag)) {
      toast.error("Invalid tag");
      return setInputValue("");
    }

    onChange?.([...value, trimmedTag]);
    setInputValue("");
  };

  const addTags: TagsInputContextType["addTags"] = (tags) => {
    if (!tags.length) return;

    const trimmedTags = tags.map((tag) => tag.trim());
    if (!trimmedTags.length) return;

    // Filter empty strings, duplicates, and invalid tags
    let newTags = trimmedTags.filter((tag) => tag && !value.includes(tag));
    // Apply validation if provided
    if (validate) newTags = newTags.filter(validate);

    if (!newTags.length) return toast.error("No valid tags to add");

    if (maxTags) {
      const remainingSlots = maxTags - value.length;
      newTags = newTags.slice(0, remainingSlots);
      if (!newTags.length)
        return toast.error(
          `You have reached the maximum number of tags (${maxTags})`,
        );
    }

    onChange?.([...value, ...newTags]);
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
    <Input
      {...props}
      disabled={disabled || disabledProp}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      onPaste={handlePaste}
    />
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
        variant="destructiveGhost"
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

export { TagsInput, TagsInputInput, TagsInputList, TagsInputTag };
