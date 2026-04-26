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
import { isDev } from "@/registry/utils/checks/checks";
import { useRouter } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";
import { Component, useState, useTransition } from "react";

type ErrorBoundaryProps = (
  | {
      fallback?: ((props: ErrorBoundaryFallbackProps) => ReactNode) | ReactNode;
    }
  | {
      defaultFallbackProps?: Omit<
        ErrorBoundaryFallbackProps,
        "error" | "onRetry"
      >;
    }
) & {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };

    // Bind the method to preserve 'this' context
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // log errors here
    // this is an example of how to log errors in here
    if (!isDev()) return;

    // eslint-disable-next-line no-console
    console.groupCollapsed("⚠️ ErrorBoundary caught an error");
    // eslint-disable-next-line no-console
    console.log("\x1b[35m" + `Error:` + "\x1b[0m");
    // eslint-disable-next-line no-console
    console.dir(_error, { depth: Infinity });
    // eslint-disable-next-line no-console
    console.log("\x1b[35m" + `ErrorInfo:` + "\x1b[0m");
    // eslint-disable-next-line no-console
    console.dir(_errorInfo, { depth: Infinity });
    // eslint-disable-next-line no-console
    console.groupEnd();
  }

  handleRetry() {
    this.setState({ hasError: false, error: null });
  }

  override render() {
    const capturedError = this.state.hasError && this.state.error;

    if (!capturedError) return this.props.children;

    const defaultFallbackProps =
      "defaultFallbackProps" in this.props
        ? this.props?.defaultFallbackProps || {}
        : {};

    if ("fallback" in this.props && this.props.fallback !== undefined) {
      // fallback is a component
      if (this.props.fallback instanceof Function)
        return this.props.fallback({
          error: capturedError,
          onRetry: this.handleRetry,
          ...defaultFallbackProps,
        });

      // fallback is a reactNode
      return this.props.fallback;
    }

    // fallback is not provided, falling back to default fallback
    return (
      <ErrorBoundaryFallback
        error={capturedError}
        onRetry={this.handleRetry}
        {...defaultFallbackProps}
      />
    );
  }
}

function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  if (error) throw error;
  return { setError } as const;
}

type ErrorBoundaryFallbackProps = {
  className?: string;
  error: Error;
  onRetry: () => void;
  shouldRefreshRouter?: boolean;
  variant?: "default" | "minimal";
} & ComponentProps<"div">;

function ErrorBoundaryFallback({
  className,
  error,
  onRetry,
  variant = "default",
  shouldRefreshRouter = false,
  ...props
}: ErrorBoundaryFallbackProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleRetry() {
    startTransition(() => {
      onRetry();
      if (shouldRefreshRouter) router.refresh();
    });
  }

  return (
    <Alert
      variant="error"
      data-slot="ErrorBoundaryFallback"
      data-variant={variant}
      className={cn(
        "group @container flex w-full min-w-28 flex-col flex-wrap items-center justify-center gap-1 p-3! text-center",
        className,
      )}
      {...props}
    >
      <AlertTitle className="group-data-[variant=minimal]:hidden @max-xs:break-all">
        {error.name}
      </AlertTitle>

      <AlertDescription className="mb-2.25 group-data-[variant=minimal]:mb-0">
        {error.message}
      </AlertDescription>

      <AlertAction className="static grid grid-cols-2 items-center gap-2 group-data-[variant=minimal]:grid-cols-1 @max-[10rem]:grid-cols-1">
        {variant === "default" ? (
          <a
            data-slot="ErrorBoundaryFallbackSupportLink"
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              size: "xs",
              className:
                "border group-data-[variant=minimal]:hidden @max-xs:text-xs",
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
          size="xs"
          variant={variant === "default" ? "default" : "link"}
          className="@max-xs:text-xs"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : "try again"}
        </Button>
      </AlertAction>
    </Alert>
  );
}

export { ErrorBoundary, ErrorBoundaryFallback, useErrorBoundary };
