"use client";

import { useTimeout } from "@/registry/hooks/useTimeout/useTimeout";
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

export function useDebouncedValue<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounce(() => setDebouncedValue(value), delay, [value]);

  return debouncedValue;
}
