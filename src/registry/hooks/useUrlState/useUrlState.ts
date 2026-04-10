"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Options = {
  history?: "push" | "replace";
  /**
   * If true, updates the URL using window.history (pushState/replaceState) instead of Next.js router,
   * preventing a server-side render. This keeps the update fully client-side.
   */
  shallow?: boolean;
};

function useSearchParam(name: string, options: Options = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function createQueryString(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(name, value);
    else params.delete(name);

    return params.toString();
  }

  function setValue(value: string | null) {
    const queryString = createQueryString(value);
    const newPath = `${pathname}${queryString ? `?${queryString}` : ``}`;

    const historyMethod = options?.history || "push";

    if (options?.shallow)
      return window.history[`${historyMethod}State`](null, "", newPath);
    router[historyMethod](newPath as Route);
  }

  return [searchParams.get(name), setValue] as const;
}

export { useSearchParam };
