import { Button, ButtonProps } from "@/components/ui/button";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  buttonProps?: ButtonProps;
};

export default function LinkButton({
  buttonProps = {},
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Button asChild className={className} {...buttonProps}>
      <Link {...props} />
    </Button>
  );
}
