"use client";

import {
  type UseMediaQueryProps,
  useMediaQuery,
} from "@/app/(with-navigation)/snippets/hooks/useMediaQuery";
import type { ReactNode } from "react";

type MatchMediaProps = UseMediaQueryProps & {
  children: ReactNode;
  fallback?: ReactNode;
};

export default function MatchMedia({
  fallback,
  children,
  ...props
}: MatchMediaProps) {
  const matches = useMediaQuery(props);

  if (matches === undefined) {
    if (!fallback) return children;
    return fallback;
  }

  if (!matches) return null;
  return children;
}
