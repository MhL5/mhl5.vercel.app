"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { isDev } from "@/registry/utils/checks/checks";
import { ArrowLeft, Circle, Home, RotateCcw } from "lucide-react";
import Link from "next/link";

const fallbackPagesData = {
  "not-found": {
    title: "Nothing to see here",
    description:
      "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you think this is an error contact support.",
  },
  error: {
    title: "Something bad just happened...",
    description:
      "We encountered an unexpected error. Please try again or contact support if the problem persists.",
  },
  buttonsClassName: "w-full basis-[calc(50%-0.375rem)] capitalize",
  contactSupportLink: (text: string) =>
    `${process.env.NEXT_PUBLIC_CONTACT_US_SUPPORT_LINK}?text=${encodeURIComponent(text)}`,
};

type NotFoundPageProps = {
  variant: "not-found";
};

type ErrorPageProps = {
  variant: "error";
  error: Error & { digest?: string };
  reset: () => void;
};

type LoadingPageProps = {
  variant: "loading";
};

type FallbackPagesProps = NotFoundPageProps | ErrorPageProps | LoadingPageProps;

function FallbackPages(props: FallbackPagesProps) {
  if (props.variant === "loading")
    return (
      <section
        aria-label="Loading..."
        className="grid min-h-svh w-full place-items-center"
      >
        <div className="isolate grid grid-cols-1 grid-rows-1 place-items-center">
          <Circle className="z-10 col-start-1 row-start-1 size-22 animate-circleSvgGrow bg-transparent stroke-1 text-primary [--circumference:572px]" />

          <Logo className="z-10 col-start-1 row-start-1 size-19 animate-loadingFadeIn rounded-full bg-primary p-1 opacity-0 starting:opacity-0" />

          <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingMd rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
          <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingSm rounded-full bg-primary/80 delay-1000 starting:opacity-0" />
        </div>
      </section>
    );

  return (
    <section className="grid min-h-svh place-items-center p-4">
      <div className="max-w-md space-y-7 text-center">
        <header>
          {props.variant === "not-found" ? (
            <div className="mx-auto mb-5 font-mono text-8xl text-warning-foreground">
              404
            </div>
          ) : (
            <div className="mx-auto mb-5 font-mono text-8xl text-destructive">
              500
            </div>
          )}

          <h1 className="mb-4 text-4xl font-semibold text-foreground">
            {fallbackPagesData[props.variant].title}
          </h1>
          <p
            className="line-clamp-6 text-base leading-relaxed text-pretty text-muted-foreground"
            role="alert"
            aria-live="polite"
          >
            {!isDev() && props.variant === "error"
              ? props.error.message
              : fallbackPagesData[props.variant].description}{" "}
          </p>
        </header>

        <nav
          className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
          aria-label="Error page actions"
        >
          <Button
            asChild
            variant="outline"
            className={fallbackPagesData.buttonsClassName}
          >
            <Link href="/">
              <Home /> home
            </Link>
          </Button>

          {props.variant === "error" ? (
            <Button
              onClick={props.reset}
              className={fallbackPagesData.buttonsClassName}
            >
              <RotateCcw />
              Try again
            </Button>
          ) : (
            <Button
              onClick={() => window.history.back()}
              className={fallbackPagesData.buttonsClassName}
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
              href={fallbackPagesData.contactSupportLink(
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
    </section>
  );
}

const NotFoundPage = () => <FallbackPages variant="not-found" />;

const ErrorPage = (props: Omit<ErrorPageProps, "variant">) => (
  <FallbackPages variant="error" {...props} />
);

const LoadingPage = () => <FallbackPages variant="loading" />;

export { ErrorPage, LoadingPage, NotFoundPage };
