import { Swap, SwapItem } from "@/components/Swap";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import type { ComponentProps } from "react";

export function LoadingButton({
  disabled,
  children,
  ...props
}: ComponentProps<typeof Button>) {
  const isDisabled = !!disabled;

  return (
    <Button disabled={isDisabled} {...props}>
      <Swap swapTo={isDisabled ? "loading" : "default"}>
        <SwapItem value="default">{children}</SwapItem>
        <SwapItem
          value="loading"
          className="grid place-items-center"
          role="status"
          aria-label="loading..."
        >
          <Spinner />
        </SwapItem>
      </Swap>
    </Button>
  );
}
