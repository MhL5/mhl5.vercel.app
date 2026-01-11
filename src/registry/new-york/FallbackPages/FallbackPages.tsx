"use client";

import Logo from "@/components/Logo";
import { Button, LinkButton } from "@/components/ui/button";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import { ArrowLeft, Circle, Home, RotateCcw } from "lucide-react";
import type { Route } from "next";
import type { ComponentProps } from "react";

const fallbackPagesData = {
  "not-found": {
    status: 404,
    title: "Nothing to see here",
    description:
      "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.",
  },
  error: {
    status: 500,
    title: "Something bad just happened...",
    description:
      "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  },
};

type NotFoundPageProps = {
  variant: "not-found";
  className?: string;
};

type ErrorPageProps = {
  variant: "error";
  error: Error & { digest?: string };
  reset: () => void;
  className?: string;
};

type FallbackPagesProps = NotFoundPageProps | ErrorPageProps;

function FallbackPages({ className, ...props }: FallbackPagesProps) {
  const { description, status, title } = fallbackPagesData[props.variant];

  return (
    <section className={cn("grid min-h-svh place-items-center p-4", className)}>
      <div className="max-w-md space-y-7 text-center">
        <header>
          <div
            className={`${props.variant === "not-found" ? "text-warning-foreground" : "text-destructive"} mx-auto mb-5 font-mono text-9xl`}
          >
            {status}
          </div>

          <h1 className="mb-4 text-4xl font-semibold text-foreground">
            {title}
          </h1>
          <p
            className="line-clamp-6 text-base leading-relaxed text-pretty text-muted-foreground"
            role="alert"
            aria-live="polite"
          >
            {/* On development mode, show the error message */}
            {isDev() && props.variant === "error"
              ? props.error.message
              : description}{" "}
          </p>
        </header>

        <nav
          className="flex w-full flex-col items-center justify-center gap-3 capitalize sm:flex-row [&_a]:w-full [&_a]:basis-[calc(50%-0.375rem)] [&_button]:w-full [&_button]:basis-[calc(50%-0.375rem)]"
          aria-label="actions"
        >
          <LinkButton href="/" variant="outline">
            <Home /> home
          </LinkButton>

          {props.variant === "error" ? (
            <Button onClick={props.reset}>
              <RotateCcw />
              Try again
            </Button>
          ) : (
            <Button onClick={() => window.history.back()}>
              <ArrowLeft /> Go back
            </Button>
          )}
        </nav>

        <footer className="text-sm text-muted-foreground">
          Need help?{" "}
          <LinkButton
            variant="link"
            href={
              CONTACT_SUPPORT_LINK(
                props.variant === "error"
                  ? `Error Code (#${props.error.digest}):\n${props.error.message}`
                  : "",
              ) as Route
            }
            target="_blank"
          >
            Contact support
          </LinkButton>
        </footer>
      </div>
    </section>
  );
}

const NotFoundPage = (props: Omit<NotFoundPageProps, "variant">) => (
  <FallbackPages variant="not-found" {...props} />
);

const ErrorPage = (props: Omit<ErrorPageProps, "variant">) => (
  <FallbackPages variant="error" {...props} />
);

function LoadingPage({ className, ...props }: ComponentProps<"section">) {
  return (
    <section
      aria-label="Loading..."
      aria-busy={true}
      className={cn("grid min-h-svh w-full place-items-center", className)}
      {...props}
    >
      <div className="isolate grid grid-cols-1 grid-rows-1 place-items-center">
        <Circle className="z-10 col-start-1 row-start-1 size-22 animate-circleSvgGrow bg-transparent stroke-1 text-primary [--circumference:572px]" />

        <Logo className="z-10 col-start-1 row-start-1 size-19 animate-loadingFadeIn rounded-full bg-primary p-1 opacity-0 starting:opacity-0" />

        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingMd rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingSm rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
      </div>
    </section>
  );
}

export { ErrorPage, LoadingPage, NotFoundPage };
