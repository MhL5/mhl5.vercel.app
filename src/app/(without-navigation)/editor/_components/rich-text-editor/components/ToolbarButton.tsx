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
      <Button
        variant={isActive ? "default" : variant || "outline"}
        size="icon-sm"
        className={cn("transition-colors duration-300", className)}
        {...props}
      />
    );

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={isActive ? "default" : variant || "outline"}
          size="icon-sm"
          className={cn("transition-colors duration-300", className)}
          {...props}
        />
      </TooltipTrigger>
      <TooltipContent side="bottom">{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
