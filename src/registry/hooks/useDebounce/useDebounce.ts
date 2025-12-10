"use client";

import { useEffect, useState } from "react";
import { useTimeout } from "@/registry/hooks/useTimeout/useTimeout";

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

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounce(
    () => {
      setDebouncedValue(value);
    },
    delay,
    [value],
  );

  return debouncedValue;
}
