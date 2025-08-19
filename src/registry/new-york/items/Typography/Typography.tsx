import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("text-xl", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
    },
    effect: {
      default: "",
      lead: "text-muted-foreground text-xl",
      large: "text-lg font-semibold",
      small: "text-sm leading-none font-medium",
      muted: "text-muted-foreground text-sm",
      removePMargin: "[&:not(:first-child)]:mt-0",
    },
  },
  defaultVariants: {
    variant: "h1",
    effect: "default",
  },
});

export type TypographyProps = React.HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof typographyVariants>;

export default function Typography({
  className,
  variant,
  effect,
  ...props
}: TypographyProps) {
  const Component = variant || "p";

  return (
    <Component
      className={cn(typographyVariants({ variant, effect, className }))}
      {...props}
    />
  );
}
