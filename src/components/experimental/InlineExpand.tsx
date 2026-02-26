"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ComponentProps, createContext, use, useState } from "react";

type InlineExpandContextValue = {
  expand: boolean;
  toggleExpand: () => void;
};

const InlineExpandContext = createContext<InlineExpandContextValue | null>(
  null,
);

type InlineExpandContextProviderProps = {
  initialExpand?: InlineExpandContextValue["expand"];
} & ComponentProps<"div">;

function InlineExpand({
  className,
  initialExpand,
  ...props
}: InlineExpandContextProviderProps) {
  const [expand, setExpand] = useState(initialExpand ?? false);

  function toggleExpand() {
    setExpand((prev) => !prev);
  }

  return (
    <InlineExpandContext value={{ expand, toggleExpand }}>
      <div
        className={cn(
          "flex flex-wrap items-center gap-2 rounded-sm bg-muted p-2 text-foreground",
          className,
        )}
        data-expanded={expand}
        data-slot="InlineExpand"
        {...props}
      />
    </InlineExpandContext>
  );
}

function useInlineExpandContext() {
  const context = use(InlineExpandContext);
  if (!context)
    throw new Error("InlineExpandContext was called outside of its provider!");
  return context;
}

function InlineExpandTrigger({
  onClick,
  ...props
}: ComponentProps<typeof Button>) {
  const { toggleExpand } = useInlineExpandContext();
  return (
    <Button
      data-slot="InlineExpandTrigger"
      type="button"
      variant="ghost"
      onClick={(e) => {
        onClick?.(e);
        toggleExpand();
      }}
      {...props}
    />
  );
}

function InlineExpandContent(props: ComponentProps<"div">) {
  const { expand } = useInlineExpandContext();

  if (!expand) return;
  return (
    <div data-expanded={expand} data-slot="InlineExpandContent" {...props} />
  );
}

export { InlineExpand, InlineExpandContent, InlineExpandTrigger };
