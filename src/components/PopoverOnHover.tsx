"use client";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  type ComponentProps,
  createContext,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function useHoverWithDelay({
  onEnter,
  onLeave,
  enterDelay = 100,
  leaveDelay = 200,
}: {
  onEnter: () => void;
  onLeave: () => void;
  enterDelay?: number;
  leaveDelay?: number;
}) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const onEnterRef = useRef(onEnter);
  const onLeaveRef = useRef(onLeave);

  const handleClearTimeout = useCallback(() => {
    if (!timeoutRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  }, []);

  const handleMouseEnter = useCallback(() => {
    handleClearTimeout();

    if (onEnterRef.current)
      timeoutRef.current = setTimeout(onEnterRef.current, enterDelay);
  }, [enterDelay, handleClearTimeout]);

  const handleMouseLeave = useCallback(() => {
    handleClearTimeout();

    if (onLeaveRef.current)
      timeoutRef.current = setTimeout(onLeaveRef.current, leaveDelay);
  }, [leaveDelay, handleClearTimeout]);

  useEffect(() => {
    onEnterRef.current = onEnter;
  }, [onEnter]);

  useEffect(() => {
    onLeaveRef.current = onLeave;
  }, [onLeave]);

  useEffect(() => {
    return () => {
      handleClearTimeout();
    };
  }, [handleClearTimeout]);

  return {
    handleMouseEnter,
    handleMouseLeave,
    clearTimeout: handleClearTimeout,
  };
}

type ContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};

const PopoverOnHoverContext = createContext<ContextType | null>(null);

function PopoverOnHover({
  onOpenChange,
  ...props
}: ComponentProps<typeof Popover>) {
  const [open, setOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useHoverWithDelay({
    onEnter: () => setOpen(true),
    onLeave: () => setOpen(false),
  });

  return (
    <PopoverOnHoverContext
      value={{
        open,
        onOpenChange: setOpen,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      <Popover
        modal={false}
        open={open}
        onOpenChange={(open) => {
          onOpenChange?.(open);
          setOpen(open);
        }}
        {...props}
      />
    </PopoverOnHoverContext>
  );
}

function usePopoverOnHoverContext() {
  const context = use(PopoverOnHoverContext);
  if (!context)
    throw new Error(
      "usePopoverOnHoverContext must be used within a PopoverOnHoverContext",
    );
  return context;
}

function PopoverOnHoverTrigger({
  onMouseLeave,
  onMouseEnter,
  ...props
}: ComponentProps<typeof PopoverTrigger>) {
  const { handleMouseEnter, handleMouseLeave } = usePopoverOnHoverContext();
  return (
    <PopoverTrigger
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        handleMouseLeave();
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        handleMouseEnter();
      }}
      {...props}
    />
  );
}

function PopoverOnHoverContent({
  onMouseEnter,
  onMouseLeave,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  const { handleMouseLeave, handleMouseEnter } = usePopoverOnHoverContext();
  return (
    <PopoverContent
      onMouseLeave={(e) => {
        onMouseLeave?.(e);
        handleMouseLeave();
      }}
      onMouseEnter={(e) => {
        onMouseEnter?.(e);
        handleMouseEnter();
      }}
      {...props}
    />
  );
}

export {
  PopoverOnHover,
  PopoverOnHoverTrigger,
  PopoverOnHoverContent,
  PopoverAnchor as PopoverOnHoverAnchor,
  PopoverDescription as PopoverOnHoverDescription,
  PopoverHeader as PopoverOnHoverHeader,
  PopoverTitle as PopoverOnHoverTitle,
};
