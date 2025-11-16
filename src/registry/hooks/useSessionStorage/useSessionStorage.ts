"use client";

import { useEffect, useState } from "react";
import { readStorageJsonValue } from "@/utils/readStorageJson";

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() =>
    readStorageJsonValue(key, defaultValue, sessionStorage),
  );

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
