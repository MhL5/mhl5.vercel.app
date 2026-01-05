"use client";

import { useEffect, useEffectEvent } from "react";

// Overload for Window events
export default function useEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (e: WindowEventMap[T]) => void,
  element: Window | undefined,
): void;

// Overload for Document events
export default function useEventListener<T extends keyof DocumentEventMap>(
  eventType: T,
  callback: (e: DocumentEventMap[T]) => void,
  element: Document | undefined,
): void;

// Overload for HTMLElement and EventTarget (ref.current) events
export default function useEventListener<T extends keyof HTMLElementEventMap>(
  eventType: T,
  callback: (e: HTMLElementEventMap[T]) => void,
  element: HTMLElement | EventTarget | undefined,
): void;

export default function useEventListener<
  T extends keyof (WindowEventMap & DocumentEventMap & HTMLElementEventMap),
>(
  eventType: T,
  callback: (e: Event) => void,
  element: Window | Document | HTMLElement | EventTarget | undefined,
): void {
  const eventHandler = useEffectEvent((e: Event) => {
    callback(e);
  });

  useEffect(() => {
    if (!element) return;
    const abortController = new AbortController();

    element.addEventListener(eventType, eventHandler, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [eventType, element]);
}
