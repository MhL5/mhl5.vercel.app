"use client";

import { isServer } from "@/registry/utils/checks/checks";
import { useEffect, useRef } from "react";

// Overload for Window events
export default function useEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (e: WindowEventMap[T]) => void,
  element?: Window | undefined,
): void;

// Overload for Document events
export default function useEventListener<T extends keyof DocumentEventMap>(
  eventType: T,
  callback: (e: DocumentEventMap[T]) => void,
  element: Document | undefined,
): void;

// Overload for HTMLElement events
export default function useEventListener<T extends keyof HTMLElementEventMap>(
  eventType: T,
  callback: (e: HTMLElementEventMap[T]) => void,
  element: HTMLElement | undefined,
): void;

export default function useEventListener<
  T extends keyof (WindowEventMap & DocumentEventMap & HTMLElementEventMap),
>(
  eventType: T,
  callback: (e: Event) => void,
  element: Window | Document | HTMLElement | undefined = undefined,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const defaultElement = element ?? (isServer() ? undefined : window);

    if (!defaultElement) return;

    const handler = (e: Event) => callbackRef.current(e);
    defaultElement.addEventListener(eventType, handler as EventListener);

    return () =>
      defaultElement.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
}
