import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  type ComponentProps,
  createContext,
  useCallback,
  useContext,
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

type EditorDropdownContextType = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
};

const EditorDropdownContext = createContext<EditorDropdownContextType | null>(
  null,
);

function EditorDropdown({
  onOpenChange,
  ...props
}: ComponentProps<typeof DropdownMenu>) {
  const [open, setOpen] = useState(false);
  const { handleMouseEnter, handleMouseLeave } = useHoverWithTimeout({
    onEnter: () => setOpen(true),
    onLeave: () => setOpen(false),
  });

  return (
    <EditorDropdownContext
      value={{
        open,
        onOpenChange: setOpen,
        handleMouseEnter,
        handleMouseLeave,
      }}
    >
      <DropdownMenu
        modal={false}
        open={open}
        onOpenChange={(open) => {
          onOpenChange?.(open);
          setOpen(open);
        }}
        {...props}
      />
    </EditorDropdownContext>
  );
}

function useEditorDropdown() {
  const context = useContext(EditorDropdownContext);
  if (!context)
    throw new Error("useEditorDropdown must be used within a EditorDropdown");
  return context;
}

function EditorDropdownTrigger({
  onMouseLeave,
  onMouseEnter,
  ...props
}: ComponentProps<typeof DropdownMenuTrigger>) {
  const { handleMouseEnter, handleMouseLeave } = useEditorDropdown();
  return (
    <DropdownMenuTrigger
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

function EditorDropdownContent({
  onMouseEnter,
  onMouseLeave,
  ...props
}: ComponentProps<typeof DropdownMenuContent>) {
  const { handleMouseLeave, handleMouseEnter } = useEditorDropdown();
  return (
    <DropdownMenuContent
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

export { EditorDropdown, EditorDropdownTrigger, EditorDropdownContent };
