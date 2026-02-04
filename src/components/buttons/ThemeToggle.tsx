"use client";

import useEventListener from "@/registry/hooks/useEventListener/useEventListener";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Kbd } from "../ui/kbd";
import ButtonWithTooltip from "./ButtonWithTooltip";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  useEventListener(
    "keypress",
    (e) => {
      if (e.key === "t" || e.key === "T") {
        setTheme((theme) => (theme === "dark" ? "light" : "dark"));
      }
    },
    typeof window !== "undefined" ? window : undefined,
  );

  return (
    <ButtonWithTooltip
      variant="ghost"
      size="icon"
      tooltipContent={
        <>
          Toggle theme, Keyboard shortcut: <Kbd>T</Kbd>
        </>
      }
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
