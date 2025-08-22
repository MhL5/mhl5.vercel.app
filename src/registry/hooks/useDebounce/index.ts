"use client";

import useTimeout from "@/registry/hooks/useTimeout";
import { useEffect, useState } from "react";

export function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: unknown[],
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
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
