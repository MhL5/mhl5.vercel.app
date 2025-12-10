"use client";

import { useSyncExternalStore } from "react";
import type { StringWithAutoComplete } from "@/registry/types/AutoComplete/AutoComplete";

type Direction = "max" | "min";

type CssQueryString =
  StringWithAutoComplete<`(${Direction}-width: ${number}rem)`>;

function subscribe(cssQueryString: CssQueryString, onChange: () => void) {
  const mediaQueryList = window.matchMedia(cssQueryString);
  mediaQueryList.addEventListener("change", onChange);
  return () => mediaQueryList.removeEventListener("change", onChange);
}

function getSnapshot(cssQueryString: CssQueryString) {
  return window.matchMedia(cssQueryString).matches;
}

function getServerSnapshot() {
  return false;
}

function useMediaQuery(cssQueryString: CssQueryString) {
  return useSyncExternalStore(
    (onChange) => subscribe(cssQueryString, onChange),
    () => getSnapshot(cssQueryString),
    getServerSnapshot,
  );
}

export { useMediaQuery };
