import { Toaster } from "@/components/ui/sonner";
import ThemeProvider from "@/providers/ThemeProvider";
import type { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <Toaster />

      {children}
    </ThemeProvider>
  );
}
