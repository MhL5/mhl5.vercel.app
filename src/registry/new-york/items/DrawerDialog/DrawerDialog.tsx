"use client";

import { useIsMobile } from "@/app/(with-navigation)/_snippets/hooks/useMediaQuery";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type DrawerDialogProps = {
  trigger: ReactNode;
  content: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  drawerContentClassName?: string;
  contentClassName?: string;
};

export function DrawerDialog({
  content,
  trigger,
  onOpenChange,
  open,
  contentClassName,
  drawerContentClassName,
}: DrawerDialogProps) {
  const isMobile = useIsMobile();

  // drawer
  if (isMobile)
    return (
      <Drawer
        // autoFocus={open} fixes block aria hidden attribute accessibility bug
        // repositionInputs={true} prevents safari keyboard layout shift on dismissal
        open={open}
        onOpenChange={onOpenChange}
      >
        <DrawerTrigger
          onClick={(e) => {
            e.currentTarget.blur(); // another fix for block aria hidden attribute accessibility bug
          }}
          asChild
        >
          {trigger}
        </DrawerTrigger>

        <DrawerContent className={drawerContentClassName}>
          <div
            className={cn("max-h-[90dvh] overflow-y-auto", contentClassName)}
          >
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          "max-h-[90dvh] w-[auto] overflow-x-hidden overflow-y-auto p-0 sm:max-w-[80dvw]",
          contentClassName,
        )}
      >
        {content}
      </DialogContent>
    </Dialog>
  );
}
