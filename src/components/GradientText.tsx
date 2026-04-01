import { cn } from "@/lib/utils";
import type { ComponentProps, ElementType } from "react";

type GradientTextProps<E extends ElementType> = { as?: E } & Omit<
  ComponentProps<E>,
  "as"
>;

export default function GradientText<E extends ElementType = "div">({
  as,
  className,
  ...rest
}: GradientTextProps<E>) {
  const Component = as || "div";

  return (
    <Component
      className={cn(
        "bg-linear-to-r from-[#0F172A] from-0% to-[#334F90] to-80% bg-clip-text text-transparent dark:from-primary",
        className,
      )}
      {...rest}
    />
  );
}
