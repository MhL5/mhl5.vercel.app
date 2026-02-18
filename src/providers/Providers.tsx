import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import type { ReactNode } from "react";

import DirectionProvider from "./DirectionProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        data-site-id="site_c7mmmzvdmiuh35v2"
        src="/js/script.js"
        defer
      />

      <DirectionProvider>
        <ThemeProvider>
          <Toaster />
          {children}
        </ThemeProvider>
      </DirectionProvider>

      <GoogleAnalytics gaId="G-VCE68NR27Q" />
      <SpeedInsights />
    </>
  );
}
