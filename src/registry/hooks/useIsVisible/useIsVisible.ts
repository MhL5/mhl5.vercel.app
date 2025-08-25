"use client";

import { useCallback, useEffect, useState } from "react";

type useIsVisibleOptions = {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  once?: boolean;
  initialState?: boolean | (() => boolean);
};

export type useIsVisibleRef = ReturnType<typeof useIsVisible>["ref"];

export default function useIsVisible({
  rootMargin = "0px",
  once = false,
  initialState = false,
}: useIsVisibleOptions = {}) {
  const [isVisible, setIsVisible] = useState(() => {
    if (initialState instanceof Function) return initialState();
    return initialState;
  });
  // refCallback automatically triggers when the element changes, while useRef doesn't
  // using useRef can break the logic specially if the component gets rendered with a delay due to fetching ...
  const [element, setElement] = useState<HTMLElement | null>(null);
  const refCallback = useCallback((node: HTMLElement | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    // IntersectionObserver is async and callback can even run after the component is unmounted
    // so we need to check if the component is mounted before setting the state
    let isMounted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!isMounted) return;

        setIsVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      isMounted = false;
    };
  }, [element, rootMargin, once]);

  return { isVisible, ref: refCallback };
}
