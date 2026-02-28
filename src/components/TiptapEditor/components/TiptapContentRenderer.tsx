import { cn } from "@/lib/utils";
import { tiptapTypography } from "@/styles/typography";
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
      className={cn(tiptapTypography, className)}
      {...props}
    />
  );
}
