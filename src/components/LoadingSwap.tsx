"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, type ReactNode, createContext, use } from "react";

type LoadingSwapContextValue = {
  isLoading: boolean;
};

const LoadingSwapContext = createContext<LoadingSwapContextValue | null>(null);

function useLoadingSwap() {
  const context = use(LoadingSwapContext);
  if (!context)
    throw new Error(
      "LoadingSwapContext must be used within a LoadingSwapContextProvider",
    );
  return context;
}

type LoadingSwapProps = {
  isLoading: LoadingSwapContextValue["isLoading"];
  children: ReactNode;
};

/**
 * Swaps the content without any layout shifts when the loading state changes.
 */
function LoadingSwap({ isLoading, children }: LoadingSwapProps) {
  return (
    <LoadingSwapContext value={{ isLoading }}>
      <div className="grid grid-cols-1 items-center justify-items-center">
        {children}
      </div>
    </LoadingSwapContext>
  );
}

function LoadingSwapContent({ className, ...props }: ComponentProps<"div">) {
  const { isLoading } = useLoadingSwap();
  return (
    <div
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-2 w-full",
        isLoading ? "invisible" : "visible",
        className,
      )}
      {...props}
    />
  );
}

function LoadingSwapLoading({ className, ...props }: ComponentProps<"div">) {
  const { isLoading } = useLoadingSwap();
  return (
    <div
      role="status"
      aria-label="loading..."
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-2",
        isLoading ? "visible" : "invisible",
        className,
      )}
      {...props}
    />
  );
}

export { LoadingSwap, LoadingSwapContent, LoadingSwapLoading };
