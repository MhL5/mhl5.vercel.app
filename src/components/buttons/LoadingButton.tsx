import {
  Swap,
  SwapActiveContent,
  SwapInactiveContent,
} from "@/components/Swap";
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
      <Swap shouldSwap={isDisabled}>
        <SwapInactiveContent>{children}</SwapInactiveContent>
        <SwapActiveContent>
          <Spinner />
        </SwapActiveContent>
      </Swap>
    </Button>
  );
}
