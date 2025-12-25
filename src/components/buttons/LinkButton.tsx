import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";
import Link from "next/link";
import type { ComponentProps } from "react";

type LinkButtonProps = VariantProps<typeof buttonVariants> &
  ComponentProps<typeof Link>;

export default function LinkButton({
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Button variant={variant} size={size} asChild>
      <Link {...props} />
    </Button>
  );
}
