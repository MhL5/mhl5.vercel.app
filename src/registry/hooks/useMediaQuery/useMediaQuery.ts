"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onChange: () => void) {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", onChange);
  return () => mediaQueryList.removeEventListener("change", onChange);
}

function getSnapshot(query: string) {
  return window.matchMedia(query).matches;
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => getSnapshot(query),
    () => undefined,
  );
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
