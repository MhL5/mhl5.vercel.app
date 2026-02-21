"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home, LogIn, RotateCcw } from "lucide-react";
import type { Route } from "next";

const colorClassNames = {
  warning:
    "from-amber-500 via-yellow-600 to-orange-500 dark:from-amber-600 dark:via-yellow-500 dark:to-orange-500",
  error:
    "from-red-600 via-rose-700 to-pink-500 dark:from-red-600 dark:via-rose-500 dark:to-pink-500",
  info: "from-sky-600 via-blue-700 to-indigo-500 dark:from-sky-600 dark:via-blue-500 dark:to-indigo-500",
} as const;

const status = {
  "not-found": {
    code: 404,
    statusClassName: colorClassNames.warning,
  },
  forbidden: {
    code: 403,
    statusClassName: colorClassNames.error,
  },
  unauthorized: {
    code: 401,
    statusClassName: colorClassNames.info,
  },
  error: {
    code: 500,
    statusClassName: colorClassNames.error,
  },
} as const;

const defaultMessages = {
  home: "Home",
  goBack: "Go back",
  needHelp: "Need help?",
  contactSupport: "Contact support",

  "not-found": {
    title: "Nothing to see here",
    description:
      "Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL.",
  },
  forbidden: {
    title: "Access Denied",
    description:
      "You don't have permission to access this resource. Contact an administrator if you believe this is an error.",
  },
  unauthorized: {
    title: "Authentication Required",
    description: "You need to sign in to access this page.",
    secondaryActionLabel: "Sign in",
  },
  error: {
    title: "Something went wrong!",
    description: "Please try again or contact support if the problem persists.",
    secondaryActionLabel: "try again",
  },
} as const;

type BaseMessages = {
  title: string;
  description: string;
  home: string;
  goBack: string;
  needHelp: string;
  contactSupport: string;
};

type FallbackPageProps = (
  | {
      variant: "not-found" | "forbidden";
      contactSupportMessage?: string;
      messages?: BaseMessages;
    }
  | {
      variant: "error";
      contactSupportMessage?: string;
      reset: () => void;
      messages?: BaseMessages & { tryAgain: string };
    }
  | {
      variant: "unauthorized";
      contactSupportMessage?: string;
      loginPagePathname: string;
      messages?: BaseMessages & { signIn: string };
    }
  | {
      variant: "loading";
      messages?: { "aria-label": string };
    }
) & { className?: string };

export function FallbackPage(props: FallbackPageProps) {
  if (props.variant === "loading")
    return (
      <section
        aria-label={props.messages?.["aria-label"] || "Loading..."}
        aria-busy={true}
        className={cn(
          "grid min-h-svh w-full place-items-center",
          props.className,
        )}
      >
        <div className="isolate grid grid-cols-1 grid-rows-1 place-items-center">
          <Logo className="z-10 col-start-1 row-start-1 size-19 animate-scaleUpAndDown rounded-full bg-primary p-1" />

          <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingMd rounded-full bg-primary/80" />
          <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingSm rounded-full bg-primary/80" />
        </div>
      </section>
    );

  const {
    className,
    messages = {
      description: defaultMessages[props.variant].description,
      title: defaultMessages[props.variant].title,
      home: defaultMessages.home,
      goBack: defaultMessages.goBack,
      needHelp: defaultMessages.needHelp,
      contactSupport: defaultMessages.contactSupport,
    },
    variant,
    contactSupportMessage,
  } = props;
  const { statusClassName, code } = status[variant];

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
              "bg-linear-to-br bg-clip-text font-mono text-[10rem] leading-none font-bold tracking-tighter text-transparent",
              statusClassName,
            )}
          >
            {code}
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {messages.title}
          </h1>

          <p
            className="mx-auto text-base leading-relaxed text-pretty text-muted-foreground"
            role="alert"
            aria-live="polite"
          >
            {messages.description}
          </p>
        </header>

        {/* Action buttons */}
        <nav
          className="grid grid-cols-2 items-center justify-center gap-3"
          aria-label="actions"
        >
          <Link href="/" variant="outline">
            <Home /> {messages.home}
          </Link>

          {props.variant === "error" ? (
            <Button onClick={props.reset}>
              <RotateCcw />{" "}
              {props.messages?.tryAgain ||
                defaultMessages.error.secondaryActionLabel}
            </Button>
          ) : props.variant === "unauthorized" ? (
            <Link href={props.loginPagePathname as Route}>
              <LogIn />{" "}
              {props.messages?.signIn ||
                defaultMessages.unauthorized.secondaryActionLabel}
            </Link>
          ) : (
            <Button onClick={() => window.history.back()}>
              <ArrowLeft /> {messages.goBack}
            </Button>
          )}
        </nav>

        <footer className="text-sm text-muted-foreground">
          {messages.needHelp}
          <Link
            variant="link"
            href={CONTACT_SUPPORT_LINK(contactSupportMessage) as Route}
            target="_blank"
          >
            {messages.contactSupport}
          </Link>
        </footer>
      </div>
    </section>
  );
}
