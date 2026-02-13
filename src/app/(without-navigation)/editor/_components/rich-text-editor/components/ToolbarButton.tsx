import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

type ToolbarButtonProps = ComponentProps<typeof Button> & {
  isActive: boolean;
  tooltipContent: null | ReactNode;
};

export function ToolbarButton({
  isActive,
  variant,
  className,
  tooltipContent,
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
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>
        <ToolbarButtonInternal
          isActive={isActive}
          variant={variant}
          className={className}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
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
