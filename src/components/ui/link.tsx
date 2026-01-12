import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
// eslint-disable-next-line no-restricted-imports
import NextLink from "next/link";
import type { ComponentProps } from "react";

type LinkProps = ComponentProps<typeof NextLink> &
  VariantProps<typeof buttonVariants>;

function Link({ className, variant, size, ...props }: LinkProps) {
  return (
    <NextLink
      data-slot="link"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Link, type LinkProps };
