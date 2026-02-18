import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type TiptapContentProps = {
  htmlContent: string;
} & ComponentProps<"div">;

export function TiptapContent({
  htmlContent,
  className,
  ...props
}: TiptapContentProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className={cn("typography", className)}
      {...props}
    />
  );
}
