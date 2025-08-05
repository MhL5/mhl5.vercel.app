"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState, useTransition } from "react";

type Options = {
  defaultValue?: string | (() => string);
  history?: "push" | "replace";
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
      optionsRef.current.defaultValue instanceof Function
        ? optionsRef.current.defaultValue()
        : optionsRef.current.defaultValue;

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
        router[optionsRef.current.history || "push"](newPath, {
          scroll: false,
        });
      });
    },
    [name, pathname, router, searchParams, state],
  );

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
