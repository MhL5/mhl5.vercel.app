import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { ComponentProps, ReactNode } from "react";

type TooltipButtonProps = ComponentProps<typeof Button> & {
  tooltipContent: ReactNode;
  tooltipSide?: ComponentProps<typeof TooltipContent>["side"];
};

export default function TooltipButton({
  tooltipContent,
  tooltipSide,
  ...props
}: TooltipButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button {...props} />
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>{tooltipContent}</TooltipContent>
    </Tooltip>
  );
}
