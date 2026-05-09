"use client";

import { LinkIndicator } from "@/components/LinkIndicator";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";
import Spinner from "@/components/ui/spinner";
import { CONTACT_SUPPORT_LINK } from "@/constants";
import { cn } from "@/lib/utils";
import { isDev } from "@/registry/utils/checks/checks";
import { absoluteUrl } from "@/utils/absoluteUrl";
import { ArrowLeft, HomeIcon, LogIn, RotateCcw } from "lucide-react";
import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

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
      variant: "not-found";
      messages?: BaseMessages;
    }
  | {
      variant: "forbidden";
      messages?: BaseMessages;
    }
  | {
      variant: "error";
      reset: () => void;
      error: Error;
      messages?: BaseMessages & { tryAgain: string };
    }
  | {
      variant: "unauthorized";
      messages?: BaseMessages & { signIn: string };
      loginPageHref: string;
    }
) & {
  className?: string;
  contactSupportMessage?: string;
};

function FallbackPage(props: FallbackPageProps) {
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
  const router = useRouter();
  const [isWorking, startTransition] = useTransition();

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
            {props.variant === "error" && isDev()
              ? props.error.message
              : messages.description}
          </p>
        </header>

        {/* Action buttons */}
        <nav
          className="grid grid-cols-2 items-center justify-center gap-3"
          aria-label="actions"
        >
          <Link href="/" variant="outline">
            <LinkIndicator>
              <HomeIcon />
            </LinkIndicator>
            {messages.home}
          </Link>

          {props.variant === "error" ? (
            <Button
              onClick={() => startTransition(() => props.reset())}
              disabled={isWorking}
            >
              {isWorking ? <Spinner /> : <RotateCcw />}{" "}
              {props.messages?.tryAgain ||
                defaultMessages.error.secondaryActionLabel}
            </Button>
          ) : props.variant === "unauthorized" ? (
            <Link href={props.loginPageHref as Route}>
              <LinkIndicator>
                <LogIn />
              </LinkIndicator>
              {props.messages?.signIn ||
                defaultMessages.unauthorized.secondaryActionLabel}
            </Link>
          ) : (
            <Button
              onClick={() => startTransition(() => router.back())}
              disabled={isWorking}
            >
              {isWorking ? <Spinner /> : <ArrowLeft />} {messages.goBack}
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

type FallbackPageLoadingProps = {
  messages?: { "aria-label": string };
  className?: string;
};

function FallbackPageLoading({
  messages = { "aria-label": "Loading..." },
  className,
}: FallbackPageLoadingProps) {
  return (
    <section
      aria-label={messages["aria-label"]}
      aria-busy={true}
      className={cn("grid min-h-svh w-full place-items-center", className)}
    >
      <div className="isolate grid grid-cols-1 grid-rows-1 place-items-center">
        <Logo className="z-10 col-start-1 row-start-1 size-19 animate-scaleUpAndDown rounded-full bg-primary p-1" />

        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingMd rounded-full bg-primary/80" />
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 h-20 w-20 animate-pingSm rounded-full bg-primary/80" />
      </div>
    </section>
  );
}

function FallbackPageError({
  reset,
  ...props
}: Omit<Extract<FallbackPageProps, { variant: "error" }>, "variant">) {
  const router = useRouter();

  function handleRetry() {
    reset();
    // for server components
    router.refresh();
  }

  return (
    <FallbackPage
      variant="error"
      reset={handleRetry}
      contactSupportMessage={`
        ${props.error.name}:
        \`\`\`
        ${props.error.message}
        \`\`\`
        `}
      {...props}
    />
  );
}

function FallbackPageNotfound(
  props: Omit<Extract<FallbackPageProps, { variant: "not-found" }>, "variant">,
) {
  const pathname = usePathname();

  return (
    <FallbackPage
      variant="not-found"
      contactSupportMessage={`Not found page url:${absoluteUrl(pathname as `/${string}`)}`}
      {...props}
    />
  );
}

function FallbackPageUnAuthorized(
  props: Omit<
    Extract<FallbackPageProps, { variant: "unauthorized" }>,
    "variant" | "loginPageHref"
  >,
) {
  const pathname = usePathname();
  const query = useSearchParams().toString();

  const callbackUrl = encodeURIComponent(
    `${pathname}${query ? `?${query}` : ``}`,
  );

  return (
    <FallbackPage
      contactSupportMessage={`Un authorized page url:${absoluteUrl(pathname as `/${string}`)}`}
      loginPageHref={`/login?callback-url=${callbackUrl}`}
      variant="unauthorized"
      {...props}
    />
  );
}

function FallbackPageForbidden(
  props: Omit<Extract<FallbackPageProps, { variant: "forbidden" }>, "variant">,
) {
  const pathname = usePathname();

  return (
    <FallbackPage
      contactSupportMessage={`Forbidden page url:${absoluteUrl(pathname as `/${string}`)}`}
      variant="forbidden"
      {...props}
    />
  );
}

export {
  FallbackPageError,
  FallbackPageForbidden,
  FallbackPageLoading,
  FallbackPageNotfound,
  FallbackPageUnAuthorized,
};
