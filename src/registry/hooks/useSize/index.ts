"use client";

import { useEffect, useState, type RefObject } from "react";

export default function useSize(ref: RefObject<HTMLElement | null>) {
  const [size, setSize] = useState<DOMRectReadOnly | null>(null);

  useEffect(() => {
    if (ref.current == null) return;

    const observer = new ResizeObserver(([entry]) =>
      setSize(entry.contentRect),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
