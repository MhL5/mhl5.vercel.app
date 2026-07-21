"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@teispace/next-themes";
import { Moon, Sun } from "lucide-react";
import type { ComponentProps } from "react";

function ModeToggle({ onClick, ...props }: ComponentProps<typeof Button>) {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        onClick?.(e);
        setTheme((theme) => (theme === "dark" ? "light" : "dark"));
      }}
      title="click to toggle theme or press 'D'"
      {...props}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! duration-200! dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! duration-200! dark:scale-100 dark:rotate-0" />
    </Button>
  );
}

export { ModeToggle };
