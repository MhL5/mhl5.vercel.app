import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

import "./spinner.css";

export default function Spinner({
  className,
  ...props
}: ComponentProps<typeof Loader2>) {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("spinner", className)}
      {...props}
    />
  );
}
