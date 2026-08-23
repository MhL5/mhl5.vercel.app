"use client";

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { type ErrorInfo, catchError } from "next/error";
import type { ComponentProps } from "react";
import { useState, useTransition } from "react";

function toError(thrownValue: unknown): Error {
  if (thrownValue instanceof Error) return thrownValue;

  let message = "";
  if (typeof thrownValue === "string") message = thrownValue;
  else
    try {
      message = JSON.stringify(thrownValue) ?? String(thrownValue);
    } catch {
      message = String(thrownValue);
    }

  return new Error(message || "Something went wrong");
}

type ErrorBoundaryFallbackProps = {
  variant?: "default" | "minimal";
  size?: "default" | "lg" | "xl";
} & Omit<ErrorInfo, "reset"> &
  Omit<ComponentProps<typeof Alert>, "variant">;

function ErrorBoundaryFallback({
  className,
  variant = "default",
  size = "default",
  error: caughtError,
  retry,
  ...props
}: ErrorBoundaryFallbackProps) {
  const error = toError(caughtError);
  const [isRetrying, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => retry());
  }

  const buttonSize: Record<
    NonNullable<ErrorBoundaryFallbackProps["size"]>,
    ComponentProps<typeof Button>["size"]
  > = {
    default: "xs",
    lg: "sm",
    xl: "default",
  };

  return (
    <Alert
      variant="error"
      data-slot="ErrorBoundaryFallback"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group @container flex w-full min-w-28 flex-col flex-wrap items-center justify-center gap-1.5 p-3! text-center data-[size=lg]:gap-2 data-[size=xl]:gap-3",
        className,
      )}
      {...props}
    >
      <AlertTitle className="group-data-[size=lg]:text-lg group-data-[size=xl]:text-xl group-data-[variant=minimal]:hidden @max-xs:break-all">
        {error.name}
      </AlertTitle>

      <AlertDescription className="mb-1.5 group-data-[size=lg]:text-base group-data-[size=xl]:text-lg group-data-[variant=minimal]:mb-0">
        {error.message}
      </AlertDescription>

      <AlertAction className="static grid grid-cols-2 items-center gap-2 group-data-[size=lg]:gap-3 group-data-[size=xl]:gap-4 group-data-[variant=minimal]:grid-cols-1 @max-[10rem]:grid-cols-1">
        {variant === "default" ? (
          <a
            data-slot="ErrorBoundaryFallbackSupportLink"
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              size: buttonSize[size],
              className:
                "border border-border! group-data-[variant=minimal]:hidden @max-xs:text-xs dark:border-border!",
            })}
            href={CONTACT_SUPPORT_LINK(
              `${error?.name ? `${error.name}: ` : ""} ${error?.message || "Something went wrong!"}`,
            )}
          >
            Support
          </a>
        ) : null}
        <Button
          data-slot="ErrorBoundaryFallbackRetryButton"
          onClick={handleRetry}
          type="button"
          size={buttonSize[size]}
          variant={variant === "default" ? "default" : "link"}
          className="@max-xs:text-xs"
          disabled={isRetrying}
        >
          {isRetrying ? <Spinner /> : "try again"}
        </Button>
      </AlertAction>
    </Alert>
  );
}

const ErrorBoundary = catchError((props, error) =>
  ErrorBoundaryFallback({ ...props, ...error }),
);

function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;
  return { setError } as const;
}

export {
  ErrorBoundary,
  ErrorBoundaryFallback,
  useErrorBoundary,
  type ErrorBoundaryFallbackProps,
};
