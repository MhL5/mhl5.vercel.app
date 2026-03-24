"use client";

import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";
import type { ReactNode } from "react";

type ClientOnlyProps = {
  /**
   * Optional content to render until the component mounts on the client.
   *
   * Defaults to rendering nothing.
   */
  fallback?: ReactNode;

  /**
   * Content that should only render after the component has mounted
   * in the browser.
   */
  children: ReactNode;
};

/**
 * Renders its children only after the component has mounted on the client.
 *
 * This is useful for small UI fragments that depend on browser-only state,
 * such as values from `window`, `document`, `localStorage`, media queries,
 * or client-only hooks that should not render during SSR.
 *
 * In most cases, dynamically importing the target component is a better choice:
 *
 * - `dynamic(() => import("./SomeComponent"), { ssr: false })` keeps the
 *   client-only boundary at the component import level
 * - it avoids rendering the component at all on the server
 * - it is usually a clearer fit for larger client-only components or widgets
 * - it can reduce unnecessary client work for heavy UI
 *
 * This `ClientOnly` wrapper is better when:
 *
 * - the client-only part is very small and simple
 * - you only need to delay rendering a fragment, not split a whole component
 * - you want an inline fallback without creating a separate dynamic import
 * - the child component is already loaded and code-splitting is not needed
 *
 * Be careful when using this for large sections of UI, because it can cause
 * a flash from `fallback` to `children` after mount.
 *
 * @example
 * <ClientOnly fallback={<span>Loading theme…</span>}>
 *   <ThemeDependentContent />
 * </ClientOnly>
 *
 * @example
 * <ClientOnly>
 *   <span>{window.navigator.language}</span>
 * </ClientOnly>
 */
export default function ClientOnly({
  children,
  fallback = null,
}: ClientOnlyProps) {
  const isMounted = useIsMounted();

  if (!isMounted) return fallback;

  return children;
}
