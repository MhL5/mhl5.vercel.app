"use client";

import Spinner from "@/components/ui/spinner";
import { Loader2 } from "lucide-react";
import { useLinkStatus } from "next/link";
import type { ComponentProps } from "react";

type LinkIndicatorProps = ComponentProps<typeof Loader2>;

/**
 * LinkIndicator displays a loading spinner when a link navigation is in progress.
 * To avoid unnecessary flicker on quick navigation, it uses a fade-in animation for smoother UX.
 */
export function LinkIndicator({ children, ...props }: LinkIndicatorProps) {
  const { pending } = useLinkStatus();

  if (!pending && typeof children !== "undefined") return children;
  if (!pending) return children;
  return <Spinner {...props} />;
}
