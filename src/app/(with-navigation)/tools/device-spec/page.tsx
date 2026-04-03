"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";
import { type ReactNode, useEffect, useState } from "react";

/**
 * Returns human-readable device info like:
 * "Chrome on Windows (Desktop)"
 * "Safari on iPhone (Mobile)"
 */
function getReadableDevice() {
  const userAgent = navigator.userAgent;
  const touch = navigator.maxTouchPoints > 0;

  function getVersion(regex: RegExp) {
    const match = userAgent.match(regex);
    return match?.[1]?.split(".")[0] ?? ""; // major version only
  }

  function getBrowser() {
    if (/Edg\//.test(userAgent))
      return { browser: "edge", version: getVersion(/Edg\/([\d.]+)/) };
    if (/Chrome\//.test(userAgent) && !/Edg\//.test(userAgent))
      return { browser: "chrome", version: getVersion(/Chrome\/([\d.]+)/) };
    if (/Safari\//.test(userAgent) && !/Chrome\//.test(userAgent))
      return { browser: "safari", version: getVersion(/Version\/([\d.]+)/) };
    if (/Firefox\//.test(userAgent))
      return { browser: "firefox", version: getVersion(/Firefox\/([\d.]+)/) };
    return { browser: "unknown", version: "" };
  }

  function getOs() {
    if (/Windows NT/.test(userAgent)) return "Windows";
    if (/Mac OS X/.test(userAgent) && !/iPhone|iPad/.test(userAgent))
      return "macOS";
    if (/Android/.test(userAgent)) return "Android";
    if (/iPhone/.test(userAgent)) return "iPhone";
    if (/iPad/.test(userAgent)) return "iPad";
    if (/Linux/.test(userAgent)) return "Linux";
    return "Unknown OS";
  }

  function getDeviceType() {
    if (/iPad|Tablet/.test(userAgent)) return "Tablet";
    if (/Mobi|Android|iPhone|iPod/.test(userAgent) || touch) return "Mobile";
    return "Desktop";
  }

  // Browser + version
  const { browser, version } = getBrowser();

  return `${version ? `${browser}_${version}` : browser} on ${getOs()} (${getDeviceType()})`;
}

type DeviceInfo = {
  "screen Width": string;
  "screen Height": string;
  "viewport Width": string;
  "viewport Height": string;
  "device Pixel Ratio": number;
  "color Depth": number;
  device: string;
};

function getDeviceInfo() {
  return {
    "screen Width": `${window.screen.width} px`,
    "screen Height": `${window.screen.height} px`,
    "viewport Width": `${window.innerWidth} px`,
    "viewport Height": `${window.innerHeight} px`,
    "device Pixel Ratio": window.devicePixelRatio,
    "color Depth": window.screen.colorDepth,
    device: getReadableDevice(),
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
      <span className="text-sm font-medium capitalize">{title}</span>
      <p className="text-sm">{value}</p>
    </li>
  );
}
