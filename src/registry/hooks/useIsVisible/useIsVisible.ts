"use client";

import { useCallback, useEffect, useState } from "react";

type UseIsVisibleOptions = {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  root?: IntersectionObserverInit["root"];
  threshold?: IntersectionObserverInit["threshold"];
  once?: boolean;
  initialState?: boolean | (() => boolean);
};

export type UseIsVisibleRef = ReturnType<typeof useIsVisible>["ref"];

export default function useIsVisible({
  rootMargin = "0px",
  root,
  threshold,
  once = false,
  initialState = false,
}: UseIsVisibleOptions = {}) {
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
      { rootMargin, root, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      observer.unobserve(element);
      isMounted = false;
    };
  }, [element, rootMargin, once, root, threshold]);

  return { isVisible, ref: refCallback };
}
