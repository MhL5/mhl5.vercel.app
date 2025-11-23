import { SpeedInsights } from "@vercel/speed-insights/next";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/providers/ThemeProvider";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <>
      <ThemeProvider>
        <Toaster />
        {children}
      </ThemeProvider>

      <SpeedInsights />
    </>
  );
}
