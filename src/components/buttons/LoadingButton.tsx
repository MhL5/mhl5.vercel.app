import {
  LoadingSwap,
  LoadingSwapContent,
  LoadingSwapLoading,
} from "@/components/LoadingSwap";
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
      <LoadingSwap isLoading={isDisabled}>
        <LoadingSwapContent>{children}</LoadingSwapContent>
        <LoadingSwapLoading>
          <Spinner />
        </LoadingSwapLoading>
      </LoadingSwap>
    </Button>
  );
}
