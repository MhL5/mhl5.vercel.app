"use client";

import { type ReactNode, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";

type DeviceInfo = {
  "screen Width": string;
  "screen Height": string;
  "viewport Width": string;
  "viewport Height": string;
  "device Pixel Ratio": number;
  "color Depth": number;
};

function getDeviceInfo() {
  return {
    "screen Width": `${window.screen.width} px`,
    "screen Height": `${window.screen.height} px`,
    "viewport Width": `${window.innerWidth} px`,
    "viewport Height": `${window.innerHeight} px`,
    "device Pixel Ratio": window.devicePixelRatio,
    "color Depth": window.screen.colorDepth,
  } as const;
}

export default function Page() {
  const isMounted = useIsMounted();

  return (
    <div className="min-h-[calc(100vh-9rem)]">
      {isMounted && <DeviceInfo />}
    </div>
  );
}

function DeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(() =>
    getDeviceInfo(),
  );

  useEffect(() => {
    function handleResize() {
      setDeviceInfo(getDeviceInfo());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!deviceInfo) return null;

  return (
    <Card className="mx-auto my-8 w-[calc(100%-2rem)] max-w-sm">
      <CardHeader>
        <CardTitle>Device Specifications</CardTitle>
      </CardHeader>

      <CardContent>
        <ul>
          {deviceInfo &&
            Object.entries(deviceInfo).map(([key, value]) => (
              <TitleValue
                key={key}
                title={key}
                className="p-2 odd:bg-muted odd:text-foreground"
                value={value ?? null}
              />
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function TitleValue({
  title,
  value,
  className,
}: {
  title: ReactNode;
  value: ReactNode;
  className?: string;
}) {
  return (
    <li
      className={cn(
        "flex items-start justify-between gap-2 border-b last:border-none",
        className,
      )}
    >
      <span className="font-medium text-sm capitalize">{title}</span>
      <p className="text-sm">{value}</p>
    </li>
  );
}
