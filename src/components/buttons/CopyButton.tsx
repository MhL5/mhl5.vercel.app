"use client";

import { CheckIcon, ClipboardIcon, XIcon } from "lucide-react";
import type { ComponentProps } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useCopyToClipboard from "@/registry/hooks/useCopyToClipboard/useCopyToClipboard";

type CopyButtonProps = {
  content: string;
  side?: ComponentProps<typeof TooltipContent>["side"];
} & ButtonProps;

export default function CopyButton({
  content,
  className,
  side = "left",
  ...props
}: CopyButtonProps) {
  const { handleCopy, copyState } = useCopyToClipboard(content);

  return (
    <Tooltip open={copyState !== "idle"}>
      <TooltipTrigger asChild>
        <Button
          onClick={handleCopy}
          variant="ghost"
          className={cn("size-8 text-muted-foreground", className)}
          {...props}
        >
          {copyState === "copied" ? (
            <CheckIcon className="text-success-foreground" />
          ) : copyState === "error" ? (
            <XIcon className="text-destructive" />
          ) : (
            <ClipboardIcon />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          "border-text-foreground/10 bg-success-background text-success-foreground [&_svg]:bg-success-background [&_svg]:fill-success-background",
          copyState === "error" &&
            "border-text-foreground/10 bg-error-background text-error-foreground [&_svg]:bg-error-background [&_svg]:fill-error-background",
        )}
        side={side}
      >
        {copyState === "copied" ? "Copied" : "Error"}
      </TooltipContent>
    </Tooltip>
  );
}
