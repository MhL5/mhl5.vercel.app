"use client";

import { useCallback, useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
  const callbackRef = useRef(callback);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const set = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    set();
    return clear;
  }, [set, clear]);

  return { reset, clear };
}
