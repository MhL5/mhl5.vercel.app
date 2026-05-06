"use client";

import { useSyncExternalStore } from "react";

const useIsMounted = () =>
  useSyncExternalStore(
    (cb) => () => cb(),
    () => true,
    () => false,
  );

export { useIsMounted };
