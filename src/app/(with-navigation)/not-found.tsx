import { FallbackPageNotfound } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function NotFound() {
  return (
    <FallbackPageNotfound className="h-[calc(100svh-var(--site-header-height))]" />
  );
}
