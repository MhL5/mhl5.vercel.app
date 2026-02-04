"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import ButtonWithTooltip from "./ButtonWithTooltip";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <ButtonWithTooltip
      variant="ghost"
      size="icon"
      tooltipContent={<p className="capitalize">Toggle theme</p>}
      onClick={() => setTheme((theme) => (theme === "dark" ? "light" : "dark"))}
    >
      {/* 
        [transition-property:all!important] [transition-duration:200ms!important]
        overwrites next theme and enables transition for the theme icons while theme is changing
       */}
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 [transition-property:all!important] [transition-duration:200ms!important] dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 [transition-property:all!important] [transition-duration:200ms!important] dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </ButtonWithTooltip>
  );
}
