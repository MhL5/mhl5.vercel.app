"use client";

import { Button } from "@/components/ui/button";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * TODO: once internet is available, we should shadcn ui button groups instead of this custom group implementation
 */
export function ModeToggleGroup() {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      label: "dark",
      onClick: () => setTheme("dark"),
      icon: MoonIcon,
      isActive: theme === "dark",
    },
    {
      label: "light",
      onClick: () => setTheme("light"),
      icon: SunIcon,
      isActive: theme === "light",
    },
    {
      label: "system",
      onClick: () => setTheme("system"),
      icon: MonitorIcon,
      isActive: theme === "system",
    },
  ];

  return (
    <div className="flex items-center overflow-hidden rounded-md border">
      {options.map(({ icon: Icon, label, onClick, isActive }) => (
        <Button
          className="rounded-none border-none"
          title={label}
          size="icon-sm"
          onClick={onClick}
          variant={isActive ? "default" : "secondary"}
          key={label}
        >
          <Icon />
        </Button>
      ))}
    </div>
  );
}
