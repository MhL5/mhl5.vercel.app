"use client";

import { Loader2 } from "lucide-react";
// @ts-expect-error todo: this is valid but typescript throws an error,Module '"next/link"' has no exported member 'useLinkStatus'
import { useLinkStatus } from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type LinkIndicatorProps = ComponentProps<typeof Loader2>;

/**
 * LinkIndicator displays a loading spinner when a link navigation is in progress.
 * To avoid unnecessary flicker on quick navigations, it uses a fade-in animation for smoother UX.
 */
export default function LinkIndicator({
  className,
  ...props
}: LinkIndicatorProps) {
  const { pending } = useLinkStatus();

  if (!pending) return null;
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("spinner", className)}
      {...props}
    />
  );
}
