"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
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
        "flex shrink-0 items-center gap-1 rounded-md bg-secondary",
        className,
      )}
      {...props}
    >
      {options.map(({ icon: Icon, label, value }) => (
        <Button
          className="group rounded-none border-none first:rounded-s-md last:rounded-e-md"
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

const ModeToggleGroupDynamic = dynamic(
  () =>
    import("@/components/buttons/ModeToggleGroup").then(
      (m) => m.ModeToggleGroup,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-7 w-21 rounded-md" />,
  },
);

export { ModeToggleGroup, ModeToggleGroupDynamic };
