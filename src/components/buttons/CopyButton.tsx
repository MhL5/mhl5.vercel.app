"use client";

import { CheckIcon, ClipboardIcon, XIcon } from "lucide-react";
import { type ComponentProps, createContext, useContext } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useCopyToClipboard from "@/registry/hooks/useCopyToClipboard/useCopyToClipboard";

type CopyButtonContextType = {
  contentToCopy: string;
  side: ComponentProps<typeof TooltipContent>["side"];
} & ButtonProps &
  ReturnType<typeof useCopyToClipboard>;

const CopyButtonContext = createContext<CopyButtonContextType | null>(null);

type CopyButtonProps = {
  contentToCopy: CopyButtonContextType["contentToCopy"];
  side: CopyButtonContextType["side"];
} & ButtonProps;

function CopyButton({
  contentToCopy,
  side,
  children,
  ...props
}: CopyButtonProps) {
  const copyToClipboard = useCopyToClipboard(contentToCopy);
  const { handleCopy } = copyToClipboard;

  return (
    <CopyButtonContext value={{ contentToCopy, side, ...copyToClipboard }}>
      <Button onClick={handleCopy} variant="ghost" {...props}>
        {children === undefined ? <CopyButtonIcon /> : children}
      </Button>
    </CopyButtonContext>
  );
}

function useCopyButtonContext() {
  const context = useContext(CopyButtonContext);
  if (!context)
    throw new Error("useCopyButton must be used within a CopyButtonProvider");
  return context;
}

function CopyButtonIcon({ className, ...props }: ComponentProps<"svg">) {
  const { copyState, side } = useCopyButtonContext();

  return (
    <Tooltip open={copyState !== "idle"}>
      <TooltipTrigger asChild>
        {copyState === "copied" ? (
          <CheckIcon
            className={cn("text-success-foreground", className)}
            {...props}
          />
        ) : copyState === "error" ? (
          <XIcon className={cn("text-destructive", className)} {...props} />
        ) : (
          <ClipboardIcon className={className} {...props} />
        )}
      </TooltipTrigger>
      <TooltipContent
        className={cn(
          "border-text-foreground/10 bg-success text-success-foreground [&_svg]:bg-success [&_svg]:fill-success",
          copyState === "error" &&
            "border-text-foreground/10 bg-error text-error-foreground [&_svg]:bg-error [&_svg]:fill-error",
        )}
        side={side}
      >
        {copyState === "copied" ? "Copied" : "Error"}
      </TooltipContent>
    </Tooltip>
  );
}

export { CopyButton, CopyButtonIcon };
