"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { isDev } from "@/registry/utils/checks/checks";
import {
  AlertTriangle,
  ArrowLeft,
  Circle,
  FileQuestion,
  Home,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

const ErrorNotfoundPageData = {
  "not-found": {
    title: "Page not found",
    description: "The page you're looking for doesn't exist or has been moved.",
  },
  error: {
    title: "Something went wrong!",
    description:
      "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  },
  buttonsClassName: "w-full basis-[calc(50%-0.375rem)] capitalize",
  errorTitleId: "error-title",
  contactSupportLink: (text: string) =>
    `https://t.me/mhl_5?text=${encodeURIComponent(text)}`,
};

type NotFoundPageProps = {
  variant: "not-found";
};

type ErrorPageProps = {
  variant: "error";
  error: Error & { digest?: string };
  reset: () => void;
};

type ErrorNotfoundPageProps = NotFoundPageProps | ErrorPageProps;

function ErrorNotfoundPage(props: ErrorNotfoundPageProps) {
  const Icon = props.variant === "not-found" ? FileQuestion : AlertTriangle;

  return (
    <main
      className="grid min-h-svh place-items-center bg-background p-4"
      role="main"
      aria-labelledby={ErrorNotfoundPageData.errorTitleId}
    >
      <div className="max-w-md space-y-6 text-center">
        <header>
          <Icon
            className={`mx-auto mb-4 size-16 ${props.variant === "not-found" ? "text-foreground" : "text-destructive"}`}
          />

          <h1
            id={ErrorNotfoundPageData.errorTitleId}
            className="mb-3 text-2xl font-semibold text-foreground"
          >
            {ErrorNotfoundPageData[props.variant].title}
          </h1>
          <p
            className="leading-relaxed text-pretty text-muted-foreground"
            role="alert"
            aria-live="polite"
          >
            {isDev() && props.variant === "error"
              ? props.error.message
              : ErrorNotfoundPageData[props.variant].description}{" "}
          </p>
        </header>

        <nav
          className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
          aria-label="Error page actions"
        >
          <Button
            asChild
            variant="outline"
            className={ErrorNotfoundPageData.buttonsClassName}
          >
            <Link href="/">
              <Home /> home
            </Link>
          </Button>

          {props.variant === "error" ? (
            <Button
              onClick={props.reset}
              className={ErrorNotfoundPageData.buttonsClassName}
            >
              <RotateCcw />
              Try again
            </Button>
          ) : (
            <Button
              onClick={() => window.history.back()}
              className={ErrorNotfoundPageData.buttonsClassName}
            >
              <ArrowLeft /> Go back
            </Button>
          )}
        </nav>

        <footer className="text-sm text-muted-foreground">
          Need help?{" "}
          <Button
            variant="link"
            asChild
            className="mx-0 h-auto w-fit px-0 text-sm"
          >
            <a
              href={ErrorNotfoundPageData.contactSupportLink(
                encodeURIComponent(
                  props.variant === "error"
                    ? `Error Code (#${props.error.digest}): ${props.error.message}`
                    : "",
                ),
              )}
              target="_blank"
            >
              Contact support
            </a>
          </Button>
        </footer>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return <ErrorNotfoundPage variant="not-found" />;
}

function ErrorPage(props: Omit<ErrorPageProps, "variant">) {
  return <ErrorNotfoundPage variant="error" {...props} />;
}

function LoadingPage() {
  return (
    <section className="grid min-h-dvh w-full place-items-center">
      <div
        role="status"
        aria-label="Loading..."
        aria-busy="true"
        className="isolate grid grid-cols-1 grid-rows-1 place-items-center"
      >
        <Circle className="z-10 col-start-1 row-start-1 size-22 animate-circleSvgGrow bg-transparent stroke-1 text-primary [--circumference:572px]" />

        <Logo className="z-10 col-start-1 row-start-1 size-19 animate-loadingFadeIn rounded-full bg-primary p-1 opacity-0 starting:opacity-0" />

        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingMd rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingSm rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
      </div>
    </section>
  );
}

export { ErrorPage, NotFoundPage, LoadingPage };
