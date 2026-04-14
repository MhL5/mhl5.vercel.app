"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { InfoIcon, Plus, X } from "lucide-react";
import {
  type ChangeEvent,
  type ClipboardEvent,
  type ComponentProps,
  type Dispatch,
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  type SetStateAction,
  createContext,
  use,
  useState,
} from "react";

const COMMA_CHARS = [",", "،"] as const;

const defaultMessages = {
  addTagButtonTitle: (tag: string) =>
    tag ? `click to add the tag "${tag}"` : "click to add a tag",
  removeTagButtonTitle: (tag: string) => `click to remove the tag "${tag}"`,
  infoParagraph: `Press "Enter" or "," to add a tag, or click the add button.`,
  infoAriaLabel: "Info",
  TagsInputInputPlaceholder: "write a tag...",

  errors: {
    duplicate: (tag: string) => `"${tag}" already exists`,
    invalidTag: (tag: string) => `"${tag}" is invalid`,
    noValidTags: "No valid tags to add",
    maxTagsReached: (maxTags: number) =>
      `You have reached the maximum number of tags (${maxTags})`,
  },
};

type TagsInputContextType = {
  value: string[];
  onChange: (tags: string[]) => void;

  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;

  addTag: (tag: string) => void;
  addTags: (tags: string[]) => void;
  removeTag: (indexToRemove: number) => void;
  disabled?: boolean;

  messages: typeof defaultMessages;
};

const TagsInputContext = createContext<TagsInputContextType | null>(null);

type TagsInputProps = {
  value: TagsInputContextType["value"];
  onChange: TagsInputContextType["onChange"];
  onError: (error: Array<{ message: string }>) => void;

  disabled: TagsInputContextType["disabled"];
  children: ReactNode;

  validate?: (tag: string) => boolean;
  validateMessage?: (tag: string | string[]) => string;
  maxTags?: number;

  messages?: typeof defaultMessages;
};

/**
 * TagsInput is a flexible input component for letting users add and remove tags.
 *
 * @example
 *  <TagsInput
 *    disabled={false}
 *    value={tags}
 *    onChange={setTags}
 *    maxTags={10}
 *    onError={(errors)=> {
 *     // tanstack form example
 *      field.setErrorMap({ onChange: errors });
 *      field.handleBlur();
 *    }}
 *  >
 *    <TagsInputInput />
 *
 *   <TagsInputList>
 *     {(value) =>
 *       value.map((tag) => (
 *         <TagsInputTag key={tag} value={tag}>
 *           {tag}
 *         </TagsInputTag>
 *       ))
 *     }
 *   </TagsInputList>
 *  </TagsInput>
 */
function TagsInput({
  value,
  onChange,
  onError,
  children,
  validate,
  validateMessage,
  disabled,
  maxTags,
  messages = defaultMessages,
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState("");

  const addTag: TagsInputContextType["addTag"] = (tag) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;

    // Check max tags limit
    if (maxTags && value.length >= maxTags) {
      onError([
        {
          message: messages.errors.maxTagsReached(maxTags),
        },
      ]);
      setInputValue("");
      return;
    }

    // Check for duplicates
    if (value.includes(trimmedTag)) {
      onError([
        {
          message: messages.errors.duplicate(tag),
        },
      ]);
      setInputValue("");
      return;
    }

    // Validate tag if validate function is provided
    if (validate && !validate(trimmedTag)) {
      onError([
        {
          message: validateMessage
            ? validateMessage(trimmedTag)
            : messages.errors.invalidTag(tag),
        },
      ]);
      setInputValue("");
      return;
    }

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
      return onError([
        {
          message: validateMessage
            ? validateMessage(invalidTags)
            : messages.errors.noValidTags,
        },
      ]);

    if (maxTags) {
      const remainingSlots = maxTags - value.length;
      newTags = newTags.slice(0, remainingSlots);
      if (!newTags.length)
        return onError([
          {
            message: messages.errors.maxTagsReached(maxTags),
          },
        ]);
    }

    onChange?.([...newTags, ...value]);
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
        messages,
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
    throw new Error("useTagsInput must be used within a <TagsInputProvider />");
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
    messages,
  } = useTagsInput();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    onChange?.(e);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(e);

    if (e.key === "Backspace" && !inputValue && value.length > 0)
      return removeTag(value.length - 1);

    if (
      e.key === "Enter" ||
      COMMA_CHARS.includes(e.key as (typeof COMMA_CHARS)[number])
    ) {
      e.preventDefault();
      addTag(inputValue);
      return;
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    onBlur?.(e);

    if (!inputValue.trim()) return;
    addTag(inputValue);
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    onPaste?.(e);

    e.preventDefault();
    e.stopPropagation();

    const text = e.clipboardData.getData("text").trim();
    const commaToSplitBy = COMMA_CHARS.find((comma) => text.includes(comma));

    if (!text) return;
    if (!commaToSplitBy) return setInputValue((prev) => prev + text);

    addTags(text.split(commaToSplitBy));
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        disabled={disabled || disabledProp}
        value={inputValue}
        onChange={handleChange}
        placeholder={messages.TagsInputInputPlaceholder}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onPaste={handlePaste}
        {...props}
      />

      <Button
        size="sm"
        title={messages.addTagButtonTitle(inputValue)}
        type="button"
        disabled={disabled || disabledProp}
        onClick={() => addTag(inputValue)}
      >
        <Plus />
      </Button>
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
  const { removeTag, value: contextValue, disabled, messages } = useTagsInput();

  function handleClick() {
    const valueIndex = contextValue.indexOf(value);
    if (valueIndex === -1) return;
    removeTag(valueIndex);
  }

  return (
    <li
      className={cn(
        "group inline-flex items-center gap-2 rounded-md bg-primary/10 py-1 ps-2.5 pe-1 text-sm font-medium text-primary transition-colors hover:bg-primary/20",
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
        title={messages.removeTagButtonTitle(value)}
      >
        <X />
      </Button>
    </li>
  );
}

function TagsInputInfo() {
  const { messages } = useTagsInput();

  return (
    <Tooltip>
      <TooltipTrigger aria-label={messages.infoAriaLabel}>
        <InfoIcon className="size-4" />
      </TooltipTrigger>
      <TooltipContent>
        <p>{messages.infoParagraph}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export {
  TagsInput,
  TagsInputInfo,
  TagsInputInput,
  TagsInputList,
  TagsInputTag,
};
