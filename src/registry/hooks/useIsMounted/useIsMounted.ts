"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

const useIsMounted = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export { useIsMounted };
