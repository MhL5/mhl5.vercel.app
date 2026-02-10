"use client";

import { Button } from "@/components/ui/button";
import { CONTACT_SUPPORT_LINK } from "@/constants";
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

  function handleRetry() {
    startTransition(() => onRetry());
  }

  const errorParagraph = `${error?.name ? `${error.name}: ` : ""} ${error?.message || "Something went wrong!"}`;

  return (
    <div
      role="alert"
      aria-busy={isPending}
      aria-live="polite"
      className={cn(
        "my-8 flex w-full flex-col items-center justify-center gap-3 text-center font-medium",
        className,
      )}
      data-slot="ErrorBoundaryFallback"
    >
      <p
        data-slot="ErrorBoundaryFallbackMessage"
        className="line-clamp-2! text-destructive"
        title={errorParagraph}
      >
        {errorParagraph}
      </p>
      <div
        data-slot="ErrorBoundaryFallbackActions"
        className="flex items-center gap-2"
      >
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
        <Button asChild variant="ghost">
          <a
            data-slot="ErrorBoundaryFallbackSupportLink"
            target="_blank"
            href={CONTACT_SUPPORT_LINK(`${errorParagraph}\n`)}
            className="underline underline-offset-8"
          >
            Contact support
          </a>
        </Button>
      </div>
    </div>
  );
}

export { ErrorBoundary, ErrorBoundaryFallback };
