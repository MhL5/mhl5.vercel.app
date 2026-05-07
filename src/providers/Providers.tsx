import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RscBoundaryProvider } from "@rsc-boundary/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";

import DirectionProvider from "./DirectionProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <RscBoundaryProvider>
      <DirectionProvider>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </DirectionProvider>

      <GoogleAnalytics gaId="G-VCE68NR27Q" />
      <SpeedInsights />
    </RscBoundaryProvider>
  );
}
