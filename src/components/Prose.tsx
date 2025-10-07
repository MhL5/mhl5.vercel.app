import type { ComponentProps, JSX } from "react";
import { cn } from "@/lib/utils";

type ProseProps<T extends keyof JSX.IntrinsicElements> = {
  as: T;
} & ComponentProps<T>;

export default function Prose<T extends keyof JSX.IntrinsicElements>({
  as,
  className,
  ...props
}: ProseProps<T>) {
  const Component = as as JSX.ElementType;

  return (
    <Component
      className={cn(
        "prose dark:prose-invert mx-auto w-full max-w-4xl overflow-x-hidden px-4 pt-4 pb-10 prose-headings:font-nunito md:px-6 md:pt-8",
        className,
      )}
      {...props}
    />
  );
}
