"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/registry/hooks/useDebounce/useDebounce";
import {
  type ComponentProps,
  useEffect,
  useEffectEvent,
  useState,
} from "react";

type DebouncedInputProps = {
  onDebouncedChange: (value: string) => void;
  value?: string;
  delay?: number;
} & Omit<ComponentProps<typeof Input>, "value">;

export default function DebouncedInput({
  value,
  onDebouncedChange,
  delay = 200,
  onChange,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(value || "");

  useDebounce(
    () => {
      onDebouncedChange(inputValue);
    },
    delay,
    [inputValue],
  );

  const onValueChange = useEffectEvent(
    (value: DebouncedInputProps["value"]) => {
      setInputValue(value || "");
    },
  );

  useEffect(() => {
    // keeps internal `inputValue` state in sync with the external `value` prop
    onValueChange(value);
  }, [value]);

  return (
    <Input
      value={inputValue}
      onChange={(e) => {
        onChange?.(e);
        setInputValue(e.target.value);
      }}
      {...props}
    />
  );
}
