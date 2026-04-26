"use client";

import { LoadingButton } from "@/components/buttons/LoadingButton";
import { buttonVariants } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import { HeadsetIcon, RefreshCcw } from "lucide-react";
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
  variant?: "default" | "minimal" | "inline";
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
    <div
      role="alert"
      aria-busy={isPending}
      aria-live="polite"
      data-variant={variant}
      className={cn(
        "group @container-normal mx-auto flex w-fit flex-wrap items-center justify-center overflow-hidden rounded-md bg-error text-center text-error-foreground",
        "data-[variant=minimal]:p-3",
        "data-[variant=default]:flex-col data-[variant=default]:gap-3 data-[variant=default]:p-4",
        "data-[variant=inline]:flex-nowrap data-[variant=inline]:p-2",
        className,
      )}
      {...props}
    >
      <CardTitle className="group-data-[variant=inline]:hidden group-data-[variant=minimal]:hidden @max-xs:break-all">
        {error.name}
      </CardTitle>

      <CardDescription
        title={error.message}
        className="mb-1 line-clamp-6 text-error-foreground group-data-[variant=inline]:mb-0 group-data-[variant=inline]:line-clamp-none group-data-[variant=inline]:truncate"
      >
        {error.message}
      </CardDescription>

      <footer className="@container-normal mx-auto flex w-full max-w-xs flex-wrap items-center justify-center gap-3 group-data-[variant=inline]:w-fit">
        <a
          data-slot="ErrorBoundaryFallbackSupportLink"
          target="_blank"
          className={buttonVariants({
            variant: "secondary",
            size: "xs",
            className:
              "basis-[calc(50%-0.375rem)] border group-data-[variant=inline]:hidden group-data-[variant=minimal]:hidden @max-xs:text-xs @max-[11rem]:basis-full",
          })}
          href={CONTACT_SUPPORT_LINK(
            `${error?.name ? `${error.name}: ` : ""} ${error?.message || "Something went wrong!"}`,
          )}
        >
          <HeadsetIcon className="size-3.25 @max-xs:hidden" />
          Support
        </a>

        <LoadingButton
          data-slot="ErrorBoundaryFallbackRetryButton"
          onClick={handleRetry}
          type="button"
          size="xs"
          variant={variant === "default" ? "default" : "link"}
          className="h-fit basis-[calc(50%-0.375rem)] group-data-[variant=inline]:basis-auto group-data-[variant=inline]:p-0 @max-xs:text-xs @max-[11rem]:basis-full"
          disabled={isPending}
        >
          <RefreshCcw className="size-3.25 group-data-[variant=inline]:hidden group-data-[variant=minimal]:hidden @max-xs:hidden" />
          try again
        </LoadingButton>
      </footer>
    </div>
  );
}

export { ErrorBoundary, ErrorBoundaryFallback, useErrorBoundary };
