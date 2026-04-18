import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type EditorButtonProps = ComponentProps<typeof Button> & {
  isActive: boolean | null;
  tooltipContent: null | ReactNode;
  tooltipContentSide?: ComponentProps<typeof TooltipContent>["side"];
};

export function EditorButton({
  isActive,
  variant,
  className,
  tooltipContent,
  tooltipContentSide = "bottom",
  ...props
}: EditorButtonProps) {
  if (!tooltipContent)
    return (
      <EditorButtonInternal
        isActive={isActive}
        variant={variant}
        className={className}
        {...props}
      />
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <EditorButtonInternal
          isActive={isActive}
          variant={variant}
          className={className}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent side={tooltipContentSide}>
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
}

function EditorButtonInternal({
  isActive,
  variant,
  className,
  size = "icon-sm",
  ...props
}: Omit<EditorButtonProps, "tooltipContent">) {
  return (
    <Button
      variant={isActive ? "default" : variant || "ghost"}
      size={size}
      // type="button"
      data-active={isActive}
      className={cn(
        `transition-colors duration-300 data-[active=false]:text-muted-foreground`,
        size === "icon-sm" ? "size-7" : "",
        className,
      )}
      {...props}
    />
  );
}
