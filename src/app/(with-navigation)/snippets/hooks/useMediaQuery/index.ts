import { useEffect, useState } from "react";

export type UseMediaQueryProps = {
  breakpoint: number | keyof typeof breakpoints;
  direction?: "max" | "min";
};

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
 * Hook to check if the current viewport matches a media query
 * @param breakpoint - Either a numeric value in rem or a predefined breakpoint key
 * @param direction - Whether to check for min-width or max-width (default: "min")
 * @returns boolean indicating if the media query matches
 * @example
 * ```tsx
 * const isMobile = useMediaQuery({ breakpoint: "md", direction: "max" });
 * const isCustom = useMediaQuery({ breakpoint: 50, direction: "min" });
 * ```
 */
export function useMediaQuery({
  breakpoint,
  direction = "min",
}: UseMediaQueryProps) {
  const [matches, setMatches] = useState<boolean | undefined>(undefined);

  const valueInRem =
    typeof breakpoint === "number" ? breakpoint : breakpoints[breakpoint];

  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(${direction}-width: ${valueInRem}rem)`,
    );

    const handleChange = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", handleChange);

    setMatches(mediaQueryList.matches);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [direction, valueInRem]);

  return matches;
}
