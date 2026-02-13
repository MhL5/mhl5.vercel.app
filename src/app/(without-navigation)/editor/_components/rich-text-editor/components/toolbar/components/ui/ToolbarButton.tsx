import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";
import type { ComponentProps, ReactNode } from "react";

type ToolbarButtonProps = ComponentProps<typeof Button> & {
  isActive: boolean;
  tooltipContent: null | ReactNode;
  tooltipContentSide?: TooltipContentProps["side"];
};

export function ToolbarButton({
  isActive,
  variant,
  className,
  tooltipContent,
  tooltipContentSide = "bottom",
  ...props
}: ToolbarButtonProps) {
  if (!tooltipContent)
    return (
      <ToolbarButtonInternal
        isActive={isActive}
        variant={variant}
        className={className}
        {...props}
      />
    );

  return (
    <Tooltip delayDuration={50}>
      <TooltipTrigger asChild>
        <ToolbarButtonInternal
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

function ToolbarButtonInternal({
  isActive,
  variant,
  className,
  size = "icon-sm",
  ...props
}: Omit<ToolbarButtonProps, "tooltipContent">) {
  return (
    <Button
      variant={isActive ? "default" : variant || "ghost"}
      size={size}
      data-active={isActive}
      className={cn(
        `${size === "icon-sm" ? "size-7" : ""} transition-colors duration-300 data-[active=false]:text-muted-foreground`,
        className,
      )}
      {...props}
    />
  );
}
