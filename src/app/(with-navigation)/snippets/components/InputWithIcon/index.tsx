import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, JSX } from "react";

type InputWithIconProps = {
  icon: JSX.ElementType;
  iconXPosition?: "right" | "left";

  iconProps?: ComponentPropsWithoutRef<"svg">;
  inputProps?: ComponentPropsWithoutRef<typeof Input>;
} & ComponentPropsWithoutRef<"div">;

export default function InputWithIcon({
  className,
  icon: Icon,
  iconProps: { className: iconClassName, ...iconProps } = {},
  inputProps: { className: inputClassName, ...inputProps } = {},
  iconXPosition = "left",
  ...props
}: InputWithIconProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <Input
        className={cn(
          iconXPosition === "right" ? "pr-8" : "pl-8",
          iconClassName,
        )}
        {...inputProps}
      />
      <Icon
        className={cn(
          `absolute top-1/2 size-4 -translate-y-1/2 stroke-2`,
          iconXPosition === "right" ? "right-2" : "left-2",
          inputClassName,
        )}
        {...iconProps}
      />
    </div>
  );
}
