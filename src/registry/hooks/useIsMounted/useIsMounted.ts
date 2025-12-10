"use client";

import { useSyncExternalStore } from "react";

const subscribe = (onStoreChange: () => void) => () => onStoreChange();

const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const useIsMounted = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
