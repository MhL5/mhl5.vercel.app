"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import ButtonWithTooltip from "./ButtonWithTooltip";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <ButtonWithTooltip
      variant="ghost"
      size="icon"
      tooltipContent={<p className="capitalize">Toggle theme</p>}
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! duration-200! dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! duration-200! dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </ButtonWithTooltip>
  );
}
