import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
// eslint-disable-next-line no-restricted-imports
import NextJsLink from "next/link";
import type { ComponentProps } from "react";

type NextJsLinkProps = ComponentProps<typeof NextJsLink>;
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type StyledLinkProps = NextJsLinkProps &
  ButtonVariantProps & {
    unStyled?: false;
  };

type UnstyledLinkProps = NextJsLinkProps & {
  unStyled: true;
};

type LinkProps = StyledLinkProps | UnstyledLinkProps;

function Link(props: LinkProps) {
  const { className, unStyled, ...rest } = props;

  return (
    <NextJsLink
      data-slot="link"
      className={
        unStyled
          ? className
          : cn(
              buttonVariants({
                variant: props.variant,
                size: props.size,
                className,
              }),
            )
      }
      {...rest}
    />
  );
}

export { Link, type LinkProps };
