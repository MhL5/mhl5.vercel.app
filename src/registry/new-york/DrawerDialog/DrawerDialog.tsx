"use client";

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
import { useMediaQueryBreakpoint } from "@/registry/hooks/useMediaQuery/useMediaQuery";
import {
  type ComponentProps,
  type ComponentType,
  createContext,
  use,
} from "react";

type DualComponentProps<
  A extends ComponentType<any>,
  B extends ComponentType<any>,
  AKey extends string = "firstProps",
  BKey extends string = "secondProps",
> = Pick<
  ComponentProps<A>,
  keyof ComponentProps<A> & keyof ComponentProps<B>
> & {
  [K in AKey]?: Omit<
    ComponentProps<A>,
    (keyof ComponentProps<A> & keyof ComponentProps<B>) | "children"
  >;
} & {
  [K in BKey]?: Omit<
    ComponentProps<B>,
    (keyof ComponentProps<A> & keyof ComponentProps<B>) | "children"
  >;
};

type DrawerDialogContextType = {
  isSm: boolean | undefined;
};

const DrawerDialogContext = createContext<DrawerDialogContextType | null>(null);

type DrawerDialogProps = DualComponentProps<
  typeof Dialog,
  typeof Drawer,
  "dialogProps",
  "drawerProps"
>;

function DrawerDialog({
  children,
  drawerProps,
  dialogProps,
  ...sharedProps
}: DrawerDialogProps) {
  const isSm = useMediaQueryBreakpoint("sm");

  return (
    <DrawerDialogContext value={{ isSm }}>
      {isSm ? (
        <Dialog {...dialogProps} {...sharedProps}>
          {children}
        </Dialog>
      ) : (
        <Drawer
          repositionInputs={true}
          // TS loses Vaul's discriminated union after Omit/Pick, so an explicit cast is needed.
          {...(drawerProps as ComponentProps<typeof Drawer>)}
          {...sharedProps}
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
      "useDrawerDialogContext must be used within a <DrawerDialog />",
    );
  return context;
}

type DrawerDialogContentProps = DualComponentProps<
  typeof DialogContent,
  typeof DrawerContent,
  "dialogContentProps",
  "drawerContentProps"
>;

function DrawerDialogContent({
  className,
  dialogContentProps,
  drawerContentProps,
  ...props
}: DrawerDialogContentProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogContent
        data-slot="drawer-dialog-content"
        className={cn(
          "overflow-hidden sm:[&:has([data-slot='drawer-dialog-scroll-area'])]:p-0",
          className,
        )}
        {...dialogContentProps}
        {...props}
      />
    );
  return (
    <DrawerContent
      data-slot="drawer-dialog-content"
      className={cn("overflow-hidden", className)}
      {...drawerContentProps}
      {...props}
    />
  );
}

type DrawerDialogTriggerProps = DualComponentProps<
  typeof DialogTrigger,
  typeof DrawerTrigger,
  "dialogTriggerProps",
  "drawerTriggerProps"
>;

function DrawerDialogTrigger({
  drawerTriggerProps,
  dialogTriggerProps,
  ...props
}: DrawerDialogTriggerProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogTrigger
        data-slot="drawer-dialog-trigger"
        {...dialogTriggerProps}
        {...props}
      />
    );
  return (
    <DrawerTrigger
      data-slot="drawer-dialog-trigger"
      {...drawerTriggerProps}
      {...props}
    />
  );
}

type DrawerDialogCloseProps = DualComponentProps<
  typeof DialogClose,
  typeof DrawerClose,
  "dialogCloseProps",
  "drawerCloseProps"
>;

function DrawerDialogClose({
  drawerCloseProps,
  dialogCloseProps,
  ...props
}: DrawerDialogCloseProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogClose
        data-slot="drawer-dialog-close"
        {...dialogCloseProps}
        {...props}
      />
    );
  return (
    <DrawerClose
      data-slot="drawer-dialog-close"
      {...drawerCloseProps}
      {...props}
    />
  );
}

type DrawerDialogDescriptionProps = DualComponentProps<
  typeof DialogDescription,
  typeof DrawerDescription,
  "dialogDescriptionProps",
  "drawerDescriptionProps"
