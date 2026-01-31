import { cn } from "@/lib/utils";
import type { ComponentProps, JSX } from "react";

type TypographyProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
} & ComponentProps<T>;

export function Typography<T extends keyof JSX.IntrinsicElements>({
  as,
  className,
  ...props
}: TypographyProps<T>) {
  const Component = (as as JSX.ElementType) || "div";

  return (
    <Component
      className={cn(
        "prose-headings:font-nunito mx-auto prose w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 md:px-6 md:pt-8 dark:prose-invert",
        className,
      )}
      {...props}
    />
  );
}
