import {
  Popover,
  PopoverContent,
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

type UseHoverWithTimeoutOptions = {
  onEnter: () => void;
  onLeave: () => void;
  enterDelay?: number;
  leaveDelay?: number;
};

function useHoverWithTimeout({
  onEnter,
  onLeave,
  enterDelay = 100,
  leaveDelay = 200,
}: UseHoverWithTimeoutOptions) {
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

const EditorPopoverContext = createContext<ContextType | null>(null);

function EditorPopover({
  onOpenChange,
  ...props
}: ComponentProps<typeof Popover>) {
  const [open, setOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useHoverWithTimeout({
    onEnter: () => setOpen(true),
    onLeave: () => setOpen(false),
  });

  return (
    <EditorPopoverContext
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
    </EditorPopoverContext>
  );
}

function useEditorPopover() {
  const context = use(EditorPopoverContext);
  if (!context)
    throw new Error("useEditorPopover must be used within a EditorPopover");
  return context;
}

function EditorPopoverTrigger({
  onMouseLeave,
  onMouseEnter,
  ...props
}: ComponentProps<typeof PopoverTrigger>) {
  const { handleMouseEnter, handleMouseLeave } = useEditorPopover();
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

function EditorPopoverContent({
  onMouseEnter,
  onMouseLeave,
  ...props
}: ComponentProps<typeof PopoverContent>) {
  const { handleMouseLeave, handleMouseEnter } = useEditorPopover();
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

export { EditorPopover, EditorPopoverContent, EditorPopoverTrigger };
