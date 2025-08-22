"use client";

import { useDebounce } from "@/registry/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { useState, type ComponentPropsWithoutRef } from "react";

type DebouncedInputProps = {
  initialValue?: string;
  onDebouncedChange: (value: string) => void;
  delay?: number;
} & ComponentPropsWithoutRef<typeof Input>;

export default function DebouncedInput({
  initialValue,
  onDebouncedChange,
  delay = 200,
  ...props
}: DebouncedInputProps) {
  const [inputValue, setInputValue] = useState(initialValue || "");

  useDebounce(
    () => {
      onDebouncedChange(inputValue);
    },
    delay,
    [inputValue],
  );

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      {...props}
    />
  );
}
