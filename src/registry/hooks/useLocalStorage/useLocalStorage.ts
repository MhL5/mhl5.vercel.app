"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { isDev } from "@/registry/utils/checks/checks";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const defaultVal = useMemo(() => {
    return defaultValue instanceof Function ? defaultValue() : defaultValue;
  }, [defaultValue]);

  const value = useSyncExternalStore(
    (cb) => _subscribe(key, cb),
    () => _getSnapshot(key, defaultVal, localStorage),
    () => defaultVal,
  );

  const setValue = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key],
  );

  return [value, setValue] as const;
}

function _subscribe(key: string, callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === key) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

function _getSnapshot<T>(key: string, defaultValue: T, storageObject: Storage) {
  try {
    const item = storageObject.getItem(key);
    if (item) return JSON.parse(item);
    if (defaultValue instanceof Function) return defaultValue();
    return defaultValue;
  } catch (error) {
    if (isDev())
      throw new Error(error instanceof Error ? error.message : "Unknown error");

    return defaultValue;
  }
}
