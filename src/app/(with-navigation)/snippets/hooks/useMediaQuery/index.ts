import type { StringWithAutoComplete } from "~/contents/snippets/types/AutoComplete/AutoComplete";
import { useEffect, useMemo, useState } from "react";

type Direction = "max" | "min";
type TailwindcssBreakpointsRemValue =
  (typeof breakpoints)[keyof typeof breakpoints];
type CssQueryString =
  StringWithAutoComplete<`(${Direction}-width: ${TailwindcssBreakpointsRemValue}rem)`>;

function useMediaQueryCore(cssQueryString: CssQueryString) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(cssQueryString);

    const handleChange = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", handleChange);
    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [cssQueryString]);

  return matches;
}

/**
 * Hook for custom breakpoint values.
 *
 * queries can be changed to any css query.
 * @example
 * ```tsx
 * useMediaQuery("(min-width: 48rem)");
 * useMediaQuery("(min-width: 50rem)");
 * useMediaQuery("(max-width: 75rem)");
 * ```
 */
function useMediaQuery(cssQueryString: CssQueryString) {
  return useMediaQueryCore(cssQueryString);
}

/**
 * based on tailwind v4 breakpoints and some custom xs breakpoints
 * @see https://tailwindcss.com/docs/theme#default-theme-variable-reference
 */
const breakpoints = {
  "3xs": 16, // 352px
  "2xs": 24.25, // 388px
  xs: 28, // 448px
  sm: 40, // 640px
  md: 48, // 768px
  lg: 64, // 1024px
  xl: 80, // 1280px
  "2xl": 96, // 1536px
} as const;

/**
 * Hook for tailwind breakpoints
 * by default similar to tailwindcss it uses min-width
 * you can swap the direction to `max` to check for the breakpoint and below
 * @example
 * ```tsx
 * const isMobile = useMediaQueryBreakpoint("sm");
 * const isTablet = useMediaQueryBreakpoint("md","max");
 * const isDesktop = useMediaQueryBreakpoint("lg","min");
 * ```
 */
function useMediaQueryBreakpoint(
  breakpoint: keyof typeof breakpoints,
  direction: Direction = "min",
) {
  const valueInRem = useMemo(() => breakpoints[breakpoint], [breakpoint]);
  return useMediaQueryCore(`(${direction}-width: ${valueInRem}rem)`);
}

/**
 * returns true on `sm`/`640px`/`40rem` and below
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * ```
 */
function useIsMobile() {
  return useMediaQueryBreakpoint("sm", "max");
}

export { useIsMobile, useMediaQuery, useMediaQueryBreakpoint };
