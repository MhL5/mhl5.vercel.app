"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import { Loader2 } from "lucide-react";
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
    if (this.state.hasError && this.state.error) {
      if ("fallback" in this.props && this.props.fallback)
        return this.props.fallback instanceof Function
          ? this.props.fallback({
              error: this.state.error,
              onRetry: this.handleRetry,
            })
          : this.props.fallback;

      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

type ErrorBoundaryFallbackProps = {
  className?: string;
  label?: string;
  error: Error;
  onRetry: () => void;
};

function ErrorBoundaryFallback({
  className,
  label,
  error,
  onRetry,
}: ErrorBoundaryFallbackProps) {
  const [isPending, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => {
      onRetry();
    });
  }

  return (
    <div
      role="alert"
      aria-busy={isPending}
      className={cn(
        "my-8 flex w-full flex-col items-center justify-center gap-3 text-center font-medium",
        className,
      )}
      data-slot="ErrorBoundaryFallback"
    >
      <p
        data-slot="ErrorBoundaryFallbackMessage"
        className="!line-clamp-2 text-destructive"
      >
        {label ? `${label}: ` : error?.name ? `${error.name}: ` : ""}
        {error?.message || "Something went wrong!"}
      </p>
      <Button
        data-slot="ErrorBoundaryFallbackRetryButton"
        onClick={handleRetry}
        variant="ghost"
        type="button"
        className="underline underline-offset-8"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Retry"}
      </Button>
    </div>
  );
}

export { ErrorBoundary, ErrorBoundaryFallback };
