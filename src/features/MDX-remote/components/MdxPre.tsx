import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function MdxPre({
  children,
  className,
  ...props
}: ComponentProps<"pre">) {
  return (
    <pre className={cn("not-prose", className)} {...props}>
      {children}
    </pre>
  );
}
