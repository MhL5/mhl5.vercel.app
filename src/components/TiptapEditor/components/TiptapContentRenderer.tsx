import { tiptapTypography } from "@/styles/typography";
import { cn } from "cn";
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
