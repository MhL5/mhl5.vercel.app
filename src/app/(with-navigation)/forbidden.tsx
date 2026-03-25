import { FallbackPage } from "@/registry/new-york/FallbackPages/FallbackPages";

export default function Forbidden() {
  return (
    <FallbackPage
      variant="forbidden"
      className="h-[calc(100svh-var(--site-header-height))]"
    />
  );
}
