import { DirectionProvider as ShadcnDirectionProvider } from "@/components/ui/direction";
import type { PropsWithChildren } from "react";

export default function DirectionProvider({ children }: PropsWithChildren) {
  return (
    <ShadcnDirectionProvider dir="rtl">{children}</ShadcnDirectionProvider>
  );
}
