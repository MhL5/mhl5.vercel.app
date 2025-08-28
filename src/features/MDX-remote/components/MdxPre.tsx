import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

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
