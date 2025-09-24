"use client";

import useEventListener from "@/registry/hooks/useEventListener/useEventListener";
import { isDocumentAvailable } from "@/registry/utils/checks/checks";
import type { RefObject } from "react";

export default function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  cb: (e: MouseEvent) => void,
) {
  const element = isDocumentAvailable() ? document : undefined;

  useEventListener(
    "click",
    (e) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) cb(e);
    },
    element,
  );
}
