import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";

const typographyVariants = cva("text-xl", {
  variants: {
    variant: {
      h1: "scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl",
      h2: "scroll-m-20 font-semibold text-3xl tracking-tight first:mt-0",
      h3: "scroll-m-20 font-semibold text-2xl tracking-tight",
      h4: "scroll-m-20 font-semibold text-xl tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
    },
    effect: {
      default: "",
      lead: "text-muted-foreground text-xl",
      large: "font-semibold text-lg",
      small: "font-medium text-sm leading-none",
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
