import { FallbackPageLoading } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Loading() {
  return (
    <FallbackPageLoading className="h-[calc(100svh-var(--site-header-height))]" />
  );
}
