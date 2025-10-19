import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type GradientTextProps<T extends ElementType> = {
  as: T;
} & ComponentProps<T>;

export default function GradientText<T extends ElementType>({
  as: As,
  className,
  ...props
}: GradientTextProps<T>) {
  return (
    <As
      className={cn(
        "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
        className,
      )}
      {...props}
    />
  );
}
