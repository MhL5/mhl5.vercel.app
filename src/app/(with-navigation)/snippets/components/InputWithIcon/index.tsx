"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  createContext,
  use,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

type ContextType = {
  iconXPosition?: "right" | "left";
};

const Context = createContext<ContextType | null>(null);

type ContextProviderProps = {
  children: ReactNode;
} & ContextType;

function ContextProvider({
  children,
  iconXPosition = "left",
}: ContextProviderProps) {
  const values = useMemo(() => ({ iconXPosition }), [iconXPosition]);
  return <Context value={values}>{children}</Context>;
}

function useContext() {
  const context = use(Context);
  if (!context)
    throw new Error("useContext must be used within a ContextProvider");
  return context;
}

type InputWithIconProps = ContextType & ComponentPropsWithoutRef<"div">;

function InputWithIcon({
  className,
  iconXPosition = "left",
  ...props
}: InputWithIconProps) {
  return (
    <ContextProvider iconXPosition={iconXPosition}>
      <div className={cn("relative", className)} {...props} />
    </ContextProvider>
  );
}

type InputWithIconInputProps = ComponentPropsWithoutRef<typeof Input>;

function InputWithIconInput({ className, ...props }: InputWithIconInputProps) {
  const { iconXPosition } = useContext();
  return (
    <Input
      className={cn(
        "h-[inherit] w-full",
        iconXPosition === "right" ? "pr-8" : "pl-8",
        className,
      )}
      {...props}
    />
  );
}

type InputWithIconIconSlotProps = ComponentPropsWithoutRef<typeof Slot>;

function InputWithIconIconSlot({
  className,
  ...props
}: InputWithIconIconSlotProps) {
  const { iconXPosition } = useContext();

  return (
    <Slot
      data-slot="input-with-icon-icon"
      className={cn(
        "absolute top-1/2 size-4 -translate-y-1/2 stroke-2",
        iconXPosition === "right" ? "right-2.5" : "left-2.5",
        className,
      )}
      {...props}
    />
  );
}

export { InputWithIcon, InputWithIconIconSlot, InputWithIconInput };
