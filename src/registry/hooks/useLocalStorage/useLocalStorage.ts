"use no memo";

import { useCallback, useMemo, useRef, useSyncExternalStore } from "react";
import { readStorageJsonValue } from "@/utils/readStorageJson";

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  const defaultVal = useMemo(
    () => (defaultValue instanceof Function ? defaultValue() : defaultValue),
    [defaultValue],
  );
  const snapshotRef = useRef<T | null>(null);
  const snapshotKeyRef = useRef<string | null>(null);

  const getSnapshot = useCallback(() => {
    const newValue = readStorageJsonValue(key, defaultVal, localStorage);

    const isSame =
      snapshotKeyRef.current === key &&
      JSON.stringify(snapshotRef.current) === JSON.stringify(newValue);
    // Compare by JSON string to avoid reference inequality issues
    if (isSame) return snapshotRef.current;

    snapshotRef.current = newValue;
    snapshotKeyRef.current = key;
    return newValue;
  }, [key, defaultVal]);

  const snapshot: T = useSyncExternalStore(
    (cb) => _subscribe(key, cb),
    getSnapshot,
    () => defaultVal,
  );
  const valueRef = useRef(snapshot);
  valueRef.current = snapshot;

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const nextValue =
        newValue instanceof Function ? newValue(valueRef.current) : newValue;

      if (nextValue === undefined || nextValue === null)
        localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(nextValue));

      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
        }),
      );
    },
    [key],
  );

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
      }),
    );
  }, [key]);

  return [snapshot, setValue, remove] as const;
}

function _subscribe(key: string, callback: () => void) {
  const handler = (e: StorageEvent) => {
    if (e.key === key) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}
