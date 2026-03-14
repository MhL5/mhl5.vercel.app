"use client";

import { ModeToggleGroup } from "@/components/buttons/ModeToggleGroup";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

type AppearanceDisplayProps = ComponentProps<"div">;

export function AppearanceDisplay({
  className,
  ...props
}: AppearanceDisplayProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      <div className="flex flex-col">
        <p className="mb-auto text-sm">Appearance Display</p>
        {theme === "light" && (
          <p className="text-xs text-muted-foreground">light mode</p>
        )}
        {theme === "dark" && (
          <p className="text-xs text-muted-foreground">dark mode</p>
        )}
        {theme === "system" && (
          <p className="text-xs text-muted-foreground">Follow the system</p>
        )}
      </div>

      <ModeToggleGroup />
    </div>
  );
}
