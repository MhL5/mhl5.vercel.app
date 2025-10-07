"use client";

import { useEffect, useState } from "react";
import { useTimeout } from "@/registry/hooks/useTimer/useTimer";

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: unknown[],
) {
  const { reset, clear } = useTimeout(callback, delay);
  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to run this on dependencies change
  useEffect(reset, [...dependencies, reset]);
  // biome-ignore lint/correctness/useExhaustiveDependencies: we need to run this on dependencies change
  useEffect(clear, [clear]);
}

export function useDebouncedValue<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useDebounce(
    () => {
      setDebouncedValue(inputValue);
    },
    delay,
    [inputValue],
  );

  return debouncedValue;
}
