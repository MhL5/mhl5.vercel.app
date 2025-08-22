"use client";

import { useEffect, useState, type RefObject } from "react";

type useIsVisibleOptions = {
  rootMargin?: IntersectionObserverInit["rootMargin"];
  once?: boolean;
};

export default function useIsVisible(
  ref: RefObject<HTMLElement | null>,
  { rootMargin = "0px", once = false }: useIsVisibleOptions = {},
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
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
  }, [ref, rootMargin, once]);

  return isVisible;
}
