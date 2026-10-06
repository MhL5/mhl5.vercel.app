"use client";

import { Button } from "@/components/ui/button";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { type ComponentProps, type ReactNode, useTransition } from "react";

function canGoBackInSite() {
  if (typeof window.navigation?.canGoBack === "boolean")
    return window.navigation.canGoBack;

  try {
    return (
      window.history.length > 1 &&
      new URL(document.referrer).origin === window.location.origin
    );
  } catch {
    return false;
  }
}

type BackButtonProps = {
  /** The route to navigate to when there is no internal page to go back to. */
  fallbackHref: Route;
  children: ReactNode | ((options: { isPending: boolean }) => ReactNode);
} & Omit<ComponentProps<typeof Button>, "children">;

/**
 *
 * A back button that only navigates back within the site.
 *
 * Uses router.back() when the previous page is internal; otherwise,
 * navigates to fallbackHref instead of redirecting users outside the site.
 */
function BackButton({
  onClick,
  children,
  fallbackHref = "/",
  ...props
}: BackButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      title="Back"
      type="button"
      disabled={isPending}
      onClick={(e) => {
        onClick?.(e);
        startTransition(() => {
          if (canGoBackInSite()) return router.back();
          router.push(fallbackHref);
        });
      }}
      {...props}
    >
      {children instanceof Function ? children({ isPending }) : children}
    </Button>
  );
}

export { BackButton };
