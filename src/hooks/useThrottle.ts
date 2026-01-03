"use client";

import { useMemo } from "react";

import { useCallbackRef } from "./useCallbackRef";
import { useOnUnMount } from "./useOnUnMount";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  let shouldWait = false;
  let waitingArgs: Parameters<T> | null = null;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  function timeoutCallback() {
    if (waitingArgs === null) shouldWait = false;
    else {
      callback(...waitingArgs);
      waitingArgs = null;
      timeoutId = setTimeout(timeoutCallback, delay);
    }
  }

  const throttled = (...args: Parameters<T>) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    timeoutId = setTimeout(timeoutCallback, delay);
  };

  throttled.cancel = () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    timeoutId = null;
    shouldWait = false;
    waitingArgs = null;
  };

  return throttled;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
) {
  const callbackRef = useCallbackRef(callback);

  const throttled = useMemo(
    () => throttle(callbackRef, delay),
    [callbackRef, delay],
  );

  useOnUnMount(() => throttled.cancel());

  return throttled;
}
