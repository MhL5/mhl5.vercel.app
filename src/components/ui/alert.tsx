import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
[data-sonner-toaster][data-sonner-theme='light'] {
  --normal-bg: #fff;
  --normal-border: var(--gray4);
  --normal-text: var(--gray12);

  --success-bg: hsl(143, 85%, 96%);
  --success-border: hsl(145, 92%, 87%);
  --success-text: hsl(140, 100%, 27%);

  --info-bg: hsl(208, 100%, 97%);
  --info-border: hsl(221, 91%, 93%);
  --info-text: hsl(210, 92%, 45%);

  --warning-bg: hsl(49, 100%, 97%);
  --warning-border: hsl(49, 91%, 84%);
  --warning-text: hsl(31, 92%, 45%);

  --error-bg: hsl(359, 100%, 97%);
  --error-border: hsl(359, 100%, 94%);
  --error-text: hsl(360, 100%, 45%);
}

[data-sonner-toaster][data-sonner-theme='dark'] {
  --normal-bg: #000;
  --normal-bg-hover: hsl(0, 0%, 12%);
  --normal-border: hsl(0, 0%, 20%);
  --normal-border-hover: hsl(0, 0%, 25%);
  --normal-text: var(--gray1);

  --success-bg: hsl(150, 100%, 6%);
  --success-border: hsl(147, 100%, 12%);
  --success-text: hsl(150, 86%, 65%);

  --info-bg: hsl(215, 100%, 6%);
  --info-border: hsl(223, 43%, 17%);
  --info-text: hsl(216, 87%, 65%);

  --warning-bg: hsl(64, 100%, 6%);
  --warning-border: hsl(60, 100%, 9%);
  --warning-text: hsl(46, 87%, 65%);

  --error-bg: hsl(358, 76%, 10%);
  --error-border: hsl(357, 89%, 16%);
  --error-text: hsl(358, 100%, 81%);
}
*/

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
        success:
          "border-[hsl(145,92%,87%)] bg-[hsl(143,85%,96%)] text-[hsl(140,100%,27%)] *:data-[slot=alert-description]:text-[hsl(140,100%,27%)]/90 dark:border-[hsl(147,100%,12%)] dark:bg-[hsl(150,100%,6%)] dark:text-[hsl(150,86%,65%)] dark:*:data-[slot=alert-description]:text-[hsl(150,86%,65%)]/90 [&>svg]:text-current",
        info: "border-[hsl(221,91%,93%)] bg-[hsl(208,100%,97%)] text-[hsl(210,92%,45%)] *:data-[slot=alert-description]:text-[hsl(210,92%,45%)]/90 dark:border-[hsl(223,43%,17%)] dark:bg-[hsl(215,100%,6%)] dark:text-[hsl(216,87%,65%)] dark:*:data-[slot=alert-description]:text-[hsl(216,87%,65%)]/90 [&>svg]:text-current",
        warning:
          "border-[hsl(49,91%,84%)] bg-[hsl(49,100%,97%)] text-[hsl(31,92%,45%)] *:data-[slot=alert-description]:text-[hsl(31,92%,45%)]/90 dark:border-[hsl(60,100%,9%)] dark:bg-[hsl(64,100%,6%)] dark:text-[hsl(46,87%,65%)] dark:*:data-[slot=alert-description]:text-[hsl(46,87%,65%)]/90 [&>svg]:text-current",
        error:
          "border-[hsl(359,100%,94%)] bg-[hsl(359,100%,97%)] text-[hsl(360,100%,45%)] *:data-[slot=alert-description]:text-[hsl(360,100%,45%)]/90 dark:border-[hsl(357,89%,16%)] dark:bg-[hsl(358,76%,10%)] dark:text-[hsl(358,100%,81%)] dark:*:data-[slot=alert-description]:text-[hsl(358,100%,81%)]/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
