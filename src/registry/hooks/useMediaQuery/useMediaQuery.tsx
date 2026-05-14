"use client";

import { type ReactNode, useSyncExternalStore } from "react";

type OnStoreChange = Parameters<Parameters<typeof useSyncExternalStore>[0]>[0];

function createMediaQueryStore(query: string) {
  function subscribe(onStoreChange: OnStoreChange) {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", onStoreChange);
    return () => mediaQueryList.removeEventListener("change", onStoreChange);
  }

  function getSnapshot() {
    return window.matchMedia(query).matches;
  }

  function getServerSnapshot() {
    return undefined;
  }

  return { subscribe, getSnapshot, getServerSnapshot } as const;
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

type Breakpoint = keyof typeof tailwindCssBreakpoints;
type Direction = "min" | "max";

/**
 * a type safe wrapper around useMediaQuery to use tailwind css breakpoints
 */
function useMediaQueryBreakpoint(
  breakpoint: Breakpoint,
  direction: Direction = "min",
) {
  return useMediaQuery(
    `(${direction}-width: ${tailwindCssBreakpoints[breakpoint]})`,
  );
}

type MediaQueryBreakpointProps = {
  breakpoint: Breakpoint;
  direction?: Direction;
  fallback: ReactNode;
  children: ReactNode;
};

function MediaQueryBreakpoint({
  breakpoint,
  direction = "min",
  fallback,
  children,
}: MediaQueryBreakpointProps) {
  const isMatch = useMediaQueryBreakpoint(breakpoint, direction);

  if (typeof isMatch === "undefined") return fallback;
  if (!isMatch) return null;
  return children;
}

export { useMediaQuery, useMediaQueryBreakpoint, MediaQueryBreakpoint };
