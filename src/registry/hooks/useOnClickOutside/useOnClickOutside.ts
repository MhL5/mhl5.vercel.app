"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: PointerEvent) => void,
  enabled = true,
) {
  const onClickEvent = useEffectEvent((e: PointerEvent) =>
    ref.current && !ref.current.contains(e.target as Node) ? cb(e) : null,
  );

  useEffect(() => {
    if (!enabled) return;

    const abortController = new AbortController();

    document.addEventListener("click", onClickEvent, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [enabled]);
}

export { useOnClickOutside };
