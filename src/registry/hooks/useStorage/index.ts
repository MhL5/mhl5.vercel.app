"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
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

function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() =>
    _getSnapshot(key, defaultValue, sessionStorage),
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

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
    // optional error handling for development
    if (process.env.NODE_ENV === "development")
      throw new Error(error instanceof Error ? error.message : "Unknown error");

    return defaultValue;
  }
}

export { useLocalStorage, useSessionStorage };
