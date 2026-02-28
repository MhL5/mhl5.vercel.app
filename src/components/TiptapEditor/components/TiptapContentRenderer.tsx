import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type TiptapContentRendererProps = {
  htmlContent: string;
} & ComponentProps<"div">;

export function TiptapContentRenderer({
  htmlContent,
  className,
  ...props
}: TiptapContentRendererProps) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
      className={cn("typography", className)}
      {...props}
    />
  );
}
