"use client";

import { useSyncExternalStore } from "react";
import type { StringWithAutoComplete } from "@/registry/types/AutoComplete/AutoComplete";

type Direction = "max" | "min";

/**
 * Tailwind V4 Breakpoints: https://tailwindcss.com/docs/responsive-design#overview
 */
type TailwindCssBreakpoints = {
  sm: "40rem"; // 640px
  md: "48rem"; // 768px
  lg: "64rem"; // 1024px
  xl: "80rem"; // 1280px
  "2xl": "96rem"; // 1536px
};
type TailwindCssBreakpointValues =
  TailwindCssBreakpoints[keyof TailwindCssBreakpoints];

/**
 * Auto complete for tailwind css breakpoints
 */
type Query =
  StringWithAutoComplete<`(${Direction}-width: ${TailwindCssBreakpointValues})`>;

function subscribe(query: Query, onChange: () => void) {
  const mediaQueryList = window.matchMedia(query);
  mediaQueryList.addEventListener("change", onChange);
  return () => mediaQueryList.removeEventListener("change", onChange);
}

function getSnapshot(query: Query) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: Query) {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => getSnapshot(query),
    getServerSnapshot,
  );
}
