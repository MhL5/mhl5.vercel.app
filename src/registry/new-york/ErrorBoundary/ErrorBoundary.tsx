"use client";

import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { Component, useTransition } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (props: ErrorBoundaryFallbackProps) => ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
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

  handleRetry() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (this.state.hasError && this.state.error) {
      if ("fallback" in this.props && this.props.fallback)
        return this.props.fallback({
          error: this.state.error,
          onRetry: this.handleRetry,
        });

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

export function ErrorBoundaryFallback({
  className,
  label,
  error,
  onRetry,
}: ErrorBoundaryFallbackProps) {
  const [isPending, startTransition] = useTransition();

  async function handleRetry() {
    startTransition(async () => {
      await new Promise((res) => setTimeout(res, 7000));
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
        className="text-destructive !line-clamp-2"
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
        <LoadingSwap isLoading={isPending}>Retry</LoadingSwap>
      </Button>
    </div>
  );
}
