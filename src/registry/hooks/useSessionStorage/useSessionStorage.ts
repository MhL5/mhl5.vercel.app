"use client";

import { isDev } from "@/registry/utils/checks/checks";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const SESSION_STORAGE_CHANGE_EVENT = "session-storage-change";

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  const getSnapshot = useCallback(() => sessionStorage.getItem(key), [key]);
  const subscribe = useCallback(
    (onChange: () => void) => {
      const abortController = new AbortController();

      window.addEventListener(
        SESSION_STORAGE_CHANGE_EVENT,
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
      defaultValue instanceof Function ? defaultValue() : defaultValue;
    try {
      return jsonSnapshot ? JSON.parse(jsonSnapshot) : resolvedInitialValue;
    } catch (error) {
      if (isDev())
        // eslint-disable-next-line no-console
        console.error(
          `Error parsing value for ${key} in sessionStorage`,
          error,
        );
      return resolvedInitialValue;
    }
  }, [jsonSnapshot, defaultValue, key]);

  const setData = useCallback(
    (value: T | ((prev: T) => T)) => {
      const resolvedValue =
        value instanceof Function ? value(parsedSnapshot) : value;

      const isResolvedValueInvalid =
        resolvedValue === undefined || resolvedValue === null;

      if (isResolvedValueInvalid) sessionStorage.removeItem(key);
      else sessionStorage.setItem(key, JSON.stringify(resolvedValue));

      window.dispatchEvent(
        new CustomEvent(SESSION_STORAGE_CHANGE_EVENT, { detail: { key } }),
      );
    },
    [key, parsedSnapshot],
  );

  return useMemo(
    () => [parsedSnapshot, setData] as const,
    [parsedSnapshot, setData],
  );
}
