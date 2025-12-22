"use client";

import useEventListener from "@/registry/hooks/useEventListener/useEventListener";
import type { RefObject } from "react";

export default function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: MouseEvent) => void,
) {
  useEventListener(
    "click",
    (e) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) cb(e);
    },
    document,
  );
}
