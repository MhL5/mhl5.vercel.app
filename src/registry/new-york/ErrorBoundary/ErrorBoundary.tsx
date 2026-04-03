"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import {
  AlertTriangleIcon,
  HeadsetIcon,
  Loader2,
  RefreshCcw,
} from "lucide-react";
import type { ReactNode } from "react";
import { Component, useTransition } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ((props: ErrorBoundaryFallbackProps) => ReactNode) | ReactNode;
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

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // log errors here
    // this is an example of how to log errors in here
    if (!isDev()) return;

    // eslint-disable-next-line no-console
    console.groupCollapsed("ErrorBoundary caught an error");
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

  render() {
    const capturedError = this.state.hasError && this.state.error;

    if (!capturedError) return this.props.children;

    if (this.props.fallback === undefined)
      return (
        <ErrorBoundaryFallback
          error={capturedError}
          onRetry={this.handleRetry}
        />
      );

    if (this.props.fallback instanceof Function)
      return this.props.fallback({
        error: capturedError,
        onRetry: this.handleRetry,
      });

    return this.props.fallback;
  }
}

type ErrorBoundaryFallbackProps = {
  className?: string;
  error: Error;
  onRetry: () => void;
};

function ErrorBoundaryFallback({
  className,
  error,
  onRetry,
}: ErrorBoundaryFallbackProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Card
      role="alert"
      aria-busy={isPending}
      aria-live="polite"
      className={cn(
        "gap-3 border-none bg-error text-center text-error-foreground shadow-error-border transition-all duration-100 dark:shadow-none starting:scale-90 starting:opacity-0",
        className,
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-1.5 text-lg text-error-foreground">
          <AlertTriangleIcon className="inline-block size-5 stroke-[0.15rem]" />
          {error.name}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription
          title={error.message}
          className="line-clamp-3 text-sm text-balance text-error-foreground/95"
        >
          {error.message}
        </CardDescription>

        <CardAction className="mx-auto mt-5 grid w-full max-w-xs grid-cols-2 gap-3">
          <a
            data-slot="ErrorBoundaryFallbackSupportLink"
            target="_blank"
            className={buttonVariants({
              variant: "secondary",
              size: "sm",
              className: "border",
            })}
            href={CONTACT_SUPPORT_LINK(
              `${error?.name ? `${error.name}: ` : ""} ${error?.message || "Something went wrong!"}`,
            )}
          >
            <HeadsetIcon /> Contact support
          </a>

          <Button
            data-slot="ErrorBoundaryFallbackRetryButton"
            onClick={() => startTransition(() => onRetry())}
            type="button"
            size="sm"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : <RefreshCcw />}
            Try again
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
}

export { ErrorBoundary, ErrorBoundaryFallback };
