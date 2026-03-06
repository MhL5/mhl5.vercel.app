"use client";

import { cn } from "@/lib/utils";
import type { StringWithAutoComplete } from "@/registry/types/AutoComplete/AutoComplete";
import { type ComponentProps, createContext, use } from "react";

type SwapContextValue = {
  swapTo: StringWithAutoComplete<"inactive">;
};

const SwapContext = createContext<SwapContextValue | null>(null);

function useSwap() {
  const context = use(SwapContext);
  if (!context) throw new Error("SwapContext must be used within a Swap");
  return context;
}

type SwapProps = {
  swapTo: SwapContextValue["swapTo"];
} & ComponentProps<"div">;

/**
 * Swaps the content without layout shifts using grid and visibility
 */
function Swap({ swapTo, className, ...props }: SwapProps) {
  return (
    <SwapContext value={{ swapTo }}>
      <div className={cn("grid grid-cols-1", className)} {...props} />
    </SwapContext>
  );
}

function SwapItem({
  value,
  className,
  ...props
}: ComponentProps<"div"> & { value: string }) {
  const { swapTo } = useSwap();
  return (
    <div
      data-active={swapTo === value}
      className={cn(
        "col-start-1 col-end-2 row-start-1 row-end-2 w-full data-[active=false]:invisible data-[active=true]:visible",
        className,
      )}
      {...props}
    />
  );
}

export { Swap, SwapItem };
