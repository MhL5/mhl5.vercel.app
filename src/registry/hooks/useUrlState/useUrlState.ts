"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useTransition,
} from "react";

type Options = {
  defaultValue?: string | (() => string);
  history?: "push" | "replace";
  /**
   * If true, updates the URL using window.history (pushState/replaceState) instead of Next.js router,
   * preventing a server-side render. This keeps the update fully client-side.
   */
  shallow?: boolean;
};

export default function useUrlState(name: string, options: Options = {}) {
  const optionsRef = useRef(options);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [state, setState] = useState<string>(() => {
    const value = searchParams.get(name);
    if (value) return value;

    const defaultValue =
      options.defaultValue instanceof Function
        ? options.defaultValue()
        : options.defaultValue;

    return defaultValue ?? "";
  });

  const handleSetState = useCallback(
    (value: string | ((prev: string) => string)) => {
      const newValue = typeof value === "function" ? value(state) : value;
      setState(newValue);

      const newPath = `${pathname}?${createQueryString({
        searchParams: searchParams,
        name,
        value: newValue,
      })}`;

      startTransition(() => {
        const historyMethod = optionsRef.current.history || "push";
        if (optionsRef.current.shallow)
          return window.history[`${historyMethod}State`](null, "", newPath);

        router[historyMethod](newPath as Route, {
          scroll: false,
        });
      });
    },
    [name, pathname, router, searchParams, state],
  );

  const onSearchParamValueChange = useEffectEvent((value: string) => {
    setState(value);
  });

  useEffect(() => {
    const value = searchParams.get(name);
    if (value) onSearchParamValueChange(value); // updates the state when the search params change
  }, [name, searchParams]);

  return [state, handleSetState, isPending] as const;
}

type CreateQueryStringParams = {
  searchParams: URLSearchParams;
  name: string;
  value: string;
};

function createQueryString({
  searchParams,
  name,
  value,
}: CreateQueryStringParams) {
  const params = new URLSearchParams(searchParams.toString());
  if (value) params.set(name, value);
  else params.delete(name);
  return params.toString();
}
