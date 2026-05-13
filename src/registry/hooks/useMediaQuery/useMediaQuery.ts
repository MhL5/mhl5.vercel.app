"use client";

import { useSyncExternalStore } from "react";

type UseSyncExternalStoreParameters = Parameters<typeof useSyncExternalStore>;

function createMediaQueryStore(query: string) {
  const subscribe: UseSyncExternalStoreParameters[0] = (onStoreChange) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onStoreChange);
    return () => mediaQueryList.removeEventListener("change", onStoreChange);
  };

  const getSnapshot: UseSyncExternalStoreParameters[1] = () =>
    window.matchMedia(query).matches;

  const getServerSnapshot: UseSyncExternalStoreParameters[2] = () => undefined;

  return { subscribe, getSnapshot, getServerSnapshot };
}

function useMediaQuery(query: string) {
  const { getServerSnapshot, getSnapshot, subscribe } =
    createMediaQueryStore(query);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Tailwind V4 Breakpoints: https://tailwindcss.com/docs/responsive-design#overview
 */
const tailwindCssBreakpoints = {
  sm: "40rem", // 640px
  md: "48rem", // 768px
  lg: "64rem", // 1024px
  xl: "80rem", // 1280px
  "2xl": "96rem", // 1536px
};

/**
 * a type safe wrapper around useMediaQuery to use tailwind css breakpoints
 */
function useMediaQueryBreakpoint(
  breakpoint: keyof typeof tailwindCssBreakpoints,
  direction: "min" | "max" = "min",
) {
  return useMediaQuery(
    `(${direction}-width: ${tailwindCssBreakpoints[breakpoint]})`,
  );
}

export { useMediaQueryBreakpoint, useMediaQuery };
