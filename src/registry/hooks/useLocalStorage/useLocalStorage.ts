"use client";

import { jsonParseWithFallback } from "@/utils/jsonParseWithFallback";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const LOCAL_STORAGE_CHANGE_EVENT = "local-storage-change";

function createLocalStorageStore(key: string) {
  function subscribe(onStoreChange: () => void) {
    const abortController = new AbortController();

    window.addEventListener(
      "storage",
      (e) => {
        if (e.key === key) onStoreChange();
      },
      {
        signal: abortController.signal,
      },
    );

    window.addEventListener(
      LOCAL_STORAGE_CHANGE_EVENT,
      (e) => {
        const customEvent = e as CustomEvent;
        if (customEvent.detail.key === key) onStoreChange();
      },
      {
        signal: abortController.signal,
      },
    );

    return () => abortController.abort();
  }

  function getSnapshot() {
    return localStorage.getItem(key);
  }

  function getServerSnapshot() {
    return undefined;
  }

  return { subscribe, getServerSnapshot, getSnapshot };
}

function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const { getServerSnapshot, getSnapshot, subscribe } =
    createLocalStorageStore(key);

  /**
   * we cant parse the json here
   * because if the parsed value is an object, it will cause an infinite loop
   * we will only return a string snapshot and parse it after (string is a primitive value)
   */
  const jsonSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const parsedSnapshot: T = useMemo(() => {
    const resolvedInitialValue =
      initialValue instanceof Function ? initialValue() : initialValue;

    if (!jsonSnapshot) return resolvedInitialValue;

    return jsonParseWithFallback({
      json: jsonSnapshot,
      fallback: resolvedInitialValue,
    });
  }, [jsonSnapshot, initialValue]);

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

export { useLocalStorage };
