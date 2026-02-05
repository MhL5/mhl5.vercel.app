"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import { ArrowLeft, Circle, Home, LogIn, RotateCcw } from "lucide-react";
import type { Route } from "next";
import { usePathname } from "next/navigation";
import type { ComponentProps, ReactNode } from "react";

type ColorScheme = "warning" | "error" | "info";

type FallbackPagesProps = {
  title: string;
  description: string;
  status: number;

  colorScheme?: ColorScheme;

  contactSupportLinkText?: string;
  secondaryAction?: ReactNode;

  className?: string;
};

const colorSchemeClasses: Record<ColorScheme, { text: string }> = {
  warning: {
    text: "from-amber-600 via-yellow-700 to-orange-500 dark:from-amber-600 dark:via-yellow-500 dark:to-orange-500",
  },
  error: {
    text: "from-red-600 via-rose-700 to-pink-500 dark:from-red-600 dark:via-rose-500 dark:to-pink-500",
  },
  info: {
    text: "from-sky-600 via-blue-700 to-indigo-500 dark:from-sky-600 dark:via-blue-500 dark:to-indigo-500",
  },
};

function FallbackPageSection({
  className,
  description,
  status,
  title,
  secondaryAction,
  contactSupportLinkText,
  colorScheme = "error",
}: FallbackPagesProps) {
  const colors = colorSchemeClasses[colorScheme];

  return (
    <section
      className={cn(
        "relative grid min-h-dvh place-items-center p-4",
        className,
      )}
    >
      <div className="relative z-10 max-w-md space-y-8 text-center">
        <header className="space-y-6">
          <div
            className={cn(
              "bg-gradient-to-br bg-clip-text font-mono text-[10rem] leading-none font-black tracking-tighter text-transparent",
              colors.text,
            )}
          >
            {status}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>

          <p
            className="mx-auto text-base leading-relaxed text-pretty text-muted-foreground"
            role="alert"
            aria-live="polite"
          >
            {description}
          </p>
        </header>

        {/* Action buttons */}
        <nav
          className="grid grid-cols-2 items-center justify-center gap-3"
          aria-label="actions"
        >
          <Link href="/" variant="outline">
            <Home /> Home
          </Link>

          {secondaryAction ? (
            secondaryAction
          ) : (
            <Button onClick={() => window.history.back()}>
              <ArrowLeft /> Go back
            </Button>
          )}
        </nav>

        <footer className="text-sm text-muted-foreground">
          Need help?{" "}
          <Link
            variant="link"
            href={CONTACT_SUPPORT_LINK(contactSupportLinkText) as Route}
            target="_blank"
          >
            Contact support
          </Link>
        </footer>
      </div>
    </section>
  );
}

function NotFoundPage(props: Partial<FallbackPagesProps>) {
  const pathname = usePathname();

  return (
    <FallbackPageSection
      status={404}
      colorScheme="warning"
      title="Nothing to see here"
      description="Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL."
      contactSupportLinkText={`URL: ${pathname}`}
      {...props}
    />
  );
}

type ErrorPageProps = Partial<FallbackPagesProps> & {
  error: Error & { digest?: string };
  reset: () => void;
};

function ErrorPage({ error, reset, ...props }: ErrorPageProps) {
  return (
    <FallbackPageSection
      status={500}
      colorScheme="error"
      title="Something went wrong"
      secondaryAction={
        <Button onClick={reset}>
          <RotateCcw />
          Try again
        </Button>
      }
      contactSupportLinkText={`Error Code (#${error.digest}):\n${error.message}`}
      description={
        !isDev()
          ? error.message
          : "We encountered an unexpected error. Please try again or contact support if the problem persists."
      }
      {...props}
    />
  );
}

function UnauthorizedPage({
  loginHref,
  ...props
}: Partial<FallbackPagesProps> & { loginHref: Route }) {
  return (
    <FallbackPageSection
      status={401}
      colorScheme="info"
      title="Authentication Required"
      description="You need to sign in to access this page."
      secondaryAction={
        <Link href={loginHref as Route}>
          <LogIn />
          Sign in
        </Link>
      }
      {...props}
    />
  );
}

function ForbiddenPage(props: Partial<FallbackPagesProps>) {
  return (
    <FallbackPageSection
      status={403}
      colorScheme="error"
      title="Access Denied"
      description="You don't have permission to access this resource. Contact an administrator if you believe this is an error."
      {...props}
    />
  );
}

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

export {
  ErrorPage,
  ForbiddenPage,
  LoadingPage,
  NotFoundPage,
  UnauthorizedPage,
};
