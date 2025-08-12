"use client";

import useEventListener from "@/app/(with-navigation)/snippets/hooks/useEventListener";
import { isServer } from "@/app/(with-navigation)/snippets/utils/checks";

type useKeyProps = {
  key: KeyboardEvent["key"];
  eventName: "keydown" | "keyup" | "keypress";
  handler: () => void;
};

export function useKey({ eventName, key, handler }: useKeyProps) {
  useEventListener(
    eventName,
    (e) => {
      if (!(e instanceof KeyboardEvent)) return;
      if (e.key.toLowerCase() === key.toLowerCase()) handler();
    },
    isServer() ? undefined : document,
  );
}
