"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { ComponentProps } from "react";

function ModeToggleGroup({ className, ...props }: ComponentProps<"div">) {
  const { theme, setTheme } = useTheme();

  const options = [
    {
      label: "dark",
      value: "dark",
      icon: MoonIcon,
    },
    {
      label: "light",
      value: "light",
      icon: SunIcon,
    },
    {
      label: "system",
      value: "system",
      icon: MonitorIcon,
    },
  ];

  return (
    <div
      className={cn(
        "flex items-center overflow-hidden rounded-md border",
        className,
      )}
      {...props}
    >
      {options.map(({ icon: Icon, label, value }) => (
        <Button
          className="group rounded-none border-none"
          title={label}
          type="button"
          size="icon-sm"
          data-active={value === theme}
          onClick={() => setTheme(value)}
          variant={value === theme ? "default" : "secondary"}
          key={label}
        >
          <Icon className="transition-all duration-200 group-data-[active=true]:scale-105" />
        </Button>
      ))}
    </div>
  );
}

export { ModeToggleGroup };
