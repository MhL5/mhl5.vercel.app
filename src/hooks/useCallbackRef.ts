import { useEffect, useMemo, useRef } from "react";

/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
// biome-ignore lint/suspicious/noExplicitAny: we need to use any to allow for any callback
export function useCallbackRef<T extends (...args: any[]) => any>(
  callback: T,
): T {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  return useMemo(() => ((...args) => callbackRef.current?.(...args)) as T, []);
}
