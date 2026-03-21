import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const calloutVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=CalloutDescription]:text-destructive/90 [&>svg]:text-current",
        success:
          "border-none bg-success text-success-foreground *:data-[slot=CalloutDescription]:text-success-foreground/90 [&>svg]:text-current",
        info: "border-none bg-info text-info-foreground *:data-[slot=CalloutDescription]:text-info-foreground/90 [&>svg]:text-current",
        warning:
          "border-none bg-warning text-warning-foreground *:data-[slot=CalloutDescription]:text-warning-foreground/90 [&>svg]:text-current",
        error:
          "border-none bg-error text-error-foreground *:data-[slot=CalloutDescription]:text-error-foreground/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Callout({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof calloutVariants>) {
  return (
    <div
      data-slot="Callout"
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    />
  );
}

function CalloutTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="CalloutTitle"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function CalloutDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="CalloutDescription"
      className={cn(
        "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
        className,
      )}
      {...props}
    />
  );
}

export { Callout, CalloutDescription, CalloutTitle };
