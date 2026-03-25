"use client";

import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home, LogIn, RotateCcw } from "lucide-react";
import type { Route } from "next";

const defaultMessages = {
  home: "Home",
  goBack: "Go back",
  needHelp: "Need help?",
  contactSupport: "Contact support",

  "not-found": {
    title: "Nothing to see here",
    description:
      "The page you are trying to access does not exist. You may have mistyped the address, or the page has been moved to another URL.",
  },
  forbidden: {
    title: "Access Denied",
    description:
      "You don't have permission to access this resource. Contact an administrator if you believe this is an error.",
  },
  unauthorized: {
    title: "Authentication Required",
    description:
      "You need to sign in to your account to access this page. Please sign in with your credentials to continue.",
    secondaryActionLabel: "Sign in",
  },
  error: {
    title: "Something went wrong!",
    description:
      "An unexpected error occurred while processing your request. Please try again or contact support if the problem persists.",
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

  let code = 500;
  switch (variant) {
    case "not-found":
      code = 404;
      break;
    case "forbidden":
      code = 403;
      break;
    case "unauthorized":
      code = 401;
      break;
    case "error":
      code = 500;
      break;
    default:
      variant satisfies never;
      code = 500;
  }

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
            data-code={code}
            className="font-mono text-[10rem] leading-none font-bold tracking-tighter text-primary"
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
