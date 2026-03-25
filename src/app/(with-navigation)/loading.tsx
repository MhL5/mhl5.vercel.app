import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Loading() {
  return (
    <FallbackPage
      className="h-[calc(100svh-var(--site-header-height))]"
      variant="loading"
    />
  );
}
