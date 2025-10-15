"use client";

import { type ComponentProps, type ReactNode, useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";

type ActionButtonProps = ComponentProps<typeof Button> & {
  action: () => void;
  requireAreYouSure?: boolean;
  areYouSureDescription?: ReactNode;
};

export function ActionButton({
  action,
  requireAreYouSure = false,
  areYouSureDescription,
  ...props
}: ActionButtonProps) {
  const [isLoading, startTransition] = useTransition();

  function performAction() {
    startTransition(() => {
      action();
    });
  }

  if (requireAreYouSure) {
    return (
      <AlertDialog open={isLoading ? true : undefined}>
        <AlertDialogTrigger asChild>
          <Button {...props} />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {areYouSureDescription ??
                "The information will be deleted and cannot be recovered."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={isLoading} onClick={performAction}>
              <LoadingSwap isLoading={isLoading}>Yes</LoadingSwap>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Button
      {...props}
      disabled={props.disabled ?? isLoading}
      onClick={(e) => {
        performAction();
        props.onClick?.(e);
      }}
    >
      <LoadingSwap
        isLoading={isLoading}
        className="inline-flex items-center gap-2"
      >
        {props.children}
      </LoadingSwap>
    </Button>
  );
}
