"use client";

import { useEffect, useState } from "react";
import { isDev } from "@/registry/utils/checks/checks";

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => _getSnapshot(key, defaultValue));

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

function _getSnapshot<T>(key: string, defaultValue: T) {
  try {
    const item = sessionStorage.getItem(key);
    if (item) return JSON.parse(item);

    if (defaultValue instanceof Function) return defaultValue();
    return defaultValue;
  } catch (error) {
    if (isDev())
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    return defaultValue;
  }
}
