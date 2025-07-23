import { useEffect, useRef } from "react";

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

// Overload for HTMLElement events
export default function useEventListener<T extends keyof HTMLElementEventMap>(
  eventType: T,
  callback: (e: HTMLElementEventMap[T]) => void,
  element: HTMLElement,
): void;

export default function useEventListener<
  T extends keyof (WindowEventMap & DocumentEventMap & HTMLElementEventMap),
>(
  eventType: T,
  callback: (e: Event) => void,
  element: Window | Document | HTMLElement = window,
): void {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (element == null) return;
    const handler = (e: Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler as EventListener);

    return () =>
      element.removeEventListener(eventType, handler as EventListener);
  }, [eventType, element]);
}
