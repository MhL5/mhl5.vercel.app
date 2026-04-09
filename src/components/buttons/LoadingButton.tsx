import { Swap, SwapItem } from "@/components/Swap";
import { Button, buttonVariants } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import type { ComponentProps } from "react";

function LoadingButton({
  children,
  size = "default",
  disabled,
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button disabled={disabled} size={size} {...props}>
      <Swap swapTo={disabled ? "loading" : "default"}>
        <SwapItem
          data-slot="SwapItem-default"
          className={buttonVariants({ variant: "none", size })}
          value="default"
        >
          {children}
        </SwapItem>
        <SwapItem
          data-slot="SwapItem-loading"
          value="loading"
          className="grid place-items-center"
        >
          <Spinner />
        </SwapItem>
      </Swap>
    </Button>
  );
}

export { LoadingButton };
