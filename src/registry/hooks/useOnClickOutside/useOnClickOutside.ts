"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

export default function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: MouseEvent) => void,
) {
  const onClickEvent = useEffectEvent((e: PointerEvent) =>
    ref.current && !ref.current.contains(e.target as HTMLElement)
      ? cb(e)
      : null,
  );

  useEffect(() => {
    const abortController = new AbortController();

    document.addEventListener("click", onClickEvent, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [ref]);
}
