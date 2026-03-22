"use client";

import { jsonParseWithFallback } from "@/utils/jsonParseWithFallback";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const SESSION_STORAGE_CHANGE_EVENT = "session-storage-change";

function createSessionStorageStore(key: string) {
  function getServerSnapshot() {
    return null;
  }

  function getSnapshot() {
    return sessionStorage.getItem(key);
  }

  function subscribe(onStoreChange: () => void) {
    const abortController = new AbortController();

    window.addEventListener(
      SESSION_STORAGE_CHANGE_EVENT,
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

  return { subscribe, getSnapshot, getServerSnapshot };
}

function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  const { getServerSnapshot, getSnapshot, subscribe } = useMemo(
    () => createSessionStorageStore(key),
    [key],
  );

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

  const parsedSnapshot = useMemo(() => {
    const resolvedInitialValue =
      defaultValue instanceof Function ? defaultValue() : defaultValue;
    return jsonSnapshot
      ? (jsonParseWithFallback({
          fallback: resolvedInitialValue,
          json: jsonSnapshot,
        }) as T)
      : resolvedInitialValue;
  }, [defaultValue, jsonSnapshot]);

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

  return [parsedSnapshot, setData] as const;
}

export { useSessionStorage };
