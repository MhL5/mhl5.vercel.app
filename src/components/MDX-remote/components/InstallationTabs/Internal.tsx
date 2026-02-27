"use client";

import { Tabs } from "@/components/ui/tabs";
import { useLocalStorage } from "@/registry/hooks/useLocalStorage/useLocalStorage";
import type { ComponentProps } from "react";

import { tabs } from "./constants";

export function InstallationTabsTabs(props: ComponentProps<typeof Tabs>) {
  const [selectedTab, setSelectedTab] = useLocalStorage(
    "InstallationTabsSelectedTab",
    Object.keys(tabs)[0],
  );

  return <Tabs value={selectedTab} onValueChange={setSelectedTab} {...props} />;
}
