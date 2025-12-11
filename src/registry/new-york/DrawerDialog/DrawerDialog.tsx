"use client";

import { type ComponentProps, createContext, type ReactNode, use } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/registry/hooks/useMediaQuery/useMediaQuery";

type DrawerDialogContextType = {
  isSm: boolean | undefined;
};

const DrawerDialogContext = createContext<DrawerDialogContextType | null>(null);

type DrawerDialogProviderProps = {
  children: ReactNode;
  isOpen?: ComponentProps<typeof Dialog>["open"];
  setIsOpen?: ComponentProps<typeof Dialog>["onOpenChange"];
};

function DrawerDialogProvider({
  children,
  isOpen,
  setIsOpen,
}: DrawerDialogProviderProps) {
  const isSm = useMediaQuery("(min-width: 40rem)");

  return (
    <DrawerDialogContext value={{ isSm }}>
      {isSm ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {children}
        </Dialog>
      ) : (
        <Drawer
          // autoFocus={open} fixes block aria hidden attribute accessibility bug
          // repositionInputs={true} prevents safari keyboard layout shift on dismissal
          open={isOpen}
          onOpenChange={setIsOpen}
        >
          {children}
        </Drawer>
      )}
    </DrawerDialogContext>
  );
}

function useDrawerDialogContext() {
  const context = use(DrawerDialogContext);
  if (!context)
    throw new Error(
      "useDrawerDialogContext must be used within a DrawerDialogProvider",
    );
  return context;
}

type DrawerDialogProps = DrawerDialogProviderProps;

function DrawerDialog(props: DrawerDialogProps) {
  return <DrawerDialogProvider {...props} />;
}

type DrawerDialogContentProps = ComponentProps<typeof DialogContent>;

function DrawerDialogContent({
  className,
  ...props
}: DrawerDialogContentProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogContent
        data-slot="drawer-dialog-content"
        className={cn(
          "sm:[&:has([data-slot='drawer-dialog-scroll-area'])]:p-0",
          className,
        )}
        {...props}
      />
    );
  return (
    <DrawerContent
      data-slot="drawer-dialog-content"
      className={className}
      {...props}
    />
  );
}

type DrawerDialogTriggerProps = ComponentProps<typeof DialogTrigger>;

function DrawerDialogTrigger(props: DrawerDialogTriggerProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return <DialogTrigger data-slot="drawer-dialog-trigger" {...props} />;
  return <DrawerTrigger data-slot="drawer-dialog-trigger" {...props} />;
}

type DrawerDialogCloseProps = ComponentProps<typeof DialogClose>;

function DrawerDialogClose(props: DrawerDialogCloseProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm) return <DialogClose data-slot="drawer-dialog-close" {...props} />;
  return <DrawerClose data-slot="drawer-dialog-close" {...props} />;
}

type DrawerDialogDescriptionProps = ComponentProps<typeof DialogDescription>;

function DrawerDialogDescription(props: DrawerDialogDescriptionProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogDescription data-slot="drawer-dialog-description" {...props} />
    );
  return <DrawerDescription data-slot="drawer-dialog-description" {...props} />;
}

type DrawerDialogTitleProps = ComponentProps<typeof DialogTitle>;

function DrawerDialogTitle(props: DrawerDialogTitleProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm) return <DialogTitle data-slot="drawer-dialog-title" {...props} />;
  return <DrawerTitle data-slot="drawer-dialog-title" {...props} />;
}

type DrawerDialogFooterProps = ComponentProps<typeof DialogFooter>;

function DrawerDialogFooter(props: DrawerDialogFooterProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm) return <DialogFooter data-slot="drawer-dialog-footer" {...props} />;
  return <DrawerFooter data-slot="drawer-dialog-footer" {...props} />;
}

type DrawerDialogHeaderProps = ComponentProps<typeof DialogHeader>;

function DrawerDialogHeader(props: DrawerDialogHeaderProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm) return <DialogHeader data-slot="drawer-dialog-header" {...props} />;
  return <DrawerHeader data-slot="drawer-dialog-header" {...props} />;
}

type DrawerDialogOverlayProps = ComponentProps<typeof DialogOverlay>;

function DrawerDialogOverlay(props: DrawerDialogOverlayProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return <DialogOverlay data-slot="drawer-dialog-overlay" {...props} />;
  return <DrawerOverlay data-slot="drawer-dialog-overlay" {...props} />;
}

type DrawerDialogPortalProps = ComponentProps<typeof DialogPortal>;

function DrawerDialogPortal(props: DrawerDialogPortalProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm) return <DialogPortal data-slot="drawer-dialog-portal" {...props} />;
  return <DrawerPortal data-slot="drawer-dialog-portal" {...props} />;
}

type DrawerDialogScrollAreaProps = ComponentProps<"div">;

const drawerContentScrollAreaClassNames = "max-h-[90dvh] overflow-y-auto";
const dialogContentScrollAreaClassNames =
  "max-h-[90dvh] w-[auto] overflow-y-auto p-6 sm:max-w-[80svw]";

function DrawerDialogScrollArea({
  className,
  ...props
}: DrawerDialogScrollAreaProps) {
  const { isSm } = useDrawerDialogContext();

  return (
    <div
      data-slot="drawer-dialog-scroll-area"
      className={cn(
        isSm
          ? dialogContentScrollAreaClassNames
          : drawerContentScrollAreaClassNames,
        className,
      )}
      {...props}
    />
  );
}

export {
  DrawerDialog,
  DrawerDialogClose,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogFooter,
  DrawerDialogHeader,
  DrawerDialogOverlay,
  DrawerDialogPortal,
  DrawerDialogScrollArea,
  DrawerDialogTitle,
  DrawerDialogTrigger,
};
