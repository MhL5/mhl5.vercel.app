"use client";

import { cn } from "@/lib/utils";
import { type ComponentProps, type ReactNode, createContext, use } from "react";

type SwapContextValue = {
  shouldSwap: boolean;
};

const SwapContext = createContext<SwapContextValue | null>(null);

function useSwap() {
  const context = use(SwapContext);
  if (!context) throw new Error("SwapContext must be used within a Swap");
  return context;
}

type LoadingSwapProps = {
  shouldSwap: SwapContextValue["shouldSwap"];
  children: ReactNode;
};

/**
 * Swaps the content without any layout shifts when the loading state changes.
 */
function Swap({ shouldSwap, children }: LoadingSwapProps) {
  return (
    <SwapContext value={{ shouldSwap }}>
      <div className="grid grid-cols-1 items-center justify-items-center">
        {children}
      </div>
    </SwapContext>
  );
}

function SwapInactiveContent({ className, ...props }: ComponentProps<"div">) {
  const { shouldSwap } = useSwap();
  return (
    <div
      data-inactive={shouldSwap}
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-2 w-full data-[inactive=false]:visible data-[inactive=true]:invisible",
        className,
      )}
      {...props}
    />
  );
}

function SwapActiveContent({ className, ...props }: ComponentProps<"div">) {
  const { shouldSwap } = useSwap();
  return (
    <div
      data-active={shouldSwap}
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-2 data-[active=false]:invisible data-[active=true]:visible",
        className,
      )}
      {...props}
    />
  );
}

export { Swap, SwapInactiveContent, SwapActiveContent };
