"use client";

import { useEffect, useEffectEvent } from "react";

// Overload for Window events
export default function useEventListener<T extends keyof WindowEventMap>(
  eventType: T,
  callback: (e: WindowEventMap[T]) => void,
  element?: Window,
): void;

// Overload for Document events
export default function useEventListener<T extends keyof DocumentEventMap>(
  eventType: T,
  callback: (e: DocumentEventMap[T]) => void,
  element: Document,
): void;

// Overload for HTMLElement and EventTarget (ref.current) events
export default function useEventListener<T extends keyof HTMLElementEventMap>(
  eventType: T,
  callback: (e: HTMLElementEventMap[T]) => void,
  element: HTMLElement | EventTarget,
): void;

export default function useEventListener<
  T extends keyof (WindowEventMap & DocumentEventMap & HTMLElementEventMap),
>(
  eventType: T,
  callback: (e: Event) => void,
  element: Window | Document | HTMLElement | EventTarget = window,
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
