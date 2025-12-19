"use client";

import { isDev } from "@/registry/utils/checks/checks";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const LOCAL_STORAGE_CHANGE_EVENT = "local-storage-change";

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const getSnapshot = useCallback(() => localStorage.getItem(key), [key]);
  const subscribe = useCallback(
    (onChange: () => void) => {
      const abortController = new AbortController();

      window.addEventListener(
        "storage",
        (e) => {
          if (e.key === key) onChange();
        },
        {
          signal: abortController.signal,
        },
      );
      window.addEventListener(
        LOCAL_STORAGE_CHANGE_EVENT,
        (e) => {
          const customEvent = e as CustomEvent;
          if (customEvent.detail.key === key) onChange();
        },
        {
          signal: abortController.signal,
        },
      );

      return () => abortController.abort();
    },
    [key],
  );

  /**
   * we cant parse the json here
   * because if the parsed value is an object, it will cause an infinite loop
   * we will only return a string snapshot and parse it after (string is a primitive value)
   */
  const jsonSnapshot = useSyncExternalStore(subscribe, getSnapshot);

  const parsedSnapshot: T = useMemo(() => {
    const resolvedInitialValue =
      initialValue instanceof Function ? initialValue() : initialValue;
    try {
      return jsonSnapshot ? JSON.parse(jsonSnapshot) : resolvedInitialValue;
    } catch (error) {
      if (isDev())
        // eslint-disable-next-line no-console
        console.error(`Error parsing value for ${key} in localStorage`, error);
      return resolvedInitialValue;
    }
  }, [jsonSnapshot, initialValue, key]);

  const setData = useCallback(
    (value: T | ((prev: T) => T)) => {
      const resolvedValue =
        value instanceof Function ? value(parsedSnapshot) : value;

      const isResolvedValueInvalid =
        resolvedValue === undefined || resolvedValue === null;

      if (isResolvedValueInvalid) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(resolvedValue));
      window.dispatchEvent(
        new CustomEvent(LOCAL_STORAGE_CHANGE_EVENT, { detail: { key } }),
      );
    },
    [key, parsedSnapshot],
  );

  return useMemo(
    () => [parsedSnapshot, setData] as const,
    [parsedSnapshot, setData],
  );
}
