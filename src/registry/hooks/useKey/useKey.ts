"use client";

import useEventListener from "@/registry/hooks/useEventListener/useEventListener";
import { isDocumentAvailable, isServer } from "@/registry/utils/checks/checks";

type UseKeyProps = {
  key: KeyboardEvent["key"];
  eventName: "keydown" | "keyup" | "keypress";
  handler: () => void;
};

export function useKey({ eventName, key, handler }: UseKeyProps) {
  useEventListener(
    eventName,
    (e) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key.toLowerCase() === key.toLowerCase()) handler();
    },
    isDocumentAvailable() ? document : undefined,
  );
}
