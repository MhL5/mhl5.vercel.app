import { useIsMounted } from "@/registry/hooks/useIsMounted/useIsMounted";
import type { ReactNode } from "react";

type ClientOnlyProps = {
  fallback?: ReactNode;
  children: ReactNode;
};

export default function ClientOnly({ children, fallback }: ClientOnlyProps) {
  const isMounted = useIsMounted();
  if (!isMounted) return fallback;
  return children;
}
