"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { isDev } from "@/registry/utils/checks/checks";

/**
 * A React hook that synchronizes state with localStorage, providing reactive updates
 * across browser tabs and windows.
 *
 * @remarks
 * ## Key Features:
 * - **Cross-tab synchronization**: Changes in one tab automatically update all other tabs
 * - **Infinite loop prevention**: Uses string snapshots internally to prevent React re-render loops
 * - **Automatic cleanup**: Setting `null`, `undefined`, or `""` removes the item from localStorage
 * - **Error handling**: Falls back to initialValue if JSON parsing fails
 *
 * ## Important Limitations:
 * - **No SSR support**: This hook must only be called on the client side. The server snapshot
 *   always returns `null`, which will cause the initial value to be used during hydration.
 * - **JSON serialization**: Only values that can be serialized with `JSON.stringify()` are supported.
 *   Functions, `undefined`, and circular references cannot be stored.
 *
 * ## How it works:
 * 1. Uses `useSyncExternalStore` to subscribe to localStorage changes
 * 2. Listens to native `storage` events (for changes from other tabs)
 * 3. Dispatches custom `local-storage-change` events (for changes in the current tab)
 * 4. Returns a string snapshot to prevent infinite loops, then parses it in a `useMemo`
 *
 * @example
 *
 * // Basic usage
 * const [count, setCount] = useLocalStorage('count', 0);
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  /**
   * we cant parse the json here because if the parsed value is an object, it will cause an infinite loop
   * we will only return a string snapshot and parse it after (string is a primitive value)
   */
  const getSnapshot = useCallback(() => localStorage.getItem(key), [key]);

  /**
   * for server side rendering, we return null, there is no ssr support for this hook
   * ensure that this hook is called only on the client side
   */
  const getServerSnapshot = useCallback(() => null, []);

  /**
   * Subscribe to the storage event
   * storage event gets called for other tabs but not for the current tab (other tabs)
   * we use local-storage-change event for the current tab
   */
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
        "local-storage-change",
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
   * useSyncExternalStore hook will cause infinite loop if the snapshot is not a primitive value
   *
   * we will return a string snapshot and parse it after (string is a primitive value)
   *
   * this way even if the parsed value is not a primitive value, it will not cause an infinite loop
   */
  const snapshotString = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  /**
   * parses the snapshot string to the actual value
   *
   * returns the resolved initial value if the parsing fails
   */
  const parsedSnapshot = useMemo(() => {
    const resolvedInitialValue =
      initialValue instanceof Function ? initialValue() : initialValue;
    try {
      return snapshotString ? JSON.parse(snapshotString) : resolvedInitialValue;
    } catch (error) {
      if (isDev())
        // biome-ignore lint/suspicious/noConsole: only logs on development
        console.error(`Error parsing value for ${key} in localStorage`, error);
      return resolvedInitialValue;
    }
  }, [snapshotString, initialValue, key]);

  /**
   * sets the value to the local storage
   *
   * dispatches a custom event to the current tab to notify other tabs about the change
   *
   * if the value is null or undefined or empty string, it will remove the item from the local storage
   */
  const setData = useCallback(
    (value: T | ((prev: T) => T)) => {
      const resolvedValue =
        value instanceof Function ? value(parsedSnapshot) : value;

      const isResolvedValueInvalid =
        resolvedValue === undefined ||
        resolvedValue === null ||
        resolvedValue === "";

      if (isResolvedValueInvalid) localStorage.removeItem(key);
      else localStorage.setItem(key, JSON.stringify(resolvedValue));
      window.dispatchEvent(
        new CustomEvent("local-storage-change", { detail: { key } }),
      );
    },
    [key, parsedSnapshot],
  );

  return useMemo(
    () => [parsedSnapshot, setData] as const,
    [parsedSnapshot, setData],
  );
}
