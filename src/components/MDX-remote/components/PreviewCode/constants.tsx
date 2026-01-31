import Spinner from "@/components/ui/spinner";
import dynamic from "next/dynamic";
import { lazy } from "react";

/**
 * used for dynamically importing components and their source codes
 */
export const componentPaths = {
  DebouncedInput: "@/registry/new-york/DebouncedInput/example.tsx",
  DrawerDialog: "@/registry/new-york/DrawerDialog/example.tsx",
  ErrorBoundary: "@/registry/new-york/ErrorBoundary/example.tsx",
  Img: "@/registry/new-york/Img/example.tsx",
  useLocalStorage: "@/registry/hooks/useLocalStorage/example.tsx",
  useSessionStorage: "@/registry/hooks/useSessionStorage/example.tsx",
  useCopyToClipboard: "@/registry/hooks/useCopyToClipboard/example.tsx",
  useIsMounted: "@/registry/hooks/useIsMounted/example.tsx",
  useUrlState: "@/registry/hooks/useUrlState/example.tsx",
  AutoGrid: "@/registry/new-york/AutoGrid/example.tsx",
  FallbackPagesError: "@/registry/new-york/FallbackPages/ErrorExample.tsx",
  FallbackPagesNotFound:
    "@/registry/new-york/FallbackPages/NotFoundExample.tsx",
  FallbackPagesLoading: "@/registry/new-york/FallbackPages/LoadingExample.tsx",
  TagsInput: "@/registry/new-york/TagsInput/example.tsx",
  useDebounce: "@/registry/hooks/useDebounce/example.tsx",
} as const;

const dynamicImportOptions = {
  ssr: false,
  loading: () => <Spinner className="size-8" />,
};

/**
 *
 * Notes:
 *  - dynamic option object must be literal, we cant pass `dynamicImportOptions` directly
 */
export const PreviewComponents = {
  DebouncedInput: dynamic(() => import(componentPaths.DebouncedInput), {
    ...dynamicImportOptions,
  }),
  DrawerDialog: lazy(() => import(componentPaths.DrawerDialog)),
  ErrorBoundary: dynamic(() => import(componentPaths.ErrorBoundary), {
    ...dynamicImportOptions,
  }),
  Img: dynamic(() => import(componentPaths.Img), {
    ...dynamicImportOptions,
  }),
  useLocalStorage: dynamic(() => import(componentPaths.useLocalStorage), {
    ...dynamicImportOptions,
  }),
  useSessionStorage: dynamic(() => import(componentPaths.useSessionStorage), {
    ...dynamicImportOptions,
  }),
  useCopyToClipboard: dynamic(() => import(componentPaths.useCopyToClipboard), {
    ...dynamicImportOptions,
  }),
  useIsMounted: dynamic(() => import(componentPaths.useIsMounted), {
    ...dynamicImportOptions,
  }),
  useUrlState: dynamic(() => import(componentPaths.useUrlState), {
    ...dynamicImportOptions,
  }),
  AutoGrid: dynamic(() => import(componentPaths.AutoGrid), {
    ...dynamicImportOptions,
  }),
  FallbackPagesError: dynamic(() => import(componentPaths.FallbackPagesError), {
    ...dynamicImportOptions,
  }),
  FallbackPagesNotFound: dynamic(
    () => import(componentPaths.FallbackPagesNotFound),
    {
      ...dynamicImportOptions,
    },
  ),
  FallbackPagesLoading: dynamic(
    () => import(componentPaths.FallbackPagesLoading),
    {
      ...dynamicImportOptions,
    },
  ),
  TagsInput: dynamic(() => import(componentPaths.TagsInput), {
    ...dynamicImportOptions,
  }),
  useDebounce: dynamic(() => import(componentPaths.useDebounce), {
    ...dynamicImportOptions,
  }),
};
