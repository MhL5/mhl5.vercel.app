"use client";

import { useSyncExternalStore } from "react";

type Serializer<T> = (value: T) => string;
type Deserializer<T> = (value: string) => T;

function createLocalStorageStore<T>(
  key: string,
  defaultValue: T,
  serialize: Serializer<T>,
  deserialize: Deserializer<T>,
) {
  let currentValue: T = readFromLocalStorage(key, defaultValue, deserialize);
  const listeners = new Set<() => void>();

  function readFromLocalStorageInner(): T {
    try {
      const item = window.localStorage.getItem(key);
      if (item == null) return defaultValue;
      return deserialize(item);
    } catch {
      return defaultValue;
    }
  }

  function notify() {
    for (const listener of listeners) listener();
  }

  function setValue(next: T | ((prev: T) => T)) {
    const resolved =
      typeof next === "function"
        ? (next as (prev: T) => T)(currentValue)
        : next;

    currentValue = resolved;

    try {
      window.localStorage.setItem(key, serialize(resolved));
    } catch {
      // ignore write errors (quota, private mode, etc.)
    }

    notify();
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function getSnapshot() {
    return currentValue;
  }

  // for SSR: just use default; localStorage isn't available
  function getServerSnapshot() {
    return defaultValue;
  }

  // Sync store when other tabs or same tab modify this key or clear storage
  if (
    typeof window !== "undefined" &&
    typeof window.addEventListener === "function"
  ) {
    window.addEventListener("storage", (event) => {
      if (event.key === key || event.key === null) {
        currentValue = readFromLocalStorageInner();
        notify();
      }
    });
  }

  return {
    subscribe,
    getSnapshot,
    getServerSnapshot,
    setValue,
  };
}

function readFromLocalStorage<T>(
  key: string,
  defaultValue: T,
  deserialize: Deserializer<T>,
): T {
  if (typeof window === "undefined") {
    // SSR / Node: just return default
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    if (item == null) return defaultValue;
    return deserialize(item);
  } catch {
    return defaultValue;
  }
}

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options?: {
    serialize?: Serializer<T>;
    deserialize?: Deserializer<T>;
  },
): [T, (value: T | ((prev: T) => T)) => void] {
  const serialize: Serializer<T> =
    options?.serialize ?? ((value) => JSON.stringify(value));
  const deserialize: Deserializer<T> =
    options?.deserialize ?? ((value) => JSON.parse(value));

  const store = createLocalStorageStore<T>(
    key,
    defaultValue,
    serialize,
    deserialize,
  );

  const value = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );

  return [value, store.setValue];
}
