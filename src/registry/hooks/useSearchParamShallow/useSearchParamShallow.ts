"use client";

import { usePathname, useSearchParams } from "next/navigation";

type Options = {
  history?: "push" | "replace";
};

function useSearchParamShallow(name: string, options: Options = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function createQueryString(value: string | null) {
    const params = new URLSearchParams(window.location.search);

    if (value) params.set(name, value);
    else params.delete(name);

    return params.toString();
  }

  function setValue(value: string | null) {
    const queryString = createQueryString(value);
    const newPath = `${pathname}${queryString ? `?${queryString}` : ``}`;

    const historyMethod = options?.history || "push";

    window.history[`${historyMethod}State`](null, "", newPath);
  }

  return [searchParams.get(name), setValue] as const;
}

export { useSearchParamShallow };