>;

function DrawerDialogDescription({
  dialogDescriptionProps,
  drawerDescriptionProps,
  ...props
}: DrawerDialogDescriptionProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogDescription
        data-slot="drawer-dialog-description"
        {...dialogDescriptionProps}
        {...props}
      />
    );
  return (
    <DrawerDescription
      data-slot="drawer-dialog-description"
      {...drawerDescriptionProps}
      {...props}
    />
  );
}

type DrawerDialogTitleProps = DualComponentProps<
  typeof DialogTitle,
  typeof DrawerTitle,
  "dialogTitleProps",
  "drawerTitleProps"
>;

function DrawerDialogTitle({
  drawerTitleProps,
  dialogTitleProps,
  ...props
}: DrawerDialogTitleProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogTitle
        data-slot="drawer-dialog-title"
        {...dialogTitleProps}
        {...props}
      />
    );
  return (
    <DrawerTitle
      data-slot="drawer-dialog-title"
      {...drawerTitleProps}
      {...props}
    />
  );
}

type DrawerDialogFooterProps = DualComponentProps<
  typeof DialogFooter,
  typeof DrawerFooter,
  "dialogFooterProps",
  "drawerFooterProps"
>;

function DrawerDialogFooter({
  drawerFooterProps,
  dialogFooterProps,
  ...props
}: DrawerDialogFooterProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogFooter
        data-slot="drawer-dialog-footer"
        {...dialogFooterProps}
        {...props}
      />
    );
  return (
    <DrawerFooter
      data-slot="drawer-dialog-footer"
      {...drawerFooterProps}
      {...props}
    />
  );
}

type DrawerDialogHeaderProps = DualComponentProps<
  typeof DialogHeader,
  typeof DrawerHeader,
  "dialogHeaderProps",
  "drawerHeaderProps"
>;

function DrawerDialogHeader({
  dialogHeaderProps,
  drawerHeaderProps,
  ...props
}: DrawerDialogHeaderProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogHeader
        data-slot="drawer-dialog-header"
        {...dialogHeaderProps}
        {...props}
      />
    );
  return (
    <DrawerHeader
      data-slot="drawer-dialog-header"
      {...drawerHeaderProps}
      {...props}
    />
  );
}

type DrawerDialogOverlayProps = DualComponentProps<
  typeof DialogOverlay,
  typeof DrawerOverlay,
  "dialogOverlayProps",
  "drawerOverlayProps"
>;

function DrawerDialogOverlay({
  dialogOverlayProps,
  drawerOverlayProps,
  ...props
}: DrawerDialogOverlayProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogOverlay
        data-slot="drawer-dialog-overlay"
        {...dialogOverlayProps}
        {...props}
      />
    );
  return (
    <DrawerOverlay
      data-slot="drawer-dialog-overlay"
      {...drawerOverlayProps}
      {...props}
    />
  );
}

type DrawerDialogPortalProps = DualComponentProps<
  typeof DialogPortal,
  typeof DrawerPortal,
  "dialogPortalProps",
  "drawerPortalProps"
>;

function DrawerDialogPortal({
  dialogPortalProps,
  drawerPortalProps,
  ...props
}: DrawerDialogPortalProps) {
  const { isSm } = useDrawerDialogContext();

  if (isSm)
    return (
      <DialogPortal
        data-slot="drawer-dialog-portal"
        {...dialogPortalProps}
        {...props}
      />
    );
  return (
    <DrawerPortal
      data-slot="drawer-dialog-portal"
      {...drawerPortalProps}
      {...props}
    />
  );
}

function DrawerDialogScrollArea({
  className,
  ...props
}: ComponentProps<"div">) {
  const { isSm } = useDrawerDialogContext();

  return (
    <div
      data-slot="drawer-dialog-scroll-area"
      className={cn(
        isSm
          ? // dialog
            "max-h-[90dvh] w-auto overflow-y-auto p-6 sm:max-w-[80svw]"
          : // drawer
            "max-h-[90dvh] overflow-y-auto",
        "[scrollbar-width:thin] [scrollbar-color:var(--muted-foreground)_transparent]",
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
