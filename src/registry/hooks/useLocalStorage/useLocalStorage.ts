"use client";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { readStorageJsonValue } from "@/utils/readStorageJson";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const defaultVal = useMemo(
    () => (defaultValue instanceof Function ? defaultValue() : defaultValue),
    [defaultValue],
  );

  const value: T = useSyncExternalStore(
    (cb) => _subscribe(key, cb),
    () => readStorageJsonValue(key, defaultVal, localStorage),
    () => defaultVal,
  );
  const valueRef = useRef(value);
  valueRef.current = value;

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const nextValue =
        newValue instanceof Function ? newValue(valueRef.current) : newValue;

      if (nextValue === undefined || nextValue === null)
        localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(nextValue));

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
